# Company Harness — Prototyp-Plan

**Stand 2026-09-20.** Umsetzungsebene zu [`product-plan.md`](product-plan.md). Die Produktthese und die
Quellenlage stehen dort; dieses Dokument legt fest, was gebaut wird, in welcher Reihenfolge und woran jeder
Schritt besteht oder scheitert. **M0 und M1 sind gebaut** (§7); die Beschreibungen hier folgen den
Dateien, nicht umgekehrt.

Von Manuel am 2026-09-19 entschieden (Auswahl im Chat): **Baseline zuerst, dann Engine**, **beide
Prüfprozesse parallel**, Repo **privat**; das Repo hat er selbst angelegt.

**Nicht entschieden, sondern abgeleitet: synthetisches Fallmaterial.** `AGENTS.md` Regel 4 schließt echte
Kunden-, Mail- oder Buchhaltungszugänge ohne ausdrückliche Freigabe aus, und eine solche Freigabe liegt
nicht vor. Synthetisches Material ist damit der einzige Weg, der die Regel nicht berührt. Wer echte Fälle
will, muss die Freigabe ausdrücklich erteilen (§9).

Dass beide Prozesse von Anfang an parallel laufen, ist eine bewusste Abweichung von
[`CONTEXT-SIGNOFF.md`](CONTEXT-SIGNOFF.md) §3, das den Änderungsfall als ersten vorsieht. Gewinn: die
geteilte Architektur wird im ersten Durchlauf an zwei Fällen geprüft statt aus einem hochgerechnet.
Kosten: doppeltes Fallmaterial und doppelte Auswertung pro Runde. Beide Prozesse bleiben getrennt
bewertbar, damit ein früher Durchbruch in Prozess 2 nicht Prozess 1 mitzieht.

## 1. Die Leitfrage

Eine Frage, nicht zwei:

> Verändert freigegebener Unternehmenskontext die **Aktion** messbar — und hält ein Fallzustand eine
> Unterbrechung aus, ohne dass Arbeit verloren geht oder eine Aktion sich doppelt ausführt?

Der Zusatz ist die Absage an das naheliegende Missverständnis: nicht „Antwortet der Agent klüger mit
Kontext?", sondern „Tut sich etwas anderes?" Ein höflicherer Briefwechsel mit Kundennamen ist kein
Nachweis. `product-plan.md` nennt das Kriterium schon: *Company context must change the action — not
merely make the wording more personal.*

## 2. Grenzen

**Drin:** ein Betreiber (Manuel), ein Prüfer, synthetische Fälle, ein lokaler Rechner, keine
Netzwerkverbindungen zu Geschäftssystemen.

**Draußen — und nicht als spätere Phase getarnt:**

| Nicht im Prototyp | Warum |
|---|---|
| Echte Mail-, Kalender-, Buchhaltungs- oder Kundenzugänge | `AGENTS.md` Regel 4; keine Freigabe vorhanden |
| Oracle AI Database 26ai | `CONTEXT-SIGNOFF.md` §10 Schritt 6: erst wenn reale Daten- und Retrieval-Anforderungen es begründen |
| Hexis-Bereitstellung | braucht eine freigegebene Container-Umgebung; die Lizenzprüfung am Quelltext ist unabhängig davon sofort möglich (§9 Punkt 3) |
| Mehrbenutzer, Mandantenfähigkeit, Rollenverwaltung | kein Nachweis vor dem ersten Prozessergebnis |
| White-Label, Vertrieb, Preise | `product-plan.md`: keine validierten Preisbänder |
| Unbeaufsichtigter Betrieb | Qoder-Eigenschaften dafür sind unbelegt (§4) |

## 3. Layout

```
Company-Harness/
├─ AGENTS.md  CONTEXT-SIGNOFF.md  DECISIONS.md
├─ docs/
│  ├─ product-plan.md
│  ├─ prototype-plan.md            dieses Dokument
│  └─ sources/
├─ schema/                         die Verträge, JSON-Schema
│  ├─ context-record.schema.json
│  ├─ process-definition.schema.json
│  ├─ case.schema.json             der Fall, unveränderlich angelegt
│  ├─ case-state.schema.json       derselbe Fall im Lauf, sein Zustand
│  └─ action.schema.json
└─ prototype/
   ├─ KORPUS.md                    die erfundene Firma, ihre Rollen, ihre zwei Kunden
   ├─ context/
   │  ├─ quellen/                  erfundene Firmendokumente — die Original-Stufe
   │  └─ datensaetze/              daraus extrahierte Kontextdatensätze, je Datei einer
   ├─ processes/                   Prozessdefinitionen, versioniert
   ├─ cases/<fall-id>/             fall.json + eingang.md + erwartet.md
   ├─ sandbox-systems/             vier Schreibziele: Projektplan, Zeiterfassung,
   │                               Rechnungsentwurf, Postausgang
   ├─ runs/<fall-id>/              state.json, aktion-*.json, freigaben.md, events.jsonl
   └─ evaluation/MESSPROTOKOLL.md  Maßstab und Felder, vor dem ersten Lauf aufgeschrieben
```

