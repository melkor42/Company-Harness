# Einrichten-Leitfaden — Grundkontext aufbauen und in die Begleitung übergeben

Der Aufbau läuft als geführtes Gespräch in Blöcken. Jeder Block endet mit einer
geschriebenen Datei. Der Nutzer muss nicht wissen, was gebraucht wird — frage so,
dass Antworten leicht fallen, und schlage aus jeder Antwort sofort einen Dateiinhalt
vor, den er nur noch bestätigt oder korrigiert.

## Gesprächsregeln

- **Takt: Block mit Artefakt.** Zwei bis vier Fragen pro Runde sind genug — so viele,
  wie in einer Antwort bequem beantwortbar sind. Jeder Block schließt mit einer Datei.
- **Zweckansage vor jeder Frage.** Vor dem Stellen sagen, welche Verhaltensänderung
  des Agenten die Antwort bewirkt. Antworten sind nur so gut wie das Verständnis
  dessen, was sie bewirken — ohne Zweck sind selbst gute Fragen Ratespiele.
- **Prüfstein für jede Frage.** Ändert sich je nach Antwort ein benennbares Verhalten
  des Agenten? Wenn nein, fliegt die Frage raus.
- **Vorschlagen statt abfragen.** Nach jeder Antwort den fertigen Dateiabschnitt
  zeigen: „Ich würde das so festhalten: … — passt das?"
- **Antworten wiederverwenden.** Was einmal gesagt wurde, nicht erneut fragen;
  höchstens bestätigen lassen.
- **Leere lassen dürfen.** Was der Nutzer nicht weiß, wird als „OFFEN — klären,
  sobald …" markiert, nicht erfunden.
- **Sprache des Nutzers spiegeln.** Diese Dateien sind persönlich; schreibe in der
  Sprache, in der das Gespräch läuft.

## Block 0 — Verständnis (keine Datei)

Klären, bevor etwas geschrieben wird:

1. Welchen Harness benutzt du? *(Entscheidet, welcher Anhang aus `anhaenge/` gilt.)*
2. Was machst du — Arbeit, Rolle, wichtigste Projekte?
3. Was soll der Agent für dich übernehmen?
4. Gibt es schon Dateien, Regeln oder Notizen, die weiter gelten sollen? *(Vorhandenes
   lesen und einbauen — nie plattmachen.)*

**Arbeitskontext einordnen, nicht etikettieren.** Aus den Antworten ableiten, mit
welcher Passung der Mentor arbeitet: Eine Entwicklerin bekommt Vergleiche mit
Werkzeugen, die sie kennt, und mehr Anwenden; ein Unternehmer bekommt
Workflow-Beispiele und mehr Zeigen. Die Einordnung wählt Beispiele und Tempo —
sie steckt niemanden in eine Schublade, und sie ist korrigierbar, sobald die
Zusammenarbeit etwas anderes zeigt. Der Skill soll jedem helfen; die Passung macht
den Unterschied, wie er hilft.

## Grundbilder verankern (vor allen Dateien)

`didaktik.md` laden und die drei Grundbilder einführen — an einer Situation des
Nutzers, nicht als Vortrag: fremde Arbeitskraft mit begrenztem Gedächtnis; Kontext
als einzige Hebelstelle (sagen, anbieten, erlauben); Vertrauen als Korrigierbarkeit.
Genau eine Rückfrage: „Was davon ist dir neu?"

## Block 1 — Die Person → `USER.md`

Prüfstein gilt: Zwei Fragen bestehen ihn (Zweckansagen nicht vergessen):

1. „Was hat dich an bisherigen KI-Antworten geärgert?" — *Zweck: Daraus werden die
   Punkte unter „Was ich nicht will" — Abbruchkriterien, die jede Antwort des
   Agenten betreffen.* Die ergiebigste Frage des Blocks.
2. „Woran erkennst du, dass erledigte Arbeit gut ist?" — *Zweck: Daraus wird der
   Maßstab, an dem der Agent eigene Arbeit prüft, bevor er sie vorlegt.*

