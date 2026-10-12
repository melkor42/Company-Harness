# Linse — Urteil statt Einrichtung

**Stand 2026-10-12. Quelle:** Qoder-Agent-Session auf Manuels Diktat vom selben Tag. Das Diktat ist
derselbe Input, den er parallel an andere Modelle gibt; jede Linse steht für sich, dieses Dokument
knüpft an keiner anderen Arbeit in diesem Repo an.

**Status: Vorschlag, nicht bestätigt.** Was hier steht, ist eine Ableitung aus einem Befund, kein
entschiedener Plan. Zwei Angaben sind auf diesem Rechner geprüft und als solche gekennzeichnet;
alles Übrige ist Herleitung oder Einschätzung.

---

## 1. Warum es kein Handbuch gibt — und warum eines auch nichts nützen würde

Manuels Jenkins-Beispiel ist präziser, als es im Diktat klingt, und es trägt die ganze Argumentation.
Wer Jenkins zum ersten Mal sieht, versteht das Konzept nicht aus der Dokumentation. Er versteht es,
wenn ein Build rot wird und der Fehler im Log steht. Die Dokumentation beschreibt die Maschine; das
Verständnis kommt aus der Rückmeldung. Jenkins ist für Neueinsteiger deshalb so gut erlernbar, weil
jeder Fehler **lesbar** ist.

Ein Harness hat dieselbe Komplexität, aber eine Rückmeldung von ganz anderer Art: Seine Ausgabe ist
Sprache. Jede Antwort ist flüssig, selbstsicher und sieht aus wie eine Antwort. Eine falsche und eine
richtige sind für jemanden, der die Sache noch nicht beurteilen kann, **nicht zu unterscheiden** — und
ein Neueinsteiger kann sie per Definition nicht beurteilen. Deshalb fehlt beim Einstieg nicht die
Beschreibung. Es fehlt die Rückmeldung.

Daraus folgt, was dieses Onboarding eigentlich leisten muss. Nicht erklären, was ein Harness ist — das
ist nützlich, aber es ist der kleinste Teil. Auch nicht die Umgebung einrichten — das ist Handwerk.
Die eigentliche Aufgabe ist ein **Urteilsapparat**: der Person eine Möglichkeit zu geben, gut und
schlecht zu unterscheiden, *bevor* sie die Fachkenntnis hat, es direkt zu tun.

Das klingt nach einem Widerspruch, ist aber keiner. Eine Schlussfolgerung kann ein Laie nicht prüfen.
Eine **Prämisse** kann er es sofort. „Ich habe das Angebot für einen technischen Leser geschrieben" —
darüber kann jemand urteilen, der noch nie ein Angebot geschrieben hat. Der Mechanismus ist also:
**Das Modell muss seine Annahmen nach außen legen.** Eine ausgesprochene Annahme ist widerrufbar, eine
stille Annahme ist die Stelle, an der das Ergebnis unbemerkt falsch wird. Manuels Manifest (§3) sagt
dasselben über die Aufgabenformulierung; hier ist es die andere Richtung — nicht der Mensch liefert den
Kontext vollständig, sondern das Modell macht sichtbar, wo es ihn ergänzt hat.

## 2. Was eine Datei wirklich ist

Wenn Urteilen das Kernproblem ist, ändert sich die Bedeutung der Kontextdateien. Sie sind kein
„Kontext für die KI". Eine Datei ist **geronnenes Urteil**: eine Entscheidung, die die Person einmal
getroffen hat und die nicht jedes Mal neu getroffen werden muss.

Das gibt den Dateien eine gemeinsame Herleitung statt einer Gewichtungstabelle:

- Arbeitsregeln sind Entscheidungen darüber, was der Agent allein darf.
- Das Personenprofil sind Entscheidungen darüber, wie die Person behandelt werden will.
- Das Gedächtnis sind Urteile, die eine Session überlebt haben.
- Eine Vision ist ein Urteil, das für spätere Entscheidungen reserviert wird.