Die Aufteilung `quellen/` + `datensaetze/` statt vier Ordner nach Sachlage ist eine Bauentscheidung vom
2026-09-19 und keine Kosmetik: Ein Datensatz trägt seine Kategorie im Feld `kind`, nicht im Pfad. Der Pfad
trägt die Herkunft, und die Herkunft ist das Einzige, was der Validator prüfen kann — er muss die
Quelldatei finden. Was in der Vorlage wie Ordnerlogik klang, wäre eine zweite, mitlaufende Einordnung
gewesen, die nichts beantwortet.

`prototype/src/` entsteht erst in M4. Vorher ist der Engine-Ersatz: Dateien, die von Hand gepflegt werden —
was selbst die Messung ist, die `CONTEXT-SIGNOFF.md` §10 Schritt 3 verlangt. `runs/` ist bewusst noch leer;
es füllt sich mit dem ersten Lauf, und seine Dateinamen sind nicht frei erfassbar (siehe §4.5).

## 4. Die vier Verträge

Der Prototyp besteht im Kern aus vier Datenformen. Sie sind vor dem ersten Falllauf festzulegen, weil
danach fast alles weitere aus ihnen folgt. Gebaut sind sie als JSON-Schema unter `schema/` und als
Beispieldateien unter `prototype/`; die Beispiele hier sind wörtlich denen entnommen.

### 4.1 Kontextdatensatz (`context-record`)

```json
{
  "id": "kap-kest-frei-bis-termin",
  "kind": "capacity",
  "statement": "Bis 2026-11-13 sind von 8,5 verfügbaren PT 6,2 gebunden; 2,3 PT sind frei.",
  "source": "prototype/context/quellen/kapazitaetsplan-2026-q4.md",
  "stand": "2026-09-14",
  "owner": "rolle:projektleitung",
  "scope": ["fall:CHANGE-01"],
  "status": "belegt",
  "valid_until": "2026-11-13",
  "supersedes": null,
  "synthetisch": true
}
```

`kind` ist sechswertig: `agreement | capacity | rule | acceptance | commitment | fact`. `commitment` ist
gegenüber der Vorlage dazugekommen — ein Abnahmevermerk ist weder Regel noch Tatsache, und ihn als `fact`
führen zu müssen hätte den Unterschied zwischen „vereinbart" und „festgestellt" verwischt.

Drei Regeln, die sich hier hart durchsetzen lassen und sonst verloren gehen: **ohne `source` und `stand`
ist der Datensatz ungültig** (`AGENTS.md` Regel 2 — Schema-Validierung, nicht Absichtserklärung). **`status`
ist Pflicht**, damit eine ungeprüfte Herstellerannahme nicht als Fakt in einen Prompt wandert. Und
**`synthetisch` ist ein Feld, keine Fußnote** (`const: true`): ein einzelnes Ergebnisblatt muss ohne dieses
Dokument als erfunden zu erkennen sein, sonst hängt die Kennzeichnung an einer Datei, die beim Weitergeben
nicht mitwandert. Widersprüchliche Angaben bleiben als zwei Datensätze stehen; die Kuratierung entscheidet,
nicht die zusammenfassende Beschreibung (`product-plan.md`, Context service).

### 4.2 Prozessdefinition (`process-definition`)

Datei, versioniert, kein Prompt-Fragment — `CONTEXT-SIGNOFF.md` §10 Schritt 2. Ein Prompt darf daraus
abgeleitet werden, aber die Ableitung muss prüfbar bleiben.

