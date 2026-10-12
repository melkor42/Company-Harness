# Gedächtnis-Hygiene — veralteter Kontext ist schlimmer als fehlender

Erinnern ohne Aktualisierung macht das System schlechter: Eine veraltete Regel wird
mit gutem Grund befolgt — sie steht ja schwarz auf weiß da — und produziert mit
voller Überzeugung das Falsche. Deshalb beginnt Hygiene beim **Schreiben**, nicht
bei der Reparatur.

## Die drei Arten von Information

Jeder Eintrag — in Memory-Dateien, Regeldateien, BEGLEITSTAND — gehört genau einer
Art an, und die Art bestimmt den Umgang:

| Art | Beispiel | Umgang |
|---|---|---|
| **Dauerhafte Präferenz** | „Antworten auf Deutsch." | Weiterverwenden, bei Korrektur aktualisieren |
| **Veränderlicher Zustand** | „Die Rückmeldung steht noch aus." | Mit Umkehrbedingung schreiben; vor Verwendung auf Aktualität prüfen |
| **Historisches Ereignis** | „Am Dienstag ging die Anfrage raus." | Als Vergangenheit erhalten; nie einen offenen Auftrag daraus ableiten |

Bei „das ist inzwischen erledigt" muss der aktive Zustand geändert werden — eine
zweite Notiz neben der alten reicht nicht, wenn die alte später weiter als offene
Aufgabe auftaucht. Und: Neu ist nicht automatisch maßgeblich. Ein beiläufiger
Kommentar von heute kann weniger bindend sein als eine bestätigte Entscheidung von
letztem Monat — Aktualität, Verbindlichkeit und Bezug gehören zusammen.

## Die Umkehrbedingung

Verfallsanfällige Angaben (Versionen, Pfade, Zuständigkeiten, Zustandsbehauptungen,
Werkzeug-Empfehlungen) bekommen drei Teile, sonst gehören sie nicht in den Bestand:

1. **Datum** — wann es galt.
2. **Umkehrbedingung** — woran man merkt, dass neu entschieden werden muss; nicht
   bloß, wann geschrieben wurde.
3. **Anweisung für den Fall** — *neu prüfen*, nicht *annehmen*.

Muster: „Deploy läuft über `deploy.sh` (Stand 2026-10-12 — gilt nur, solange das
Skript im Repo liegt; bei Fehler neu prüfen)."

## Fundortpflicht: „du hast gesagt" vs. „mein Eindruck ist"

Ausdrücklich geäußerte Präferenzen und vom Modell abgeleitete Vermutungen bleiben
unterscheidbar — das ist eine Vertrauensfrage, keine Ordnungsfrage:

- „Du hast am 2026-10-05 gesagt, dass …" — mit Fundort.
- „Mein Eindruck aus der Zusammenarbeit ist …" — als Eindruck markiert, jederzeit
  korrigierbar.

Eine situative Entscheidung darf nie unbemerkt zur dauerhaften Zuschreibung werden.
Wer korrigiert, ändert den Eintrag an Ort und Stelle — nicht daneben.

## Status statt Löschzwang

Aussagen, die sich nicht von selbst prüfen lassen, tragen eine Statusmarke:
**belegt / einseitig / unbelegt / OFFEN**. Der Agent darf mit „unbelegt" arbeiten,
aber nicht so tun, als wäre es „belegt".

## Was gar nicht erst in den Bestand gehört

- **Tageszustand** — eine Regeldatei ist kein Kalender.
- **Vorratswissen** — was der Agent bei Bedarf selbst nachlesen kann.
- **Wiederholungen** — eine Stelle, überall sonst nur verweisen; was an zwei
  Stellen steht, läuft auseinander.
- **Absichten** — „demnächst umbauen" wird vergessen und dann zur Lüge im Bestand;
  Absichten gehören in ein datiertes Entscheidungsprotokoll.

## Pflegeanlässe statt Pflegetermine

Pflege an Kalendertermine scheitert. Was funktioniert: **Anlässe**. Nach jeder
Richtungsänderung werden betroffene Dateien im selben Zug nachgezogen; bei jedem
Fehler, der auf eine Regel zurückgeht, wird die Regel repariert oder gelöscht —
nicht nur das Ergebnis. Der Mentor benennt solche Anlässe, wenn sie auftreten
(Anstoß 3 der Begleiten-Disziplin), und vereinbart am Ende des Einrichtens genau
einen festen: nach der ersten Woche echter Arbeit.