Zwei Folgen, die beide praktisch sind. **Erstens:** Eine Datei, hinter der keine Entscheidung steht,
ist kein Kontext, sondern Dekoration — und sie kostet Aufmerksamkeit in jeder Session. **Zweitens**
erklärt es den Schaden veralteter Regeln genau: Eine veraltete Regel ist ein Urteil, dessen Richter
seine Meinung geändert hat, während die Gerinnung überlebt hat.

Ein Zeitstempel hilft dagegen nicht. Er sagt, wann etwas aufgeschrieben wurde, nicht ob es noch gilt.
Was fehlt, ist die **Umkehrbedingung** — der Umstand, unter dem dieselbe Entscheidung anders ausfiele.
„Deploy läuft über `deploy.sh`" ist ein Datum wertlos. „Deploy läuft über `deploy.sh` — neu prüfen,
sobald das Skript nicht mehr im Repo liegt oder ein Fehler beim Deploy auftritt" kann sich selbst
melden. Der Unterschied ist ein Satz pro Regel, und er verwandelt Pflege von einer Routine in einen
Auslöser.

Damit ist auch die Frage „wie wichtig sind die einzelnen Dateien?" beantwortbar, ohne eine Rangliste
zu erfinden: **Die Wichtigkeit einer Datei ist proportional zur Wiederkehrhäufigkeit der Entscheidung,
die darin steht.** Eine Entscheidung, die täglich relevant ist, gehört in die immer geladene Datei.
Eine, die einmal im Jahr vorkommt, gehört nirgends hin — oder in ein Dokument, das der Agent findet,
wenn die Situation eintritt. Dazwischen liegt alles, was in eine Datei darf, sobald es zum zweiten Mal
gebraucht wird.

## 3. Das Minimum — vier Fähigkeiten, keine Dateiliste

Auf die Frage, ob es ein allgemeines Minimum gibt, ist die ehrliche Antwort: **Ein universelles
Dateipaket gibt es nicht, und danach zu suchen führt in die falsche Richtung.** Dateinamen sind die
Sichtweise der Hersteller. Was jeder Harness können muss, sind Fähigkeiten — und die sind prüfbar.

1. **Eine Grenze, die die Person selbst entschieden hat.** Nicht „der Agent fragt höflich", sondern
   eine konkrete Entscheidung: dies darf er allein, jenes nicht. Ohne sie kann ein Neueinsteiger nicht
   loslassen — und wer nicht loslassen kann, benutzt das Werkzeug nicht.
2. **Sichtbarkeit dessen, was benutzt wurde.** Welche Dateien gelesen wurden, welche Angabe woher
   stammt, was angenommen wurde. Ohne sie ist Urteilen prinzipiell unmöglich, nicht nur schwer.
3. **Stopp und Rückgängig.** Beides muss real sein: eine Unterbrechung, die wirkt, und ein
   strukturelles Zurück — Versionsstand, Entwurf statt Versand. Ohne sie ist jeder Fehler eine
   Katastrophe, und die Person bleibt dauerhaft im Flachen.
4. **Ein Zyklus, der einmal durchlaufen wurde.** Eine echte Aufgabe, eine Korrektur, die nachweislich
   späteres Verhalten ändert. Ohne das ist nichts gelernt, nur erklärt worden.

Dateien entstehen, wenn diese vier Dinge sich wiederholen. Nicht vorher. Wer sie vorher schreibt,
produziert genau den Bestand, über den Manuel klagt: selbstsicher, ungeprüft, veraltet — und
schlimmer als kein Bestand, weil er Vertrauen bindet, das er nicht verdient.

## 4. Die fünf Fragen an jeden Harness

Drei der vier Fähigkeiten kann ein Skill nicht ersetzen; sie muss der Harness mitbringen. Deshalb ist
die erste ehrliche Dienstleistung eines Onboardings nicht die Konfiguration, sondern die **Beurteilung
des Werkzeugs, das die Person gewählt hat**. Fünf Fragen, jede mit einer Prüfung, die Minuten dauert —
keine davon wird durch Lesen einer Dokumentationsseite beantwortet, denn Herstellerangaben belegen
Werbung.