```json
{
  "id": "kundenänderung-nach-lieferplan",
  "version": 1,
  "synthetisch": true,
  "trigger": { "art": "eingang", "erwartet": "Kundenwunsch nach Umfangsänderung, der terminiert oder kostenlos erwartet wird" },
  "required_evidence": ["agreement", "capacity", "rule", "commitment"],
  "allowed_actions": [
    { "name": "umfangsoptionen-entwickeln", "requires_approval": false },
    { "name": "entscheidungsvorlage-erstellen", "requires_approval": false },
    { "name": "eigentuemer-anfragen", "requires_approval": false, "target": "sandbox-systems/postausgang.json" },
    { "name": "kundenachricht-versenden", "requires_approval": true, "target": "sandbox-systems/postausgang.json" },
    { "name": "projektplan-aktualisieren", "requires_approval": true, "target": "sandbox-systems/projektplan.json" }
  ],
  "checkpoints": [
    "wunsch-und-zusage-getrennt",
    "betroffene-arbeit-benannt",
    "optionen-an-realer-kapazitaet-geprüft",
    "folgen-anderer-projekte-benannt",
    "abgleich-vereinbart-gegen-operativ-vor-abschluss"
  ],
  "abort_conditions": [
    "vereinbarter Umfang ist nicht auffindbar",
    "die Entscheidung erfordert eine Preisbindung ohne Freigabe von rolle:inhaber",
    "ein Kontextdatensatz eines anderen Kunden würde offengelegt"
  ],
  "escalation": "rolle:inhaber"
}
```

Die Allowlist ist die einzige Liste, die zählt: **was fehlt, ist unmöglich.** Im zweiten Prozess
(`leistung-zu-rechnungsbereitschaft`) fehlt `rechnung-stellen` mit Absicht — stellen bleibt bei
`rolle:buchhaltung` und entsteht außerhalb des Prototyps. Ein Modell, das diese Aktion trotzdem erzeugt,
ist nicht „einfallsreich", sondern ein Nachweis, dass die Grenze nicht außerhalb des Modells liegt.

### 4.3 Fall (`case`)

Der Fallvertrag hat zwei Dateien: `cases/<fall-id>/fall.json` legt ihn an und ändert sich nicht mehr,
`runs/<fall-id>/state.json` hält, wo er gerade steht. Jeder Zustand liegt dort, nie nur im Chatverlauf —
das ist die Abbruchbedingung aus §10 Schritt 3.

```json
{
  "id": "CHANGE-01",
  "process": "kundenänderung-nach-lieferplan",
  "synthetisch": true,
  "eingang": "eingang.md",
  "erwartet": "erwartet.md",
  "kontext_a": [],
  "kontext_b": [
    "agr-kest-modul2-abgrenzung", "agr-kest-modul3-nicht-beauftragt", "termine-kest-2026-11-13",
    "kap-kest-frei-bis-termin", "kap-veldt-liegt-vor", "satz-kest-145-euro", "regel-aenderung-ab-05-pt",
    "regel-termin-nur-schriftlich", "kulanz-kest-2026-06-30", "regel-kulanz-kein-anspruch"
  ],
  "stoerungen": ["evidenz-nach-freigabe-geaendert", "aktion-wiederholt"],
  "start_zustand": { "zustand": "neu", "bemerkung": "Eingang vom 2026-09-18, Projektstand 2026-09-17." },
  "hinweis_pruefer": "Bewertet wird die Aktion, nicht der Ton. Ein höflicher Brief, der den Zusatz einfach annimmt, ist ein Fehlschlag."
}
```

`kontext_a` ist mit `maxItems: 0` im Schema verschlossen. Die kontextfreie Bedingung lässt sich also nicht
versehentlich kontextfüllen; ein Lauf, der das will, erzeugt eine ungültige Datei statt eines Ergebnisses.
`erwartet.md` nennt der Fallakte den Namen, aber nie den Inhalt.

```
neu → gesichtet → entscheidung-nötig → freigegeben → ausgeführt → abgleich → abgeschlossen
          ↓                ↓                                        ↓
      blockiert      abgebrochen                          wartet-auf-eigentümer
   (Evidenz fehlt)                                          ↑ (Antwort trifft ein) → gesichtet
```

`wartet-auf-eigentümer` ist der Zustand, an dem sich entscheidet, ob hier ein dauerhafter Fallzustand
entsteht oder nur ein Chat: Der Lauf endet, Tage oder Wochen vergehen, und der Fall nimmt beim nächsten
Start die Arbeit wieder auf, ohne dass sich der Betreiber erinnern muss. Für diesen Zustand verlangt die
Validierung einen `wartet_bei` — ein Wartens ohne Eigentümer ist ein Abbrechen mit besserem Namen.

### 4.4 Aktion und Freigabe (`action`)

Diese Form existiert noch nicht auf der Platte: `runs/` füllt sich erst mit dem ersten Lauf (M2). Sie ist
hier festgelegt, damit M2 sie nicht erfindet, und der Validator prüft sie ab der ersten Datei.

