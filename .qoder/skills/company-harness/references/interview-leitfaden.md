# Interview-Leitfaden — Grundkontext aufbauen

Der Aufbau läuft als geführtes Gespräch in Blöcken. Jeder Block endet mit einer geschriebenen
Datei. Der Nutzer muss nicht wissen, was gebraucht wird — **frage so, dass Antworten leicht
fallen**, und schlage aus jeder Antwort sofort einen Dateiinhalt vor, den der Nutzer nur noch
bestätigt oder korrigiert.

## Grundregeln des Gesprächs

- **Ein Block nach dem anderen.** Nie alle Fragen auf einmal stellen. Zwei bis vier Fragen
  pro Runde sind genug.
- **Vorschlagen statt abfragen.** Nach jeder Antwort den fertigen Dateiabschnitt zeigen:
  „Ich würde das so festhalten: … — passt das?" Der Nutzer redigiert lieber, als dass er
  formuliert.
- **Zweckansage vor jeder Frage.** Vor dem Stellen sagen, welche Verhaltensänderung des
  Agenten die Antwort bewirkt. Antworten sind nur so gut wie das Verständnis dessen, was
  sie bewirken — ohne Zweck sind selbst gute Fragen Ratespiele.
- **Antworten wiederverwenden.** Was in Block 1 gesagt wurde, in späteren Blöcken nicht
  erneut fragen; höchstens bestätigen lassen.