1. **Was kannst du hier tatsächlich?** Prüfung: die echte Werkzeugliste zeigen lassen und eine
   Fähigkeit antesten, die für die eigene Arbeit zählt. Kann etwas versendet werden? Kann außerhalb
   dieses Ordners geschrieben werden?
2. **Woran hast du das festgemacht?** Prüfung: nach irgendeiner Antwort Quellen und Annahmen
   verlangen. Kann das Modell nicht trennen zwischen gelesen, gesagt und geraten, ist jede
   Quellenangabe Theater.
3. **Kann ich dich unterbrechen?** Prüfung: etwas Langes starten und mitten drin stoppen. Hält es an?
4. **Was passiert, wenn es schiefgeht?** Prüfung: eine Datei ändern lassen und zurücknehmen. Ist das
   Zurück strukturell oder ein Versprechen?
5. **Bleibt etwas, und wo?** Prüfung: etwas aufschreiben, eine neue Session öffnen, danach fragen.
   **Diese Prüfung ist der Punkt.** Eine Datei, die nicht geladen wird, ist kein Kontext — und das ist
   die Tatsache, die ein Neueinsteiger am schwersten glaubt, weil sie unsichtbar ist.

Diese fünf Fragen sind zugleich das Taschenformat des ganzen Vorhabens: Sie funktionieren in jedem
Harness, brauchen keine Einrichtung und erzeugen Verständnis statt Dateien. Zusammen mit den fünf
Dingen, die die Person dem Agenten über eine Aufgabe sagen sollte (Ziel, Woran-erkennst-du-Erfolg,
welches Material gilt, was darf er allein, was weiß sie noch nicht), ist das die vollständige
Grundausrüstung — zehn Zeilen, die ohne Setup in jedem Werkzeug wirken.

## 5. Der Bewohner

Manuel will, dass die Begleitung bleibt, bis er sie beendet. Das ist die eigentliche Neuerung an der
Idee, und sie ist technisch die schwierigste. Ein Skill lädt sich bei Bedarf: Seine Beschreibung ist
dauernd sichtbar, sein Inhalt nicht. Ein Skill kann deshalb **empfehlbar** sein, aber nicht anwesend.
Anwesenheit braucht einen Ladeweg, der ohne Aufforderung feuert.

Zwei Mechanismen kommen in Frage.

**Ein Hook, der zu Beginn jedes Zugs einen Zeiger injiziert.** Auf diesem Rechner geprüft:
`C:\Users\Admin\.qoder\settings.json` führt Hooks für `Stop`, `Notification`, `PermissionRequest`,
`UserPromptSubmit` und `PostToolUse`; aus `UserPromptSubmit` läuft `~/.qoder/hooks/telegram_afk.py`
(Quelle: settings.json und Verzeichnisauflistung, geprüft 2026-10-12). Eine Kontextinjektion zu
Sitzungsbeginn ist in dieser Session beobachtet worden, aber **nicht** in der eigenen settings.json
konfiguriert — Herkunft ungeklärt, also als beobachtet geführt, nicht als belegt. Der belastbare Ort
ist `UserPromptSubmit`.

**Eine dauerhafte Zeile in der immer geladenen Regeldatei.** Funktioniert überall, ist aber eine
Bitte, keine Garantie — das Modell kann sie übersehen. Diese Unterscheidung laut zu sagen ist kein
Detail: Eine Bitte als Garantie auszugeben ist genau der Übervertrauens-Fehler, gegen den das ganze
Design arbeiten soll.

Der Inhalt des Bewohners muss winzig sein. Budget: zwei injizierte Zeilen, die auf eine kleine
Zustandsdatei zeigen, die nur bei Bedarf geladen wird. Darin: was schon eingerichtet ist, welche
Reibung beobachtet wurde, welche Angebote abgelehnt wurden, welche Begleitintensität die Person
will — und der Ausschalter. Ist der Bewohner ein Absatz lang, wird er selbst zu dem Ballast, vor dem
er warnt.