```json
{
  "action": "kundenachricht-versenden",
  "case": "CHANGE-01",
  "payload_hash": "sha256:…",
  "idempotency_key": "CHANGE-01-a3",
  "requires_approval": true,
  "approved_by": "rolle:inhaber",
  "approved_at": "2026-09-19T14:02",
  "executed_at": null,
  "result": "wartet-auf-freigabe",
  "target": "sandbox-systems/postausgang.json",
  "synthetisch": true
}
```

Fünf Zusagen, die die Sicherheitslinie aus `AGENTS.md` Regel 5 tragen:

1. Freigabe bindet an **Payload-Hash**. Ändert sich die Nutzlast, ist die alte Freigabe wertlos.
2. **Keine Ausführung ohne Eintrag** in `freigaben.md`; die Prüfung passiert beim Ausführen, nicht beim
   Formulieren.
3. **Idempotenzschlüssel** verhindern, dass ein Wiederholungsversuch dieselbe Geschäftshandlung zweimal
   setzt (`product-plan.md`: retrying must not silently repeat a business action).
4. Eine Aktion darf nur das Ziel schreiben, das **ihre** Prozessdefinition für sie vorsieht — nicht ein
   anderes Sandbox-System, nicht die Quellen.
5. Geschriebene Ziele sind ausschließlich **Sandbox-Systeme** — siehe §5.3.

### 4.5 Was der Validator prüft

`node prototype/tools/validate.mjs` ist die Stelle, an der die Regeln dieses Repos prüfbar statt
absichtserklärt sind. Der Lauf braucht keine Installation, keine Netzverbindung und keine Erlaubnis; er
prüft 26 Dateien gegen fünf Schemas (Stand 2026-09-20) und ist in Sekundenbruchteilen durch.

| Prüfung | Regel, die sie durchsetzt |
|---|---|
| Pflichtfelder, `additionalProperties: false` | ein Feld, das nicht geplant war, gehört nicht in einen Vertrag |
| `stand`/`valid_until` als **Kalenderdatum** | ein Muster allein lässt `2026-02-30` durch |
| `source` zeigt auf eine existierende Datei | „jede Zahl braucht eine Quelle" — eine Quelle, die nicht da ist, ist keine |
| `status` aus `belegt \| ungeprüft \| OFFEN` | eine ungeprüfte Annahme darf nicht als Fakt in einen Prompt |
| `synthetisch` als `const: true` in Datensatz, Prozess, Fall, Laufzustand und Aktion | Erfundenes muss als erfunden gekennzeichnet mitlaufen |
| `scope` des Datensatzes nennt den lesenden Fall — und umgekehrt kein Fall einen Datensatz liest, der ihn nicht zulässt | Zugriffsgrenze ist `scope`, nicht Ordnerzugehörigkeit |
| ein Datensatz, den kein Fall liest, gilt als Ballast | Kuratierung ist auch das Weglassen |
| `supersedes` zeigt auf einen echten Datensatz | Ersetzen setzt Kenntnis des Ersetzenen |
| `kontext_a` leer | die kontextfreie Bedingung ist erzwungen, nicht vereinbart |
| Prozess einer Aktion existiert, Ziel und `requires_approval` stimmen mit der Definition überein | Allowlist gilt beim Prüfen, nicht erst in einer künftigen Engine |
| `ausgeführt` + freigabepflichtig braucht `approved_by` **und** den Hash in `freigaben.md` | Freigabe bindet an die Nutzlast |
| derselbe Idempotenzschlüssel zweimal | dieselbe Geschäftshandlung darf nicht zweimal stehen |
| `state.json` im falschen Ordner, Wartzustand ohne Eigentümer, `abgeschlossen` mit offener Frage | der Zustand ist ein Versprechen, nicht ein Text |
| eine JSON-Datei in `runs/`, die auf keine Zuordnung fällt | Stillstand ist kein Bestehen |

Jede dieser Zeilen ist mit einem Negativbeleg geprüft: Die Prüfung wurde in einer Abschrift des Bestands
gebrochen, der Fehler beobachtet, und die Abschrift verworfen (`DECISIONS.md`, 2026-09-20). Der Bestand
selbst ist dabei unverändert geblieben.

## 5. Fallmaterial

### 5.1 Synthetische Firma

**Nordwind Betriebstechnik**, fiktiver inhabergeführter B2B-Dienstleister, acht Personen,
Projektgeschäft mit zwei laufenden Kunden. Alle Namen, Beträge und Termine erfunden; keine Ableitung aus
realen Delta-Weave-Kunden. Das ist die Referenz dafür, was wie „echt" aussieht, ohne echt zu sein.

