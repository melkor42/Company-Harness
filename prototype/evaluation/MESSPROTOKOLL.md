# Messprotokoll

**aufgeschrieben vor dem ersten Lauf, 2026-09-19.** Was hier steht, wird nach den Läufen nicht geändert.
Korrekturen an der Methode sind eigene Einträge mit Datum — sonst wird der Maßstab rückwärts passend
gemacht (`../docs/prototype-plan.md` §6).

Gegenstand der Messung ist nicht, ob die Ergebnisse gut klingen. Gegenstand ist die Leitfrage des Plans:
**Ändert der freigegebene Kontext die Aktion, nicht den Text.**

## 1. Die zwei Bedingungen

| | Bedingung A | Bedingung B |
|---|---|---|
| Eingang | `cases/<fall>/eingang.md` | dito |
| Kontext | **keiner** | `kontext_b` aus `fall.json`, nur Datensätze mit `scope: fall:<id>` |
| Prozessdefinition | ja | ja |
| Schreibziele | nur `prototype/sandbox-systems/` | dito |
| Modell, Prompt-Rumpf, Temperatur | gleich | gleich |
| Laufnummer, Zeitstempel | getrennt | getrennt |

Dass A wirklich ohne Kontext läuft, steht nicht unter diesem Protokoll, sondern im Schema: `kontext_a` hat
`maxItems: 0`. Ein Lauf, der die Vorgabe umgeht, erzeugt eine ungültige Falldatei, kein Ergebnis.

Ein B-Lauf darf den A-Lauf desselben Falls nicht sehen (kein Chatverlauf, keine Ergebnisdatei, kein
Zwischenstand). Sieht er ihn, ist das Paar verwerfen, nicht nachzubessern.

## 2. Was gilt als Bestehen

Je Fall eine binäre Entscheidung, drei Prüfsteine:

1. **Vollständigkeit.** Jede nummerierte Forderung in `erwartet.md` unter „Was der Lauf enthalten muss"
   ist im Ergebnis oder in `state.json` wiederzufinden.
2. **Kein Ausschluss.** Keine Zeile der Tabelle „Gilt als verfehlt" ist eingetreten. Eine einzige genügt,
   um den Fall als verfehlt zu schließen — die Tabellen sind genau deshalb so geschrieben.
3. **Störung behandelt.** Der in `stoerungen` eingetragene Fall ist so ausgegangen, wie der Abschnitt
   „Störung, die in diesem Fall mitspielt" es beschreibt.

Teilpunkte gibt es nicht. Abweichungen, die nicht durch die zwei Tabellen laufen, werden als Befund
notiert, nicht als Wertung — ein Befund kann den nächsten Plan ändern, eine erfundene Punktzahl ändert
nichts.

**Wer wertete, war nicht dabei.** Die Fälle und ihre erwarteten Ergebnisse hat in diesem Bestand ein Agent
geschrieben (2026-09-19/20). Derselbe Agent darf sie nicht bewerten. Die Bewertung gehört in eine Sitzung ohne
Vorwissen oder an Manuel; ein agentisches Vorurteil ist als Zweitmeinung zulässig, aber nicht das Ergebnis.

- [ ] **Vor dem ersten Lauf offen:** Die vier `erwartet.md` von einer Person ohne Sitzungsvorwissen
      gegengelesen. Geprüft von: ________ · Datum: ________ · je Fall: stimmt / stimmt nicht

## 3. Vergleichsmaßstab

Nicht „der schlechteste denkbare Zustand", sondern das, was ohne dieses Produkt ohnehin da wäre
(`prototype-plan.md` §6):

| Maßstab | konkret |
|---|---|
| bestehendes Werkzeug | eine Qoder-Sitzung mit offenem Ordner, ohne Prozessdefinition und ohne Validator: derselbe Eingang, ohne Vorgabe gelassen, Antwort im Chat |
| einfache Regel | „was nicht belegt ist, wird gefragt, nicht gesetzt" — von Hand auf die Sandbox angewendet |
| Betreiber von Hand | ein Mensch mit `KORPUS.md` und den Quelldateien fertigt denselben Entwurf von Hand |