Der Ausschalter ist keine Höflichkeit. Ein Bewohner, der nie geht, wird zur Aufsicht, und beaufsichtigt
zu werden ist das Gegenteil von Augenhöhe. Die Begleitung sollte ihre eigene Abschaltung vorschlagen,
sobald die Reibung nachlässt, und die Person muss sie in einem Satz beenden können — jederzeit, ohne
Begründung.

Und was der Bewohner festhält, muss eine Datei sein, die die Person öffnen, lesen, ändern und löschen
kann. Ein verborgenes Beobachtungsprotokoll über einen Nutzer ist Überwachung mit zusätzlichen
Schritten. Es würde außerdem irgendwann entdeckt, und dann ist das Vertrauen nicht angekratzt, sondern
weg.

## 6. Der Lehrplan entsteht aus der Reibung

Das schwerste Problem, das Manuel benennt: Der Neueinsteiger kann nicht nach dem Kontext fragen,
dessen Fehlen er nicht kennt — und der Agent weiß ebenfalls nicht, was ihm fehlt. Beide blind.

Der Ausweg ist nicht, beide Blindheiten zu heilen. Es reicht, eine zu nutzen: **Die Unsicherheit des
Agenten ist beobachtbar, auch wenn die Unwissenheit der Person es nicht ist.** Jedes Raten, jede
Rückfrage, jede Korrektur ist ein Signal über fehlenden Kontext — und der Agent sieht es, ohne dass die
Person irgendetwas wissen müsste. Also wird die Unsicherheit des Modells instrumentiert statt die
Unwissenheit des Menschen interviewt.

Konkret heißt das: kein Lehrplan, sondern ein Repertoire. Keine feste Reihenfolge, weil Menschen mit
verschiedenen Problemen ankommen. Ein Dutzend beobachtbare Symptome reichen, jedes mit Diagnose und
einem einzigen Satz Angebot:

- Derselbe Hintergrund wird zum dritten Mal erklärt → eine Entscheidung, die gespeichert gehören.
- Dieselbe Stil-Korrektur zum zweiten Mal → eine Präferenz, die gespeichert gehören.
- „Kannst du das überhaupt?" → die echte Werkzeugliste zeigen, nicht versichern.
- Der Agent handelt, ohne zu fragen → Grenze fehlt; und der Unterschied zwischen Regel und Durchsetzung.
- Der Agent zitiert Selbstsicheres, das veraltet ist → Umkehrbedingungen fehlen.
- Die Session wird lang und frühere Entscheidungen gehen verloren → Dateien schlagen Gespräche, live
  vorgeführt statt behauptet.
- Die Person kopiert Inhalte von Hand zwischen Anwendungen → ein Zugriff, den es geben könnte.
- Eine Zahl wird ohne Quelle übernommen → Belegdisziplin.

Jedes Angebot: ein Satz darüber, was aufgefallen ist, ein konkreter nächster Schritt, die Person
entscheidet. Nie ein Vortrag, nie zwei gleichzeitig, und **Schweigen ist der Normalzustand**. Der
Bewohner spricht, wenn er etwas sieht — nicht wenn er etwas zu sagen hat.

## 7. Gedächtnis: zwei Zerfallsgesetze, nicht eines

Zur Second-Brain-Frage (Honcho, Obsidian, harness-eigene Memories) ist meine Ansicht, dass der Fehler
im einen Speicher liegt. Es gibt zwei Arten gespeicherter Information mit **verschiedenen
Zerfallsgesetzen**:

- **Weltwissen** — Tatsachen darüber, wie die Dinge sind. Zerfällt, wenn die Welt sich ändert.
  Unabhängig von der Person.
- **Urteile** — Entscheidungen darüber, wie gearbeitet wird. Zerfallen, wenn die Person ihre Meinung
  ändert. Unabhängig von der Welt.