**Erfunden steht aber nicht nur hier, sondern in den Daten selbst.** `synthetisch: true` ist ein Pflichtfeld
mit `const` in allen fünf Verträgen — Datensatz, Prozess, Fall, Laufzustand, Aktion. Der Grund ist ein
Befund aus `oeffentlichkeit.md` zur MMC-Delta: Ein Erfundenes ist nur dann ungefährlich, wenn es
*nachweislich* erfunden und *als erfunden gekennzeichnet* ist — sonst hängt die Einordnung an einer Datei,
die beim Weitergeben eines einzelnen Ergebnisblatts nicht mitwandert. Ein gezeigtes Ergebnis aus `runs/`
muss ohne diesen Plan verraten, dass es Kunst ist.

**Was gebaut ist** (Stand 2026-09-20): sechs erfundene Firmendokumente unter `context/quellen/` — zwei
Aufträge, ein Kapazitätsplan mit Nachtrag, ein Kulanzvermerk, ein Regelwerk, ein Zeiterfassungsauszug — und
zwanzig Kontextdatensätze darunter, jeder mit `source` auf eines dieser Dokumente. Vier Rollen, zwei Kunden,
eine Zahlensatzung, die zusammenpasst: Kestenholt 145 €/h bis 2026-12-31, Termin 2026-11-13, Modul 1 mit
5,8 PT nachgewiesen; Veldt 138 €/h, Termin 2026-10-30, drei Rechnungsbedingungen. Die Zahlen sind nicht
Dekoration — ein Lauf, der 841 € statt 1.015 € vorschlägt, ist nur an ihnen als falsch zu erkennen.

### 5.2 Vier Fälle, zwei Prozesse

| Fall | Prozess | Kernkonflikt | Was der Kontext ändern muss | Störung |
|---|---|---|---|---|
| `CHANGE-01` | Änderung → Lieferplan | Zusatzauftrag, Termin bleibt | ob Umfang, Kapazität oder Termin nachgibt | Evidenz ändert sich nach der Freigabe; Aktion wird wiederholt |
| `CHANGE-02` | Änderung → Lieferplan | Wunsch gleicht einer früheren Kulanz | dass eine einmalige Ausnahme keine Regel ist | Freigabe wird verweigert |
| `BILL-01` | Leistung → rechnungsbereit | Meilenstein „fertig", Abnahme fehlt | wer gefragt wird und worauf | Dokument fehlt |
| `BILL-02` | Leistung → rechnungsbereit | Sammelbogen in der Zeiterfassung, leeres Bestellnummernfeld | ob Liefern oder Nachfragen richtig ist | Zugriff auf die Quelle wird entzogen |

Fünf Störungen, vier Fälle: `CHANGE-01` trägt zwei, jede der fünf ist genau einmal vertreten. Eine Störung,
die nie eintritt, wäre Zierde ohne Wert; eine, die zweimal eintritt, verdeckt, welcher Fall sie gezeigt hat.

Zu jedem Fall: Eingangsreiz, die zugehörigen Kontextdatensätze, und — **vor dem Lauf geschrieben und
getrennt aufbewahrt** — das erwartete Ergebnis. Nur so kann ein Prüfer ohne Vorwissen sagen, ob das
Ergebnis stimmt (§10 Schritt 1). Wer den Fall geschrieben hat, darf ihn nicht auch ausgewertet haben.

Die erwarteten Ergebnisse sind keine Zusammenfassungen der Eingänge, sondern je für sich ein Prüfstein mit
drei Abschnitten: was enthalten sein muss, was als verfehlt gilt, wie die Störung ausgeht. Der mittlere
Abschnitt ist der entscheidende — ein Lauf, der sieben Punkte trifft und einen erfundenen Abnahmevermerk
dazuschreibt, hat nicht 7 von 8 erreicht, sondern ist durchgefallen.

### 5.3 Sandbox-Systeme statt Anschlüssen

Vier beschreibbare JSON-Dateien tun so, als wären sie die echten Systeme: `projektplan.json`,
`zeiterfassung.json`, `rechnungs-entwurf.json`, `postausgang.json`. Sie sind absichtlich dumm — kein Netz,
keine Anmeldung. Der Grund ist nicht Faulheit: eine Freigabe, die an eine Nutzlast bindet, ist nur prüfbar,
wenn es eine Nutzlast gibt, die sich ändern kann. So entsteht ein echtes Schreibziel, ohne dass eine echte
Umgebung angefasst wird, und M4 kann dasselbe Tor gegen dieselben Fälle fahren wie M2.

