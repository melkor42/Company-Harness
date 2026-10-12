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

Die erste harte Regel steht vor der ersten Frage fest: die Voreinstellung aus
Block 1 (*eng führen* — Entwürfe vorlegen, vor Handlungen fragen). Sie kommt mit
dem Einrichtungsdatum in die Datei; jede spätere Lockerung wird als eigene datierte
Regel darunter angehängt.

Fragen: Was soll der Agent **nie** tun? Was soll er **immer** tun? Zwei Grenzen
beachten: Wenige Regeln (jede kostet in jeder Session Kontext; zehn gute schlagen
dreißig mittlere). Jede verfallsanfällige Regel bekommt Datum und Umkehrbedingung —
Details in `gedaechtnis-hygiene.md`.

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
(Anhang). Dann:

- `MEMORY.md` aus der Vorlage anlegen (falls der Harness den Ort nicht selbst vorgibt).
- Erste Einträge gemeinsam anlegen: ein `user-`-Eintrag (Arbeitsweise), ein
  `feedback-`-Eintrag (die wichtigste Regel aus Block 3, mit **Why:** und
  **How to apply:**), ein `reference-`-Eintrag (wo die Memory-Dateien liegen).
- Jeden Eintrag nach der Dreiteilung aus `gedaechtnis-hygiene.md` einordnen
  (dauerhafte Präferenz / veränderlicher Zustand / historisches Ereignis);
  veränderliches bekommt eine Umkehrbedingung.
- Vereinbaren, **was nie** in Memories gehört: Credentials, Tageszustände, Inhalte
  aus `private/`.

## Block 6 — Abschluss und Übergabe in die Begleitung

1. **Gegenprobe.** Der Nutzer benennt in eigenen Worten die drei Grundbilder — nicht
   vorlesen, abnehmen. Was hängen bleibt, bleibt; was fehlt, an einem Erlebnis
   nachfassen statt nachsagen.
2. **BEGLEITSTAND.md anlegen** aus `assets/vorlagen/BEGLEITSTAND.md`: Führungsgrad
   „eng geführt" mit Einrichtungsdatum, offene Punkte aus dem Setup.
3. **Einladung installieren** aus `assets/vorlagen/einladung.md`: maximal drei Zeilen
   in der immer geladenen Regeldatei (oder als Hook, harness-abhängig — Anhang),
   mit Ausschalter. Erklären: Diese Zeile ist der Grund, warum der Mentor morgen
   noch da ist — und dass sie sich jederzeit streichen lässt.
4. **Die erste Korrektur einplanen** (`didaktik.md`, Anker-Erfahrung 1): einen
   bewusst überschreibbaren Vorschlag markieren, an dem der Nutzer erlebt, dass
   Korrigieren wirkt.
5. **Ladeprüfung** (`ehrlichkeit-und-verifikation.md`): einmal zeigen, wie man prüft,
   ob eine Datei wirklich geladen wird — neue Sitzung, danach fragen.
6. **Pflegeanlass** vereinbaren: nach der ersten Woche echter Arbeit werden USER.md,
   AGENTS.md und die ersten Memories gegen die Wirklichkeit geprüft.

Offenes als `OFFEN` festhalten, nicht weglassen.