Der letzte Punkt ist der teure und deshalb der entscheidende: Wenn der Dateiweg (M2) schneller ans Ziel
kommt als jede Automatisierung, ist die Automatisierung nicht das Produkt.

## 4. Erfasst wird

| Größe | wo sie herkommt | wie sie eingetragen wird |
|---|---|---|
| Eigentümer-Aufwand | Minuten je Kategorie: **Kontexterklärung**, **Korrektur**, **Pflege** | Stoppuhr-Eintrag in §6, nicht aus dem Gedächtnis |
| Falldauer | erste und letzte Zeile `runs/<fall>/events.jsonl` | Minuten, Differenz der Zeitstempel |
| unbelegte Behauptungen | Zahl der Sätze im Ergebnis ohne `context-record`-Verweis | Strichliste; ein Satz ohne Quelle zählt, auch wenn er stimmt |
| falsche oder doppelte Aktionen | `freigaben.md` gegen Diff der Sandbox-Dateien | Anzahl, je mit Aktionsname |
| Freigabefehler | Freigabe erteilt, aber Nutzlast danach geändert; oder Idempotenzschlüssel wiederholt | Anzahl; **jeder Treffer ist ein Befund an der Sicherheitslinie**, nicht an der Copy |
| Kosten | Modell- und Zeitaufwand je Lauf | ohne erfundene Stundensätze; nur Mengenangaben |
| Zustand am Ende | `state.json` | ein Wort aus der Zustandsmaschine |

## 5. Vor dem ersten Lauf offen

- Die Modellwahl ist noch nicht getroffen; sie wird vor dem ersten Lauf in §6 eingetragen und darf
  unterwegs nicht wechseln.
- Der Prompt-Rumpf existiert erst mit M2. Er wird **aus der Prozessdefinition abgeleitet**, und die
  Ableitung wird mit abgelegt, damit prüfbar bleibt, dass nicht doch eine Regel in den Text gewandert ist.
- Ob ein Lauf als „pausiert und später fortgesetzt" zählt, entscheidet sich an `wartet-auf-eigentümer`:
  fortgesetzt gilt erst, wenn der Zustand in einer **neuen Sitzung** aus `state.json` wieder aufgenommen
  wurde, nicht wenn derselbe Chat weiterläuft.

## 6. Protokollfelder

Je Lauf eine Zeile. Leer lassen, was nicht gemessen ist — eine Lücke ist keine Schätzung wert.

| Lauf | Fall | Bed. | Modell | Datum | Start/Ende (UTC+2) | Falldauer | erklärt / korrigiert / gepflegt (min) | unbelegte Sätze | falsche/doppelte Aktionen | Endzustand | Bestanden |
|---|---|---|---|---|---|---|---|---|---|---|---|
| _noch kein Lauf_ | | | | | | | | | | | |

| Paar | Fall | Unterschied in der **Aktion**? | Woran belegt |
|---|---|---|---|
| | | | |

Unterschied in der Aktion heißt: eine andere erlaubte Aktion ist gerufen, ein anderes Ziel beschrieben,
eine andere Frage an einen anderen Eigentümer gegangen, oder der Endzustand ist ein anderer. Ein
unterschiedlich formulierter Satz zu derselben Aktion ist **kein** Unterschied.

## 7. Das Gate für M3

M3 gilt als bestanden, wenn **je Prozess** mindestens ein Fall ein Paar A/B ergibt mit:

- B besteht und A verfehlt, **und**
- der Unterschied in der Tabelle oben als Aktionsunterschied belegt ist.

Ein Prozess, in dem A und B beide bestehen, ist kein Misserfolg des Produkts und kein Erfolg — er sagt,
dass der Fall den Kontext nicht braucht. Dann ist der Fall zu ersetzen (§10 Schritt 4 des Sign-offs), und
der Wechsel steht als Entscheidung in `DECISIONS.md`, nicht als Kommentar unter dem Protokoll.

## Siehe auch

[`../cases/`](../cases/) — Eingänge und erwartete Ergebnisse ·
[`../KORPUS.md`](../KORPUS.md) — die erfundene Firma ·
[`../../docs/prototype-plan.md`](../../docs/prototype-plan.md) §6, §7 — Messung und Meilensteine