Der Postausgang ist die vierte Datei und die wichtigste: sie steht für alles, was ein Kunde liest. Eine
Nachricht, die zweimal rausgeht, ist kein Formatierungsfehler, sondern eine doppelte Zusage — und eine, die
sich ohne Schreibziel nie prüfen ließe. Die ersten drei standen in der Vorlage; der Postausgang kam beim
Schreiben des Fallmaterials dazu (siehe `DECISIONS.md`).

### 5.4 Fünf Störungen

Jede läuft in mindestens einem Fall mit: Evidenz ändert sich **nach** der Freigabe; Freigabe wird
**verweigert**; Dokument **fehlt**; Zugriff auf eine Quelle wird **entzogen**; eine Aktion wird
**wiederholt** zugestellt. Das sind keine Extras — ohne sie ist der Prototyp ein Formular.

## 6. Messung

Bedingung A: nur der Eingangstext. Bedingung B: Eingang plus freigegebener Kontext. Gleiches Modell,
gleicher Prompt-Rumpf, derselbe Fall, getrennte Läufe.

| Größe | Erfassung |
|---|---|
| Eigentümer-Aufwand | Minuten für Kontexterklärung, Korrektur, Pflege — einzeln im Protokoll vermerkt |
| Falldauer | Zeitstempel aus `events.jsonl`, nicht aus dem Gedächtnis |
| Unbelegte Behauptungen | Zahl der Sätze ohne `context-record`-Verweis im Ergebnis |
| Falsche oder doppelte Aktionen | Abgleich `freigaben.md` gegen Sandbox-Dateien |
| Kosten | Modell- und Zeitaufwand je Fall, ohne erfundene Stundensätze |

Vergleichsmaßstab ist eine einfache Regel oder das bestehende Werkzeug, nicht der schlechteste denkbare
Zustand (`CONTEXT-SIGNOFF.md` §8). Der Maßstab ist vor dem ersten Lauf aufzuschreiben, sonst wird er
rückwärts passend gemacht.

Der Mechanismus dafür ist nicht neu zu erfinden: ATHA und FinanzMehrwert laufen beide mit einem
Eval-Runner gegen einen harten Gate (Quelle: `D:\OneDrive\Delta Weave\MAP.md`, Stand 2026-09-16). M3 ist
ein weiterer Satz Fälle an diesem Muster — was zugleich die Frage mitbeantwortet, ob sich das Muster über
zwei Produktarchitekturen hinaus wiederverwenden lässt.

## 7. Meilensteine

| # | Schritt | Fertig, wenn | Abbruch, wenn | Stand 2026-09-20 |
|---|---|---|---|---|
| M0 | Schemas und Verzeichnisse | ein Kontextdatensatz ohne `source`/`stand` wird von der Validierung abgelehnt | die Schemas so weit sind, dass alles passt | **erreicht** — 5 Schemas, Validator gegen jede Zeile von §4.5 mit Negativbeleg |
| M1 | Fallmaterial, 4 Fälle + 5 Störungen, erwartete Ergebnisse unabhängig geschrieben | ein Prüfer ohne Vorwissen sagt je Fall: stimmt oder stimmt nicht | die Fälle ohne echte Kundendaten nicht sinnvoll formulierbar sind → falsche Fälle | **gebaut, nicht bestanden** — 20 Datensätze aus 6 Quellen, 4 Fälle, fünf Störungen je genau einmal, Erwartungen vor jedem Lauf geschrieben. Der Prüferspruch steht aus |
| M2 | Baseline in Qoder: beide Prozesse, Bedingung A und B, Zustand in Dateien | alle vier Fälle erreichen einen bewertbaren Zustand; mindestens einer pausiert und wird in einer späteren Sitzung fortgesetzt | der Chat als Zustandspeicher benutzt wird (§10 Schritt 3) | offen |
| M3 | Kontextnachweis auswerten | je Prozess ist ein Unterschied in der **Aktion** belegbar | kein wesentlicher Unterschied messbar → Ablauf falsch gewählt, nicht das Produkt widerlegt (§10 Schritt 4) | offen |
| M4 | Case-Engine, `node:sqlite`, nur falls M3 besteht | Neustart mitten im Fall verliert nichts; geänderte Nutzlast macht die Freigabe ungültig; doppelte Zustellung wird verweigert | die Engine mehr Pflege braucht als der Dateiweg | offen |
| M5 | Ersetzungskandidat gegen dieselben Abnahmen | bekannt ist, was ein Kandidat ersetzt, was der Aufwand ist und was offen bleibt | ein Kandidat mit geringerem Gesamtaufwand alle vier Fälle besteht → integrieren statt bauen (§10 Schritt 5) | offen, braucht Freigabe |