- **Leere lassen dürfen.** Wenn der Nutzer etwas nicht weiß, den Abschnitt mit einem Satz
  markieren („OFFEN — klären, sobald …") statt ihn zu erfinden oder zu drängen.
- **Sprache des Nutzers spiegeln.** Diese Dateien sind persönlich; schreibe in der Sprache,
  in der das Gespräch läuft.

## Block 0 — Verständnis (keine Datei)

Klären, bevor etwas geschrieben wird:

1. Welchen Harness benutzt du? *(Entscheidet, welcher Anhang aus `anhaenge/` gilt. Bei
   Unsicherheit: das Programm nennen lassen, in dem der Agent läuft.)*
2. Was machst du — Betrieb, Rolle, wichtigste Projekte?
3. Was soll der Agent für dich übernehmen: Schreiben, Recherche, Code, Ordnung, alles davon?
4. Gibt es schon Dateien, Regeln oder Notizen, die weiter gelten sollen? *(Vorhandenes
   lesen und einbauen statt plattzumachen.)*

## Block 1 — Die Person → `USER.md`

Prüfstein für jede Frage dieses Blocks: Ändert sich je nach Antwort ein benennbares
Verhalten des Agenten? Wenn nein, fliegt die Frage raus. Zwei Fragen bestehen den
Prüfstein (Zweckansagen nicht vergessen):

1. „Was hat dich an bisherigen KI-Antworten geärgert?" — *Zweck: Daraus werden die
   Punkte unter „Was ich nicht will" — Abbruchkriterien, die jede Antwort des Agenten
   betreffen.* Die ergiebigste Frage des Blocks.
2. „Woran erkennst du, dass erledigte Arbeit gut ist?" — *Zweck: Daraus wird der
   Maßstab, an dem der Agent eigene Arbeit prüft, bevor er sie vorlegt.*

**Autonomie wird nicht gefragt, sondern voreingestellt.** Ob jemand delegiert, hängt am
Vertrauen, und Vertrauen wächst durch Gebrauch — nicht durch eine Interviewantwort. Der
Startzustand ist deshalb für alle gleich: *eng führen* — der Agent legt Entwürfe vor und
fragt vor Handlungen. Den Lockerungsmechanismus in zwei Sätzen erklären: „Wenn der Agent
etwas wiederholt gut macht, sag einmal: Das darfst du künftig ohne Rückfrage. Genau das
wird dann als Regel festgehalten." Lockerungen wandern als datierte Regeln in die
`AGENTS.md` (Block 3). Eine Frage nach Delegieren vs. Selbst-Entscheiden ist nutzlos:
Sie fragt eine stabile Präferenz ab, die ein Neueinsteiger noch gar nicht haben kann.

Aus den Antworten und aus Block 0 die vier Abschnitte der Vorlage
`assets/vorlagen/USER.md` füllen — was dort schon gesagt wurde, nicht erneut fragen.

## Block 2 — Arbeit und Ziel → `VISION.md`

Fragen: Was soll mit diesem Setup entstehen — nicht heute, sondern wenn es funktioniert?
Was ist jetzt mühsam, das es dann nicht mehr sein soll? Woran könnte das Ganze scheitern?

Vorlage: `assets/vorlagen/VISION.md`. Den Abschnitt „Aktuelle Herausforderungen" mit dem
heutigen Datum versehen — er veraltet am schnellsten (siehe `regeln-und-verfall.md`).

## Block 3 — Regeln → `AGENTS.md`

Die erste harte Regel steht vor der ersten Frage fest: die Voreinstellung aus Block 1
(*eng führen* — Entwürfe vorlegen, vor Handlungen fragen). Sie kommt mit dem
Einrichtungsdatum in die Datei; jede spätere Lockerung wird als eigene datierte Regel
darunter angehängt.

Fragen: Was soll der Agent **nie** tun? (Typisch: nichts löschen ohne Rückfrage, nichts
veröffentlichen, keine fremden Konten anfassen.) Was soll er **immer** tun? (Typisch:
Quellen nennen, lieber fragen als raten.)

Die Vorlage `assets/vorlagen/AGENTS.md` füllen. Zwei Grenzen beachten:

- **Wenige Regeln.** Jede Regel kostet in jeder Session Kontext; zehn gute schlagen
  dreißig mittlere.
- **Verfallskriterium.** Jede Regel, die altern kann (Versionen, Pfade, „aktuell läuft …"),
  bekommt ein Datum und ein Kriterium, woran man ihre Überholung erkennt. Details:
  `regeln-und-verfall.md`.

## Block 4 — Ablage → Ordnerstruktur

Fragen: Was davon ist privat (Notizen, Kontakte, Finanzen, Zugänge)? Arbeitest du an mehr
als einem Gerät?

Daraus entsteht die Struktur — Grundmuster:

```
<workspace>/
├── AGENTS.md            # Regeln (immer geladen)
├── USER.md              # die Person
├── docs/
│   └── VISION.md        # Ziel und Herausforderungen
├── memory/              # Memory-Dateien + MEMORY.md (falls harness-seitig nicht vorgegeben)
└── private/             # privat, nie an Dritte, nie pushen — in .gitignore eintragen
```

Prinzip **agent-first**: Der Rest der Ablage wird so geordnet, dass der Agent ohne
Rückfrage findet, was er braucht — eindeutige Namen, ein Einstiegsdokument, keine
Duplikate. Privates kommt ausschließlich in `private/`; der Agent darf darauf verweisen,
aber Inhalte nie nach außen geben. Bei mehreren Geräten: Was in Git gehört und was nur
per Sync-Ordner wandert, gemeinsam festlegen und als Memory-Eintrag notieren.

## Block 5 — Gedächtnis → `memory/` + `MEMORY.md`

Hier liegt das größte Missverständnis: Viele Nutzer wissen nicht, dass der Harness ein
eigenes Gedächtnis hat — oder schreiben alles von Hand in eine einzige Datei. Erkläre in
zwei Sätzen, was Memories sind und wo sie bei *seinem* Harness liegen (Anhang!). Dann:

- `MEMORY.md` aus der Vorlage anlegen (falls der Harness den Ort nicht selbst vorgibt).
- **Erste Einträge gemeinsam anlegen** — aus dem, was im Gespräch schon gefallen ist:
  ein `user-`-Eintrag (Arbeitsweise), ein `feedback-`-Eintrag (die wichtigste Regel aus
  Block 3, mit **Why:** und **How to apply:**), ein `reference-`-Eintrag (wo die
  Memory-Dateien liegen und wie man neue anlegt).
- Vereinbaren, **was nie** in Memories gehört: Credentials, vergängliche Tageszustände,
  Inhalte aus `private/`.

## Block 6 — Abschluss

Die `abschluss-checkliste.md` mit dem Nutzer durchgehen, offene Punkte als `OFFEN`
markieren und vereinbaren, wann das Setup das erste Mal gewartet wird (Konkreter Anlass,
kein Kalendertermin: „nach der ersten Woche echter Arbeit").
