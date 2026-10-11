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

Fragen: Wie arbeitest du am liebsten? Worauf legst du Wert, wenn dir jemand (Mensch oder
Maschine) Arbeit abnimmt? Was hat dich an bisherigen KI-Antworten geärgert?

Aus den Antworten die vier Abschnitte der Vorlage `assets/vorlagen/USER.md` füllen. Typische
Muster: Entscheidungen selbst treffen vs. delegieren; Zahlen selbst prüfen vs. prüfen lassen;
kurz und direkt vs. ausführlich erklärt. Die Antwort „geärgert" ist die ergiebigste — daraus
werden die Punkte unter „Was ich nicht will".

## Block 2 — Arbeit und Ziel → `VISION.md`

Fragen: Was soll mit diesem Setup entstehen — nicht heute, sondern wenn es funktioniert?
Was ist jetzt mühsam, das es dann nicht mehr sein soll? Woran könnte das Ganze scheitern?

Vorlage: `assets/vorlagen/VISION.md`. Den Abschnitt „Aktuelle Herausforderungen" mit dem
heutigen Datum versehen — er veraltet am schnellsten (siehe `regeln-und-verfall.md`).

## Block 3 — Regeln → `AGENTS.md`

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