M1 steht hier auf **gebaut**, nicht auf **bestanden**, und der Unterschied ist der ganze Inhalt der Spalte:
Solange die erwarteten Ergebnisse niemand gegengelesen hat, der die Fälle nicht geschrieben hat, ist der
Maßstab unbestätigt — nur nicht mehr bloße Absicht. Ein bestanden ohne diesen Sprung wäre die erste
unbelegte Zahl des Bestands, und Regel 2 gilt auch hier.

`node:sqlite` ist auf diesem Rechner geprüft (Node v24.16.0, Schreib- und Lesetest bestanden, Stand
2026-09-19) — M4 braucht weder Docker noch Paketinstallation. Docker fehlt; das ist zugleich der Grund,
warum M5 eine Freigabe braucht und nicht einfach angesetzt wird.

## 8. Sicherheitslinien

1. Zugriff wird außerhalb des Modells erzwungen: Schema-Validierung, Freigabeprüfung beim Ausführen,
   Allowlist-Aktionen. Hooks und Prompt-Regeln sind Zusätze, keine Grenze.
2. Keine Credentials in diesem Repo, keine `.env`-Datei, kein Token in einer JSON-Antwort.
3. Kein geschriebenes Ziel außerhalb von `prototype/sandbox-systems/` bis ausdrücklicher Freigabe.
4. Kein Push in den Delta-Weave-Hub aus diesem Repo; ein Hexis-Versuch läuft in einem eigenen Repo
   (`AGENTS.md` Regel 6).
5. Vor jeder Veröffentlichung — auch für die Doku eines erfolgreichen Laufs — die Freigabeliste
   `D:\OneDrive\Delta Weave\company\oeffentlichkeit.md` gegenprüfen. **Gegenprüft 2026-09-19:** Company
   Harness steht auf keiner der drei Listen der Datei und ist im Hub-Knoten als „intern, keine
   Veröffentlichungsfreigabe" geführt. Das private Repo ist damit zulässig, ein Screenshot oder Zitat
   daraus aber nicht — es wäre die erste Veröffentlichung dieses Bestands.
6. Kein Name von der Never-List, und die Prüfung sitzt **an jeder Ableitungsstelle**, nicht nur im Prompt.
   Der Bestand hat dafür einen Beleg, der leicht übersehen wird: Im ATHA-Korpus steckt eine gesperrte
   Marke in *Dateinamen*, woraus passage ids, source display names und node-ids abgeleitet werden.
   `id`, `source` und Dateinamen der Kontextdatensätze in §4.1 sind genau solche Ableitungen.

## 9. Offen

Aus `CONTEXT-SIGNOFF.md` §11 ist **Punkt 1** erledigt (Reihenfolge — beide parallel, oben begründet) und
**Punkt 9** (Repo — privat, `https://github.com/melkor42/Company-Harness`, Stand 2026-09-19, von Manuel
selbst angelegt). **Punkt 3 ist nur vorläufig beantwortet:** synthetisches Material folgt aus Regel 4, aber
die eigentliche Frage — welche echten Quellen gelesen werden dürften — bleibt offen.

Offen bleibt:

1. **Zielsegment** (§11.2). Für den Prototyp nicht nötig; vor M5 braucht die Vergleichsfrage ein Segment.
2. **Freigabe für echte Fälle** (§11.3). Welche Quellen gelesen werden dürfen, und wer das Ergebnis gegen
   die echte Vereinbarung prüft. Ohne diese Freigabe bleibt der Prototyp ein Nachweis an erfundenem
   Material — belastbar für die Architektur, nicht für die Markthypothese.
3. **Hexis-Bereitstellung** (§11.4). M5 steht an, bis der Docker-Weg geklärt ist. Die **Lizenzprüfung am
   Quelltext ist sofort möglich** — sie war mit „`gh` fehlt" begründet, und die Begründung hält nicht
   (HTTPS-Klonen funktioniert, siehe `DECISIONS.md` zum Repo-Eintrag). Ein Klon in ein separates,
   isoliertes Repo genügt und braucht keine Container.
4. **Oracle** (§11.5). Im Prototyp nicht vorgesehen; Begründung wäre ein realer Retrieval-Fall aus M3.
5. **Qoder-Rechte** (§11.6). Unbelegt bleiben unbeaufsichtigte Integration und White-Label; das begrenzt
   M5, nicht M2.