**Autonomie wird nicht gefragt, sondern voreingestellt.** Ob jemand delegiert, hängt
am Vertrauen, und Vertrauen wächst durch Gebrauch — nicht durch eine
Interviewantwort. Der Startzustand ist deshalb für alle gleich: *eng führen* — der
Agent legt Entwürfe vor und fragt vor Handlungen. Den Lockerungsmechanismus in zwei
Sätzen erklären: „Wenn der Agent etwas wiederholt gut macht, sag einmal: Das darfst
du künftig ohne Rückfrage. Genau das wird dann als Regel festgehalten." Lockerungen
wandern als datierte Regeln in die `AGENTS.md` (Block 3).

Aus den Antworten und aus Block 0 die vier Abschnitte der Vorlage
`assets/vorlagen/USER.md` füllen.

## Block 2 — Arbeit und Ziel → `VISION.md`

Fragen: Was soll mit diesem Setup entstehen — nicht heute, sondern wenn es
funktioniert? *Zweck: der Nordstern für Vorschläge und Prioritäten des Agenten.*
Was ist jetzt mühsam, das es dann nicht mehr sein soll? *Zweck: die Liste der
ersten Workflows — Abschnitt „Aktuelle Herausforderungen", mit Datum.* Woran
könnte das Ganze scheitern? *Zweck: daraus werden Schutzregeln.*

Vorlage: `assets/vorlagen/VISION.md`.

## Block 3 — Regeln → `AGENTS.md`

**Regeln führen oder sie blockieren — dazwischen gibt es nichts.** Eine führende
Regel verbessert jede Antwort, ohne einen einzigen Workflow einzuschränken; Muster:
„Fasse lange Ergebnisse am Anfang in wenigen Sätzen zusammen und hebe meine To-dos
sichtbar hervor." Eine Regel, die einen Weg vorschreibt, steht bald im Weg. Und am
schlimmsten ist die veraltete Regel: Sie wird mit gutem Grund befolgt — sie steht ja
schwarz auf weiß da — und produziert mit voller Überzeugung das Falsche. Deshalb
gelten hier drei Maßstäbe: **wenige** Regeln (jede kostet in jeder Session Kontext),
**nur führende** (gelten für viele Fälle und lassen dem Agenten den Weg frei;
vorschreibende Regeln nur bei einem benannten Schaden dahinter), **jede
verfallsanfällige mit Umkehrbedingung** (Block 5 zeigt das Muster).

Die erste Regel steht vor der ersten Frage fest: die Voreinstellung aus Block 1
(*eng führen* — Entwürfe vorlegen, vor Handlungen mit Außenwirkung fragen). Sie
kommt mit dem Einrichtungsdatum in die Datei; jede spätere Lockerung wird als eigene
datierte Regel darunter angehängt, nie überschrieben.

Fragen: Was soll der Agent **nie** tun? Was soll er **immer** tun? Jede Antwort an
den drei Maßstäben messen, bevor sie in die Datei darf.

## Block 4 — Ablage → Ordnerstruktur

Fragen: Was davon ist privat (Notizen, Kontakte, Finanzen, Zugänge)? Arbeitest du
an mehr als einem Gerät?

Grundmuster:

```
<workspace>/
├── AGENTS.md            # Regeln (immer geladen)
├── USER.md              # die Person
├── docs/
│   └── VISION.md        # Ziel und Herausforderungen
├── memory/              # Memory-Dateien + MEMORY.md (falls harness-seitig nicht vorgegeben)
└── private/             # privat, nie an Dritte, nie pushen — in .gitignore eintragen
```

Prinzip **agent-first**: eindeutige Namen, ein Einstiegsdokument, keine Duplikate.
Privates ausschließlich in `private/`; der Agent darf verweisen, aber Inhalte nie
nach außen geben. Bei mehreren Geräten: Git vs. Sync-Ordner gemeinsam festlegen und
als Memory-Eintrag notieren.

