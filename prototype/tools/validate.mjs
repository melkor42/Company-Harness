#!/usr/bin/env node
// Prüft den Korpus gegen schema/. dependency-free, weil der Rechner kein npm install braucht.
// Zugriff und Herkunft werden hier erzwungen, nicht im Prompt: Quelle muss existieren,
// scope muss zum Fall passen, Erfundenes muss als erfunden stehen.

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const Wurzel = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const SchemaOrdner = join(Wurzel, 'schema');

const Zuordnung = [
  { ordner: 'prototype/context/datensaetze', schema: 'context-record', muster: /\.json$/ },
  { ordner: 'prototype/processes', schema: 'process-definition', muster: /\.json$/ },
  { ordner: 'prototype/cases', schema: 'case', muster: /fall\.json$/ },
  { ordner: 'prototype/runs', schema: 'action', muster: /^aktion-/ },
  { ordner: 'prototype/runs', schema: 'case-state', muster: /^state\.json$/ },
];

function ladeJson(pfad) {
  return JSON.parse(readFileSync(pfad, 'utf8'));
}

// "format" ist hier keine JSON-Schema-Vollständigkeit, sondern der Kalender:
// 2026-99-99 hält jedem Muster stand, aber keinem Datum.
const Datumsmuster = {
  'datum': /^(\d{4})-(\d{2})-(\d{2})$/,
  'datum-zeit': /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/,
};

function typVon(wert) {
  if (wert === null) return 'null';
  if (Array.isArray(wert)) return 'array';
  if (Number.isInteger(wert)) return 'integer';
  return typeof wert;
}

function erfuelltTyp(schema, wert) {
  if (schema.type === undefined) return true;
  const erlaubt = [].concat(schema.type);
  const hat = typVon(wert);
  if (erlaubt.includes(hat)) return true;
  return erlaubt.includes('number') && hat === 'integer';
}

function formatPruefung(schema, wert, wo, fehler) {
  const muster = Datumsmuster[schema.format];
  if (!muster) return;
  const m = muster.exec(wert);
  if (!m) {
    fehler.push(`${wo}: "${wert}" passt nicht auf Format ${schema.format}`);
    return;
  }
  const [jahr, monat, tag] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const d = new Date(Date.UTC(jahr, monat - 1, tag));
  let echt = d.getUTCFullYear() === jahr && d.getUTCMonth() === monat - 1 && d.getUTCDate() === tag;
  if (m[4] !== undefined) echt = echt && Number(m[4]) < 24 && Number(m[5]) < 60;
  if (!echt)
    fehler.push(`${wo}: "${wert}" ist kein Kalenderdatum — ein Muster allein rutscht durch`);
}

function validiere(schema, wert, wo, fehler) {
  if (schema.const !== undefined && wert !== schema.const) {
    fehler.push(`${wo}: erwartet ${JSON.stringify(schema.const)}, steht ${JSON.stringify(wert)}`);
    return;
  }
  if (schema.enum && !schema.enum.includes(wert)) {
    fehler.push(`${wo}: ${JSON.stringify(wert)} nicht in ${schema.enum.join(' | ')}`);
    return;
  }
  if (!erfuelltTyp(schema, wert)) {
    fehler.push(`${wo}: Typ ${typVon(wert)}, erwartet ${[].concat(schema.type).join('|')}`);
    return;
  }
  if (wert === null || typeof wert !== 'object') {
    if (typeof wert === 'string') {
      if (schema.pattern && !new RegExp(schema.pattern).test(wert))
        fehler.push(`${wo}: "${wert}" passt nicht auf ${schema.pattern}`);
      formatPruefung(schema, wert, wo, fehler);
      if (schema.minLength && wert.length < schema.minLength)
        fehler.push(`${wo}: zu kurz (mindestens ${schema.minLength})`);
    }
    if (typeof wert === 'number' && schema.minimum !== undefined && wert < schema.minimum)
      fehler.push(`${wo}: kleiner als ${schema.minimum}`);
    return;
  }

  if (Array.isArray(wert)) {
    if (schema.minItems && wert.length < schema.minItems)
      fehler.push(`${wo}: zu wenige Einträge (mindestens ${schema.minItems})`);
    if (schema.maxItems !== undefined && wert.length > schema.maxItems)
      fehler.push(`${wo}: zu viele Einträge (höchstens ${schema.maxItems}) — die Menge ist absichtlich leer`);
    if (schema.items) wert.forEach((e, i) => validiere(schema.items, e, `${wo}[${i}]`, fehler));
    return;
  }

  for (const pflicht of schema.required ?? []) {
    if (!(pflicht in wert)) fehler.push(`${wo}: Pflichtfeld "${pflicht}" fehlt`);
  }
  if (schema.additionalProperties === false) {
    for (const key of Object.keys(wert)) {
      if (!(key in (schema.properties ?? {}))) fehler.push(`${wo}: unbekanntes Feld "${key}"`);
    }
  }
  for (const [key, unter] of Object.entries(schema.properties ?? {})) {
    if (key in wert) validiere(unter, wert[key], `${wo}.${key}`, fehler);
  }
}

