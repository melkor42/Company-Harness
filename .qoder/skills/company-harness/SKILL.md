---
name: company-harness
description: Geführtes Erst-Setup für einen Agenten-Harness, auf Deutsch. Erklärt Neueinsteigern aus der Chat-Welt, was ein Harness ist (Sessions, Skills, Hooks, Memories, Kontextdateien), und baut per Interview den Grundkontext auf — USER.md, AGENTS.md, Workspace-Vision, Dateistruktur mit privatem Bereich, Regeln mit Verfallsdisziplin, Memory-System mit ersten Einträgen. Nutzen, wenn jemand neu mit einem Harness anfängt (Qoder, Claude Code, Cursor), fragt was ein Harness ist, oder seinen Workspace, AGENTS.md, USER.md oder sein Memory-System einrichten will.
---

# Company Harness — geführtes Setup

## Überblick

Führe eine Person, die zum ersten Mal einen Harness benutzt, durch zwei Schritte: erst
verstehen, was ein Harness ist; dann per Interview den eigenen Grundkontext aufbauen und
als Dateien schreiben. Die Person muss nicht wissen, wonach sie fragen müsste — du führst.

## Grundhaltung

- **Führen, nicht abfragen.** Pro Runde zwei bis vier Fragen, dann sofort einen fertigen
  Dateivorschlag zeigen. Die Person redigiert, statt zu formulieren.
- **Schreiben, nicht erzählen.** Jeder Block endet mit einer Datei. Was nur besprochen
  wird, ist verloren.
- **Kurieren statt sammeln.** Weniger Kontext, besser kuratiert. Alles, was der Agent
  selbst nachlesen kann, gehört nicht in den Grundkontext.
- **Verfall verhindern.** Jede verfallsanfällige Angabe bekommt Datum und
  Überholungskriterium — Details in `references/regeln-und-verfall.md`.
- **Harness-Neutralität wahren.** Konzepte harness-neutral erklären; jede
  herstellerspezifische Angabe (Pfade, Felder, Registrierung) steht in einem Anhang unter
  `references/anhaenge/` und wird als solche markiert.

## Ablauf

### 1. Verstehen, wer da sitzt

Block 0 des `references/interview-leitfaden.md` abarbeiten: Welcher Harness, welche
Arbeit, welche Erwartung, was ist schon vorhanden? Vorhandene Dateien lesen und
einbauen — nie plattmachen.

### 2. Erklären — kurz und auf den Punkt

`references/was-ist-ein-harness.md` laden und in fünf bis acht Sätzen erklären, **nur so
weit wie die Person es für den nächsten Schritt braucht**: Modell vs. Harness, vergängliche
Session vs. dauerhafte Datei, die fünf Grundbegriffe. Kein Vortrag — die Datei ist der
Stoff, das Gespräch ist die Kür. Am Ende genau eine Rückfrage: „Was davon ist dir neu?"

### 3. Grundkontext per Interview aufbauen

Dem `references/interview-leitfaden.md` Block für Block folgen (Person → `USER.md`,
Arbeit und Ziel → `docs/VISION.md`, Regeln → `AGENTS.md`, Ablage → Struktur mit
`private/`, Gedächtnis → `memory/` + `MEMORY.md`). Vorlagen liegen in
`assets/vorlagen/`. Jede Datei der Person vor dem Schreiben als Entwurf zeigen.

### 4. Abschluss

`references/abschluss-checkliste.md` mit der Person durchgehen. Offenes als `OFFEN`
festhalten. Genau einen Pflegeanlass vereinbaren: nach der ersten Woche echter Arbeit.

## Ressourcen

- `references/was-ist-ein-harness.md` — die Erklärseite (Modell/Harness, Session/Datei,
  fünf Grundbegriffe, drei Grundsätze)
- `references/interview-leitfaden.md` — der geführte Aufbau in sechs Blöcken mit
  Gesprächsregeln und Ordner-Grundmuster
- `references/regeln-und-verfall.md` — warum veraltete Regeln schaden und wie das
  Überholungskriterium aussieht
- `references/abschluss-checkliste.md` — wann das Setup steht
- `references/anhaenge/qoder.md` — Qoder-Pfade, Skill-Format, Memory-Ablage, Grenzen
  (weitere Harness-Anhänge folgen demselben Muster, wenn sie gebraucht werden)
- `assets/vorlagen/` — USER.md, AGENTS.md, VISION.md, MEMORY.md, memory-eintrag.md

## Grenzen

- Keine echten Konten, Tokens oder Zugänge einrichten — Bedarf nur notieren und der
  Person zum Selbermachen geben.
- Keine Inhalte aus `private/` des Nutzers in Dateien außerhalb von `private/` schreiben
  oder an Dritte weitergeben; Verweis mit Pfad genügt.
- Das Setup nicht mit Regeln vollstopfen: Wenn ein Abschnitt leer bleibt, ist das ein
  ehrlicher Anfang, kein Mangel.