## Block 5 — Gedächtnis → `memory/` + `MEMORY.md`

In zwei Sätzen erklären, was Memories sind und wo sie bei *seinem* Harness liegen
(Anhang). Dann `MEMORY.md` aus der Vorlage anlegen (falls der Harness den Ort nicht
selbst vorgibt) und drei erste Einträge gemeinsam schreiben: ein `user-`-Eintrag
(Arbeitsweise), ein `feedback-`-Eintrag (die wichtigste Regel aus Block 3, mit
**Why:** und **How to apply:**), ein `reference-`-Eintrag (wo die Memory-Dateien
liegen).

Vier Schreibregeln mitgeben — sie verhindern, dass das Gedächtnis zur Falle wird:

- **Dreiteilung.** Jeder Eintrag ist dauerhafte Präferenz, veränderlicher Zustand
  oder historisches Ereignis — die Art entscheidet den Umgang. Bei „das ist
  inzwischen erledigt" wird der Zustand geändert, nicht eine zweite Notiz daneben
  gelegt — sonst taucht die alte später als offene Aufgabe wieder auf.
- **Umkehrbedingung.** Was veralten kann (Versionen, Pfade, Zuständigkeiten,
  Zustände), bekommt drei Teile: Datum, die Bedingung, an der man merkt, dass neu
  entschieden werden muss, und die Anweisung *neu prüfen, nicht annehmen*. Muster:
  „Deploy läuft über `deploy.sh` (Stand 2026-10-12 — gilt, solange das Skript im
  Repo liegt; bei Fehler neu prüfen)."
- **Fundortpflicht.** „Du hast am … gesagt" (mit Fundort) und „mein Eindruck ist"
  (jederzeit korrigierbar) bleiben unterscheidbar — eine Vertrauensfrage, keine
  Ordnungsfrage.
- **Nichts Tägliches, nichts Nachlesbares.** Kein Tageszustand, kein Vorratswissen,
  keine Duplikate, keine Absichten. Und ausdrücklich vereinbaren, **was nie** in
  Memories gehört: Credentials, Inhalte aus `private/`.

Gepflegt wird an Anlässen, nicht an Terminen: Bei jeder Richtungsänderung werden
betroffene Einträge im selben Zug nachgezogen; bei jedem Fehler, der auf einen
Eintrag zurückgeht, wird der Eintrag repariert oder gelöscht — nicht nur das
Ergebnis.

## Block 6 — Abschluss und Übergabe in die Begleitung

1. **Gegenprobe.** Der Nutzer benennt die drei Grundbilder in eigenen Worten — nicht
   vorlesen, abnehmen. Was fehlt, an einem Erlebnis nachfassen statt nachsagen.
2. **Begleitnotiz anlegen.** Ein `project-`-Memory-Eintrag hält fest: Begleitung
   aktiv, Grad „eng geführt" mit Einrichtungsdatum, offene Punkte aus dem Setup.
   Mehr Apparat braucht die Begleitung nicht — der Mentor benutzt ab jetzt das
   Gedächtnis, das er gerade eingerichtet hat.
3. **Die erste Korrektur einplanen** (`didaktik.md`, Anker-Erfahrung 1): einen
   bewusst überschreibbaren Vorschlag markieren, an dem der Nutzer erlebt, dass
   Korrigieren wirkt.
4. **Ladeprüfung zeigen.** Eine Datei, die nicht geladen wird, ist kein Kontext.
   Einmal vormachen: etwas Erkennbares in die Regeldatei schreiben, eine neue
   Sitzung öffnen, danach fragen. Kommt die Antwort ohne Nachlesen, trägt die
   Datei; kommt sie nicht, ist die Datei Dekoration.
5. **Pflegeanlass** vereinbaren: nach der ersten Woche echter Arbeit werden USER.md,
   AGENTS.md und die ersten Memories gegen die Wirklichkeit geprüft.

Offenes als `OFFEN` festhalten, nicht weglassen.