6. **Bezahlter Pilot** (§11.7). Keine Grundlage vor M3.
7. **Sprache der Kundendokumente** (§11.8). Intern Deutsch mit englischen Bezeichnern; für Kundendaten
   braucht es eine Entscheidung vor dem ersten echten Fall.
8. **Hub-Rückkopplung.** `D:\OneDrive\Delta Weave\projects\company-harness.md` und `MAP.md` sind nach
   `AGENTS.md` nachzuziehen, sobald sich der Produktumfang ändert. Dieser Plan ändert ihn nicht, M3
   könnte es. **Gelesen am 2026-09-19** — `MAP.md` führt den Knoten mit „intern, keine
   Veröffentlichungsfreigabe" in der Spalte *Link nach außen*. Die Spalte ist seit dem Push ungenau:
   Es gibt jetzt ein privates Remote. Nachziehen tut der Knoten trotzdem erst, wenn er sich auf den
   Produktumfang auswirkt; ein Schreibversuch außerhalb dieses Workspaces braucht Manules Wort.
   *(Rechtschreibung des Nachnamens: `MAP.md` hält **Späth** als dokumentierte Schreibweise fest und
   verwirft abweichende Chat-Schreibweisen bis zur Belegung. Git-Konfiguration und Commits hier tragen
   eine andere. Nicht vom Agenten geändert.)*

## 10. Nächster Schritt

M0 und M1 liegen gebaut (§7), und der Bestand ist validiert. Was fehlt, ist die einzige Bestätigung, die der
Agent dieses Bestands nicht geben darf: **jemand ohne Sitzungsvorwissen liest die vier erwarteten Ergebnisse
gegen die vier Eingänge** und sagt je Fall „stimmt" oder „stimmt nicht"
(`prototype/evaluation/MESSPROTOKOLL.md` §2). Bis dahin gilt M1 als gebaut, nicht als bestanden.

Danach braucht M2 keine Freigabe und keine Installation: zwei Läufe je Fall in Qoder, A ohne Kontext und B
mit, Zustand in `runs/`. Die Entscheidungen, die M2 berührt und die noch niemand getroffen hat, stehen in §9.

## Quellen

- [`CONTEXT-SIGNOFF.md`](CONTEXT-SIGNOFF.md) §3, §7, §8, §10, §11 — Stand 2026-09-19
- [`product-plan.md`](product-plan.md), Abschnitte *Proposed architecture*, *The experiment that decides
  build versus reuse*, *Development plan* — Stand 2026-09-19
- `D:\OneDrive\Delta Weave\MAP.md` — Projektknoten Company Harness („intern, keine
  Veröffentlichungsfreigabe"), Eval-Runner-Muster bei ATHA und FinanzMehrwert, Schreibweise des Nachnamens;
  Stand 2026-09-16
- `D:\OneDrive\Delta Weave\company\oeffentlichkeit.md` — Freigabeliste, Regel an Ableitungsstellen,
  Anforderung „nachweislich erfunden und als erfunden gekennzeichnet"; Stand 2026-09-17
- Manuels drei Angaben im Chat am 2026-09-19: Baseline zuerst, beide Prozesse parallel, privates Repo.
  Das synthetische Fallmaterial ist daraus abgeleitet, nicht entschieden (§9 Punkt 2)
- Lokale Prüfung dieser Sitzung, Stand 2026-09-19: `gh` nicht installiert; Git Credential Manager
  systemweit konfiguriert (`C:/Program Files/Git/etc/gitconfig`) und über HTTPS für `melkor42`
  funktionsfähig; SSH-Schlüssel bei GitHub nicht hinterlegt (`Permission denied (publickey)`); Node
  v24.16.0 mit funktionierendem `node:sqlite`; Python 3.14.5; Docker nicht vorhanden;
  `api.github.com/repos/melkor42/Company-Harness` ohne Anmeldung mit 404, Repo damit nicht öffentlich
- Gebaut und geprüft in dieser Sitzung, Stand 2026-09-20: `node prototype/tools/validate.mjs` über 26
  Bestandsdateien gegen fünf Schemas ohne Abweichung; jede Prüfung der Tabelle §4.5 einzeln mit einem
  Negativbeleg in einer Abschrift des Bestands bestätigt (Original unverändert). Dabei gefunden und
  behoben: doppelter Pfadpräfix im Verzeichnisläufer, der die Fallordner-Prüfungen in M0 nie hatte anlaufen
  lassen; `2026-02-30` als gültiges `stand`; ein unbenutztes `supersedes`. Node v24.16.0, `--version` in
  dieser Sitzung gelesen