Beide in einem Speicher zu halten heißt, eine Pflegeroutine auf zwei verschiedene Fehlerarten
anzuwenden; jede verrottet auf eine Weise, die die Prüfung der anderen nicht findet. Eine
Wissensbasis über die Welt ist deshalb ein späteres, eigenes Organ. Das erste Organ, das ein
Neueinsteiger braucht, ist ein kleiner, lokaler, editierbarer Bestand über **diese Arbeitsbeziehung**.

Der konkrete Schaden, den Manuel beschreibt — längst gelöste Themen werden wieder aufgegriffen — hat
eine genaue Ursache: **Ein abgeschlossenes Ereignis wurde in einer Form gespeichert, die weiterhin wie
ein offener Auftrag liest.** Zeitform und Status leisten hier, was ein Datum nicht kann. Drei Typen,
drei Behandlungen:

- **Dauerhafte Präferenz** („Bitte auf Deutsch"): weiterverwenden, bei Korrektur aktualisieren.
- **Veränderlicher Zustand** („die Rückmeldung steht aus"): vor der Verwendung auf Aktualität prüfen;
  trägt Quelle, Datum, Geltungsbereich, Status.
- **Vergangenes Ereignis** („am Dienstag wurde die Anfrage geschickt"): Vergangenheit, mit
  ausdrücklichem Abschlussmerkmal. Daraus wird kein offener Auftrag abgeleitet.

Der dritte Typ verhindert die ganze Fehlerklasse und kostet eine Zeile Disziplin.

Ergänzend, weil es leicht übersehen wird: **Neuer ist nicht automatisch maßgeblicher.** Eine
beiläufige Bemerkung von heute kann weniger bindend sein als eine ausdrücklich bestätigte
Entscheidung von vor einem Monat. Aktualität, Verbindlichkeit und Geltungsbereich müssen zusammen
gewogen werden — und das Modell darf nicht still das Neueste bevorzugen.

## 8. Vertrauen ist Kalibrierung

Manuels höchstes Ideal, schärfer gefasst: Vertrauen ist kein Sicherheitsgefühl, sondern die
Übereinstimmung von Erwartung und Ergebnis. Es bricht in zwei Richtungen, und nur eine wird
üblicherweise bedacht.

**Untervertrauen** — alles wird geprüft, nichts wird gewonnen. Teuer, aber sichtbar; die Person merkt
es selbst.

**Übervertrauen** — eine selbstsichere falsche Antwort wird geglaubt. Das ist Manuels eigentliche
Klage, und der Schaden ist nicht die falsche Antwort. Der Schaden ist, dass sie mit voller Sicherheit
und ohne sichtbare Herkunft ankam. Die Person **konnte es nicht wissen**. Deshalb ist
Vertrauensarbeit Herkunftsarbeit, und zwar mit drei Marken, immer: geprüft / von dir angegeben /
unbekannt. Die Begleitung muss sie gegen sich selbst anwenden — ein Mentor, der Harness-Fakten
behauptet, die er nicht geprüft hat, erzieht durch sein Beispiel zum Übervertrauen, und das ist
schlimmer als gar keine Erklärung.

Dann der Moment mit dem größten Hebel im ganzen Lebenszyklus: **die erste Korrektur, die wirkt.**
Jemand sagt „nein, so nicht", etwas ändert sich dauerhaft, und später ist sichtbar, dass es gehalten
hat. Nichts baut Vertrauen schneller auf. Und nichts zerstört es schneller als eine Korrektur, die
freundlich angenommen wird und nichts verändert — denn daraus lernt die Person, dass Korrigieren
zwecklos ist. Ab diesem Punkt korrigiert sie nicht mehr, und die Beziehung produziert von da an
selbstsicheren Unsinn ohne jede Rückmeldung. Dieser Ausfall ist still, was ihn zum gefährlichsten im
ganzen Entwurf macht.

Die praktische Folge: Die erste Aufgabe der Begleitung nach dem Einrichten ist nicht, mehr zu
erklären, sondern **einen sichtbaren Korrekturzyklus herzustellen**. Eine echte Ärgernis aus der
echten Arbeit nehmen, sie dort aufschreiben, wo sie geladen wird, und in einer neuen Session prüfen,
ob sie hält. Dieses eine Ereignis ist mehr wert als der gesamte Dateibestand.

## 9. Wo diese Idee scheitern kann

**Die Begleitung könnte strukturell unfähig sein.** Ein Modell kann seine eigene Unwissenheit nicht
über Sessions hinweg beobachten. Es kann Wiederholungen nicht zählen, nicht merken, dass etwas zum
dritten Mal gesagt wurde — außer es schreibt etwas außerhalb des Modells mit. Proaktive Begleitung ist
damit ein **Instrumentierungsproblem, kein Promptingproblem**. Ohne ein reales Reibungsprotokoll ist
der Mentor ein wohlmeinender Text, der überwiegend nichts tut. Das ist der Teil, der am ehesten
unterschätzt wird, und er müsste zuerst gebaut werden.

**Anwesenheit kann als Überwachung gelesen werden.** Oben behandelt, aber es ist eine
Entwurfsbedingung und keine Formulierungsfrage.

**Hersteller absorbieren den erklärenden Teil.** „Erklärt, was ein Harness ist" werden die Anbieter
selbst ausliefern, weil es naheliegend ist und ihnen nützt. Was sie nicht ausliefern werden, ist
Kalibrierung über Werkzeuge hinweg und über Zeit — denn das Interesse eines Anbieters ist Nutzung,
nicht Urteilsfähigkeit. Der verteidigbare Kern ist damit der Urteilsapparat und das Reibungsprotokoll;
die Erklärung ist der Einstieg, nicht das Produkt.

**Manuel ist kein gültiger Prüffall.** Er hat Monate Agentenarbeit hinter sich. Was gebaut wird, muss
von jemandem geprüft werden, der noch nie einen Harness benutzt hat — und ohne dass Manuel im Ablauf
sitzt. Sonst wird der Entwurf unweigerlich seinem eigenen Setup ähnlich. Das ist dieselbe Regel, die
im Prototyp-Bestand dieses Repos schon einmal formuliert wurde: Wer den Fall geschrieben hat, darf ihn
nicht auswerten.

## 10. Was ich als Nächstes bauen würde

Nicht mehr Interview-Inhalt. Drei Dinge, in dieser Reihenfolge.

**Erstens die Prüfung.** Ein Ablauf in einer frischen Session, der zeigt, ob geschriebener Kontext
tatsächlich geladen wird und ob das Modell trennen kann zwischen gelesen, gesagt und geraten. Kostet
zehn Minuten und lehrt die wichtigste Tatsache über Harnesses besser als jede Erklärung: Datei und
geladener Kontext sind zwei verschiedene Dinge.

**Zweitens das Reibungsprotokoll.** Eine kleine Datei, fortgeschrieben von einem Hook oder von der
Begleitung, wenn etwas auffällt; lesbar und änderbar durch die Person. Das ist das Organ, das
Proaktivität überhaupt erst möglich macht — alles andere ist Text.

**Drittens ein Korrekturzyklus, einmal durchlaufen.** Mit einem echten Ärgernis einer echten
Testperson, endend mit der Prüfung in einer neuen Session, dass die Korrektur gehalten hat.

Erst danach lohnt es sich, Vorlagen zu schreiben. Dann sind sie aus beobachteter Reibung abgeleitet
statt aus einem Interview über eine vorgestellte Arbeitsbeziehung.

**Der Test für das Ganze:** Kann eine Person, die noch nie einen Harness benutzt hat, eine echte
Aufgabe erledigen, etwas korrigieren und die Korrektur wirken sehen, in einer neuen Session sinnvoll
weiterarbeiten — **und schweigt die Begleitung, wenn nichts fehlt?** Die zweite Hälfte zählt genauso
wie die erste, denn Nörgelei ist der Ausfallmodus eines Bewohners, und ein Test des Erfolgspfads zeigt
ihn nicht.
