# Regeln und Verfall — die härteste Lektion des Grundkontexts

Die teuerste Erfahrung im Umgang mit Kontextdateien: **Eine veraltete Regel richtet mehr
Schaden an als gar keine.** Der Agent folgt ihr mit gutem Grund — sie steht ja schwarz auf
weiß da — und produziert mit voller Überzeugung das Falsche. Schlimmer: Der Nutzer vertraut
dem Bestand immer weniger, merkt aber nicht, welche Stelle ihn belügt.

Deshalb gilt in diesem Skill: **Jede Regel, die veralten kann, bekommt ein Verfallsdatum
oder ein Überholungskriterium.** Und grundsätzlich: Lieber wenige, dauerhafte Regeln als
viele, die gepflegt werden müssten.

## Zwei Sorten Regeln

**Dauerhaft** sind Regeln über Haltung und Grenzen. Sie altern praktisch nicht:

- „Keine Löschung ohne Rückfrage."
- „Was nicht belegt ist, wird gefragt, nicht gesetzt."
- „Credentials gehören in keine Datei dieses Repos."

**Verfallsanfällig** ist alles, was die Welt unter der Regel verändert:

- Versionen und Pfade („Node 22 liegt unter …")
- Zuständigkeiten und Kontakte („Frau Y prüft die Texte")
- Zustandsbehauptungen („aktuell läuft der Deploy über …")
- Werkzeug-Empfehlungen („nutze X für Y")

## Das Überholungskriterium

Eine verfallsanfällige Angabe ohne Kriterium gehört nicht in den Grundkontext. Das Kriterium
ist ein Satz, der sagt, **woran man merkt, dass die Regel überholt ist** — nicht bloß, wann
sie geschrieben wurde. Muster:

- „Node 24 auf diesem Rechner (geprüft 2026-10-11 — bei Versionsfehler neu prüfen statt
  annehmen)."
- „Deploy läuft über Skript `deploy.sh` (Stand 2026-10-11 — gilt nur, solange das Skript im
  Repo liegt)."
- „Texte prüft Martina (gültig bis zur Neueinstellung; danach neu festlegen, nicht schätzen)."

Drei Punkte machen das Muster wirksam: **Datum** daneben, **Bedingung**, unter der es
aufhört zu gelten, und die Anweisung, was dann gilt (*neu prüfen*, nicht *annehmen*).

## Was gar nicht erst in den Grundkontext gehört

- **Tageszustand.** „Gerade arbeite ich an X" — dafür sind Memory-Einträge oder gar nichts;
  eine AGENTS.md ist kein Kalender.
- **Vorratswissen.** Alles, was der Agent bei Bedarf selbst nachlesen kann (Dokumentation,
  APIs, Konventionen). Der Grundkontext hält nur, was er **nicht** selbst findet.
- **Wiederholungen.** Was an zwei Stellen steht, läuft auseinander. Eine Stelle, überall
  sonst nur verweisen.
- **Absichten.** „Demnächst umbauen auf …" — sobald es vergessen wird, ist es eine Lüge im
  Bestand. Absichten gehören in ein Entscheidungsprotokoll mit Datum, nicht in Regeln.

## Der Ehrlichkeits-Trick: Status statt Löschzwang

Für Aussagen, die sich von selbst nicht prüfen lassen, hilft eine Statusmarke, wie sie der
Delta-Weave-Hub vormacht: **belegt / einseitig / unbelegt / OFFEN**. Der Agent darf mit
„unbelegt" arbeiten, aber nicht so tun, als wäre es „belegt". Das ist billiger als jede
Pflegeroutine — und verhindert genau den Schaden, den veraltete Sicherheit anrichtet.

## Pflegeanlässe statt Pflegetermine

Kontextpflege an Kalendertermine zu hängen, scheitert erfahrungsgemäß. Was funktioniert, sind
**Anlässe**: Nach jeder Richtungsänderung werden die betroffenen Dateien in demselben Zug
nachgezogen; bei jedem Fehler, der auf eine Regel zurückgeht, wird die Regel repariert oder
gelöscht — nicht nur das Ergebnis. In der Abschluss-Checkliste wird genau ein solcher Anlass
fest vereinbart („nach der ersten Woche echter Arbeit"), weil das erste Setup garantiert an
der Wirklichkeit korrigiert werden muss.