function dateienIn(relOrdner, muster) {
  const ordner = join(Wurzel, relOrdner);
  if (!existsSync(ordner)) return [];
  const out = [];
  const runce = (d, prefix) => {
    for (const name of readdirSync(d, { withFileTypes: true })) {
      const pfad = join(d, name.name);
      if (name.isDirectory()) runce(pfad, `${prefix}${name.name}/`);
      else if (muster.test(name.name)) out.push(`${relOrdner}/${prefix}${name.name}`);
    }
  };
  runce(ordner, '');
  return out;
}

function quellenPruefung(dateien, fehler) {
  const datensaetze = new Map();
  const prozesse = new Map();

  const datensaetzDateien = dateien.filter((d) => d.startsWith('prototype/context/datensaetze'));
  const geladen = new Map();
  for (const rel of datensaetzDateien) {
    const dat = { datei: rel, ...ladeJson(join(Wurzel, rel)) };
    geladen.set(rel, dat);
    datensaetze.set(dat.id, dat);
  }
  // Erst der ganze Bestand, dann die Querverweise: die Lesereihenfolge der Dateien darf kein
  // Ergebnis verändern.
  for (const [rel, dat] of geladen) {
    // Eine Quelle, die nicht da ist, ist keine Quelle.
    const quelle = join(Wurzel, dat.source ?? '');
    if (!dat.source) continue;
    if (!existsSync(quelle) || !statSyncIstDatei(quelle))
      fehler.push(`${rel}: source "${dat.source}" existiert nicht — ein Datensatz ohne erreichbare Quelle wird abgelehnt`);
    if (dat.supersedes && !datensaetze.has(dat.supersedes))
      fehler.push(`${rel}: supersedes "${dat.supersedes}" — kein Datensatz dieses Korpus, Ersetzen setzt Kenntnis des Ersetzenen`);
    else if (dat.supersedes === dat.id)
      fehler.push(`${rel}: supersedes zeigt auf sich selbst`);
  }

  for (const rel of dateien.filter((d) => d.startsWith('prototype/processes'))) {
    const dat = ladeJson(join(Wurzel, rel));
    prozesse.set(dat.id, { datei: rel, ...dat });
  }

  const gefundeneSchluessel = new Set();
  const faelle = new Map();
  for (const rel of dateien.filter((d) => d.endsWith('fall.json'))) {
    const dat = ladeJson(join(Wurzel, rel));
    const ordner = dirname(join(Wurzel, rel));
    gefundeneSchluessel.add(dat.id);
    faelle.set(dat.id, { datei: rel, ...dat });

    if (!prozesse.has(dat.process))
      fehler.push(`${rel}: Prozess "${dat.process}" ist nicht definiert`);
    for (const namein of [dat.eingang, dat.erwartet]) {
      if (!existsSync(join(ordner, namein)))
        fehler.push(`${rel}: Datei "${namein}" fehlt im Fallordner`);
    }
    // Bedingung A ist die kontextfreie. Sie darf nichts hereinbekommen.
    if ((dat.kontext_a ?? []).length > 0)
      fehler.push(`${rel}: kontext_a muss leer sein, sonst ist der A/B-Vergleich wertlos`);

    for (const id of dat.kontext_b ?? []) {
      const ds = datensaetze.get(id);
      if (!ds) {
        fehler.push(`${rel}: kontext_b verweist auf unbekannten Datensatz "${id}"`);
        continue;
      }
      if (!(ds.scope ?? []).includes(`fall:${dat.id}`))
        fehler.push(`${rel}: "${id}" darf von ${dat.id} nicht gelesen werden (scope: ${(ds.scope ?? []).join(', ') || 'leer'})`);
    }
  }

  // Umgekehrte Richtung: ein Datensatz, den kein Fall je liest, ist aufgelesener Ballast.
  for (const [id, ds] of datensaetze) {
    const zielt = (ds.scope ?? []).some((s) => gefundeneSchluessel.has(s.replace(/^fall:/, '')));
    if (ds.scope?.length && !zielt && gefundeneSchluessel.size)
      fehler.push(`${ds.datei}: "${id}" wird von keinem Fall gelesen — scope enger fassen oder Fall ergänzen`);
  }

  for (const rel of dateien.filter((d) => d.startsWith('prototype/processes'))) {
    const dat = ladeJson(join(Wurzel, rel));
    for (const aktion of dat.allowed_actions ?? []) {
      if (!aktion.target) continue;
      if (!aktion.target.startsWith('sandbox-systems/'))
        fehler.push(`${rel}: Aktion "${aktion.name}" schreibt außerhalb der Sandbox — "${aktion.target}"`);
      else if (!existsSync(join(Wurzel, 'prototype', aktion.target)))
        fehler.push(`${rel}: Schreibziel "${aktion.target}" existiert nicht`);
    }
  }

  // Läufe: die Allowlist gilt beim Prüfen, nicht erst in einer künftigen Engine.
  const verwendeteSchluessel = new Map();
  const laufdateien = dateien.filter((d) => d.startsWith('prototype/runs'));
  for (const rel of laufdateien.filter((d) => !/state\.json$/.test(d))) {
    const dat = ladeJson(join(Wurzel, rel));
    const fall = faelle.get(dat.case);
    if (!fall) {
      fehler.push(`${rel}: Fall "${dat.case}" existiert nicht`);
      continue;
    }
    const ordnerFall = rel.split('/')[2];
    if (ordnerFall !== dat.case)
      fehler.push(`${rel}: liegt in runs/${ordnerFall}/, nennt aber Fall "${dat.case}"`);

    const erlaubt = (prozesse.get(fall.process)?.allowed_actions ?? []).find((a) => a.name === dat.action);
    if (!erlaubt) {
      fehler.push(`${rel}: Aktion "${dat.action}" ist im Prozess "${fall.process}" nicht erlaubt`);
    } else {
      if ((erlaubt.target ?? null) !== (dat.target ?? null))
        fehler.push(`${rel}: Ziel "${dat.target ?? '—'}" weicht vom erlaubten Ziel "${erlaubt.target ?? '—'}" ab`);
      if (erlaubt.requires_approval !== dat.requires_approval)
        fehler.push(`${rel}: requires_approval=${dat.requires_approval} widerspricht der Prozessdefinition (${erlaubt.requires_approval})`);
      if (erlaubt.requires_approval && dat.result === 'ausgeführt' && !dat.approved_by)
        fehler.push(`${rel}: ausgeführt ohne Freigeber — eine freigabepflichtige Aktion braucht ihren Eintrag`);
    }

    if (verwendeteSchluessel.has(dat.idempotency_key))
      fehler.push(`${rel}: Idempotenzschlüssel "${dat.idempotency_key}" steht auch in ${verwendeteSchluessel.get(dat.idempotency_key)} — dieselbe Geschäftshandlung zweimal`);
    else verwendeteSchluessel.set(dat.idempotency_key, rel);

    if (dat.result === 'ausgeführt' && dat.requires_approval) {
      const ordnerRel = rel.split('/').slice(0, -1).join('/');
      const protokollierel = `${ordnerRel}/freigaben.md`;
      if (!existsSync(join(Wurzel, protokollierel)))
        fehler.push(`${rel}: ausgeführte, freigabepflichtige Aktion ohne Eintrag in ${protokollierel}`);
      else if (!readFileSync(join(Wurzel, protokollierel), 'utf8').includes(dat.payload_hash))
        fehler.push(`${rel}: ${dat.payload_hash} steht nicht in ${protokollierel} — freigegeben wird die Nutzlast, nicht die Aktionsart`);
    }
  }

  for (const rel of laufdateien.filter((d) => /state\.json$/.test(d))) {
    const dat = ladeJson(join(Wurzel, rel));
    const ordnerFall = rel.split('/')[2];
    if (dat.fall && ordnerFall !== dat.fall)
      fehler.push(`${rel}: liegt in runs/${ordnerFall}/, hält aber Fall "${dat.fall}" fest`);
    if (dat.zustand === 'wartet-auf-eigentümer' && !dat.wartet_bei)
      fehler.push(`${rel}: wartet ohne Eigentümer — genau an diesem Zustand gibt ein Chat auf`);
    if (dat.zustand === 'abgeschlossen' && dat.offene_frage)
      fehler.push(`${rel}: abgeschlossen, während eine Frage offen steht`);
  }

  // Eine JSON-Datei in runs/, die keiner Zuordnung fällt, wäre ein stiller Freifahrtschein.
  const zugeordnet = new Set(dateien.filter((d) => d.startsWith('prototype/runs')));  for (const rel of dateienIn('prototype/runs', /\.json$/)) {
    if (!zugeordnet.has(rel))
      fehler.push(`${rel}: fällt auf keine Zuordnung — Aktionendateien heißen aktion-*.json, sonst werden sie nicht geprüft`);
  }
}

function statSyncIstDatei(pfad) {
  try {
    return readFileSync(pfad).length >= 0;
  } catch {
    return false;
  }
}

function main() {
  const arg = process.argv.slice(2);
  const hole = (name) => {
    const i = arg.indexOf(name);
    return i === -1 ? null : arg[i + 1];
  };

  const fehler = [];
  let geprueft = 0;

  // Einzeldatei-Modus: für den Nachweis, dass Ungültiges abgewiesen wird.
  if (hole('--datei')) {
    const rel = resolve(process.cwd(), hole('--datei'));
    const schemaName = hole('--schema');
    if (!schemaName) {
      console.error('--datei braucht --schema <name>');
      process.exit(2);
    }
    const schema = ladeJson(join(SchemaOrdner, `${schemaName}.schema.json`));
    geprueft = 1;
    try {
      validiere(schema, JSON.parse(readFileSync(rel, 'utf8')), relative(Wurzel, rel), fehler);
    } catch (e) {
      fehler.push(`${relative(Wurzel, rel)}: ${e.message}`);
    }
  } else {
    const alle = Zuordnung.flatMap((z) => dateienIn(z.ordner, z.muster).map((f) => [f, z.schema]));
    const schemata = new Map();
    for (const [rel, name] of alle) {
      if (!schemata.has(name)) schemata.set(name, ladeJson(join(SchemaOrdner, `${name}.schema.json`)));
      geprueft++;
      let dat;
      try {
        dat = ladeJson(join(Wurzel, rel));
      } catch (e) {
        fehler.push(`${rel}: keine gültige JSON-Datei — ${e.message}`);
        continue;
      }
      validiere(schemata.get(name), dat, rel, fehler);
    }
    quellenPruefung(alle.map(([f]) => f), fehler);
  }

  console.log(`${geprueft} Datei(en) gegen ${readdirSync(SchemaOrdner).length} Schema(s) geprüft`);
  for (const f of fehler) console.log(`  FEHLER  ${f}`);
  if (!fehler.length) console.log('  OK — keine Abweichung');
  process.exit(fehler.length ? 1 : 0);
}

main();
