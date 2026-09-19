# Company Harness — Prototyp-Plan

**Stand 2026-09-19.** Umsetzungsebene zu [`product-plan.md`](product-plan.md). Die Produktthese und die
Quellenlage stehen dort; dieses Dokument legt fest, was gebaut wird, in welcher Reihenfolge und woran jeder
Schritt besteht oder scheitert.

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
├─ schema/                         die vier Verträge, JSON-Schema
│  ├─ context-record.schema.json
│  ├─ process-definition.schema.json
│  ├─ case.schema.json
│  └─ action.schema.json
└─ prototype/
   ├─ context/                     kuratierte Quellen, je Datei ein Datensatz
   │  ├─ agreements/               vereinbarte Umfänge
   │  ├─ capacity/                 Fenster, Auslastung
   │  ├─ commercial-rules/         Preise, Kulanz, Zahlungsziele
   │  └─ acceptance/               Abnahmekriterien, Dokumentpflichten
   ├─ processes/                   Prozessdefinitionen, versioniert
   ├─ cases/                       Eingangsreize + erwartete Ergebnisse
   ├─ sandbox-systems/             Schreibziele: Projektplan, Zeiterfassung, Rechnungsentwurf
   ├─ runs/<fall-id>/              state.json, events.jsonl, freigaben.md
   └─ evaluation/                  Messprotokolle, Vergleiche mit/ohne Kontext
```

`prototype/src/` entsteht erst in M4. Vorher ist der Engine-Ersatz: Dateien, die von Hand gepflegt werden —
was selbst die Messung ist, die `CONTEXT-SIGNOFF.md` §10 Schritt 3 verlangt.

## 4. Die vier Verträge

Der Prototyp besteht im Kern aus vier Datenformen. Sie sind vor dem ersten Falllauf festzulegen, weil
danach fast alles weitere aus ihnen folgt.

### 4.1 Kontextdatensatz (`context-record`)

```yaml
id: agr-nordwind-modul-2
kind: agreement            # agreement | capacity | rule | acceptance | fact
statement: "Modul 2 umfasst die Auswertung, nicht den Import Fremddaten."
source: prototype/context/agreements/nordwind.md
stand: 2026-09-19
owner: Rolle:Vertrieb      # Eigentümer, nicht Person
scope: [fall:CHANGE-01]    # Zugriffsgrenze, nicht nur Ordnergrenze
status: belegt             # belegt | ungeprüft | OFFEN — Manuel
valid_until: 2026-12-31    # nur wenn die Aussage sich ändern kann
supersedes: null
```

Zwei Regeln, die sich hier hart durchsetzen lassen und sonst verloren gehen: **ohne `source` und `stand`
ist der Datensatz ungültig** (`AGENTS.md` Regel 2 — Schema-Validierung, nicht Absichtserklärung). Und **`status`
ist Pflicht**, damit eine ungeprüfte Herstellerannahme nicht als Fakt in einen Prompt wandert.
Widersprüchliche Angaben bleiben als zwei Datensätze stehen; die Kuratierung entscheidet, nicht die
zusammenfassende Beschreibung (`product-plan.md`, Context service).

### 4.2 Prozessdefinition (`process-definition`)

Datei, versioniert, kein Prompt-Fragment — `CONTEXT-SIGNOFF.md` §10 Schritt 2. Ein Prompt darf daraus
abgeleitet werden, aber die Ableitung muss prüfbar bleiben.

```yaml
id: kundenänderung-nach-lieferplan
version: 1
trigger:
  art: eingang
  erwartet: case-input
required_evidence: [agreement, capacity, rule]
allowed_actions:               # Allowlist: was fehlt, ist unmöglich
  - name: antwortentwurf-erzeugen
    requires_approval: false
  - name: projektplan-aktualisieren
    requires_approval: true
    target: sandbox-systems/projektplan
  - name: nachforderung-formulieren
    requires_approval: true
checkpoints:
  - wunsch-und-zusage-getrennt
  - betroffene-arbeit-benannt
abort_conditions:
  - "vereinbarter Umfang nicht auffindbar"
  - "Entscheidung erfordert Preisbindung ohne Freigabe"
escalation: Rolle:Vertrieb
```

### 4.3 Fall (`case`)

Zustandsmaschine. Jeder Zustand liegt in `runs/<fall-id>/state.json`, nie nur im Chatverlauf — das ist die
Abbruchbedingung aus §10 Schritt 3.

```
neu → gesichtet → entscheidung-nötig → freigegeben → ausgeführt → abgleich → abgeschlossen
          ↓                ↓                                        ↓
      blockiert      abgebrochen                          wartet-auf-eigentümer
   (Evidenz fehlt)                                          ↑ (Antwort trifft ein) → gesichtet
```

`wartet-auf-eigentümer` ist der Zustand, an dem sich entscheidet, ob hier ein dauerhafter Fallzustand
entsteht oder nur ein Chat: Der Lauf endet, Tage oder Wochen vergehen, und der Fall nimmt beim nächsten
Start die Arbeit wieder auf, ohne dass sich der Betreiber erinnern muss.

### 4.4 Aktion und Freigabe (`action`)

```yaml
action: projektplan-aktualisieren
case: CHANGE-01
payload_hash: sha256:…         # über die konkrete Nutzlast, nicht über die Aktionsart
idempotency_key: CHANGE-01-a3
approved_by: rolle:inhaber    # die Rolle freigeben lässt, nicht die Person, die tippt
approved_at: 2026-09-19T14:02+02:00
executed_at: null
```

Vier Zusagen, die die Sicherheitslinie aus `AGENTS.md` Regel 5 tragen:

1. Freigabe bindet an **Payload-Hash**. Ändert sich die Nutzlast, ist die alte Freigabe wertlos.
2. **Keine Ausführung ohne Eintrag** in `freigaben.md`; die Prüfung passiert beim Ausführen, nicht beim
   Formulieren.
3. **Idempotenzschlüssel** verhindern, dass ein Wiederholungsversuch dieselbe Geschäftshandlung zweimal
   setzt (`product-plan.md`: retrying must not silently repeat a business action).
4. Geschriebene Ziele sind ausschließlich **Sandbox-Systeme** — siehe §5.3.

## 5. Fallmaterial

### 5.1 Synthetische Firma

**Nordwind Betriebstechnik**, fiktiver inhabergeführter B2B-Dienstleister, acht Personen,
Projektgeschäft mit zwei laufenden Kunden. Alle Namen, Beträge und Termine erfunden; keine Ableitung aus
realen Delta-Weave-Kunden. Das ist die Referenz dafür, was wie „echt" aussieht, ohne echt zu sein.

**Erfunden steht aber nicht nur hier, sondern in den Daten selbst.** Jeder Fallordner trägt eine
`synthetisch`-Zeile, und jeder Kontextdatensatz erbt sie aus seinem Korpus. Der Grund ist ein Befund aus
`oeffentlichkeit.md` zur MMC-Delta: Ein Erfundenes ist nur dann ungefährlich, wenn es *nachweislich*
erfunden und *als erfunden gekennzeichnet* ist — sonst hängt die Einordnung an einer Datei, die beim
Weitergeben eines einzelnen Ergebnisblatts nicht mitwandert. Ein gezeigtes Ergebnis aus `runs/` muss ohne
diesen Plan verraten, dass es Kunst ist.

### 5.2 Vier Fälle, zwei Prozesse

| Fall | Prozess | Kernkonflikt | Was der Kontext ändern muss |
|---|---|---|---|
| `CHANGE-01` | Änderung → Lieferplan | Zusatzauftrag, Termin bleibt | ob Umfang, Kapazität oder Termin nachgibt |
| `CHANGE-02` | Änderung → Lieferplan | Wunsch gleicht einer früheren Kulanz | dass eine einmalige Ausnahme keine Regel ist |
| `BILL-01` | Leistung → rechnungsbereit | Meilenstein „fertig", Abnahme fehlt | wer gefragt wird und worauf |
| `BILL-02` | Leistung → rechnungsbereit | Bestellnummer fehlt, Zeiten lückenhaft | ob Liefern oder Nachfragen richtig ist |

Zu jedem Fall: Eingangsreiz, die zugehörigen Kontextdatensätze, und — **vor dem Lauf geschrieben und
getrennt aufbewahrt** — das erwartete Ergebnis. Nur so kann ein Prüfer ohne Vorwissen sagen, ob das
Ergebnis stimmt (§10 Schritt 1). Wer den Fall geschrieben hat, darf ihn nicht auch ausgewertet haben.

### 5.3 Sandbox-Systeme statt Anschlüssen

Drei beschreibbare JSON-Dateien tun so, als wären sie die echten Systeme: `projektplan.json`,
`zeiterfassung.json`, `rechnungs-entwurf.json`. Sie sind absichtlich dumm — kein Netz, keine Anmeldung.
Der Grund ist nicht Faulheit: eine Freigabe, die an eine Nutzlast bindet, ist nur prüfbar, wenn es eine
Nutzlast gibt, die sich ändern kann. So entsteht ein echtes Schreibziel, ohne dass eine echte Umgebung
angefasst wird, und M4 kann dasselbe Tor gegen dieselben Fälle fahren wie M2.

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

| # | Schritt | Fertig, wenn | Abbruch, wenn |
|---|---|---|---|
| M0 | Schemas und Verzeichnisse | ein Kontextdatensatz ohne `source`/`stand` wird von der Validierung abgelehnt | die Schemas so weit sind, dass alles passt |
| M1 | Fallmaterial, 4 Fälle + 5 Störungen, erwartete Ergebnisse unabhängig geschrieben | ein Prüfer ohne Vorwissen sagt je Fall: stimmt oder stimmt nicht | die Fälle ohne echte Kundendaten nicht sinnvoll formulierbar sind → falsche Fälle |
| M2 | Baseline in Qoder: beide Prozesse, Bedingung A und B, Zustand in Dateien | alle vier Fälle erreichen einen bewertbaren Zustand; mindestens einer pausiert und wird in einer späteren Sitzung fortgesetzt | der Chat als Zustandspeicher benutzt wird (§10 Schritt 3) |
| M3 | Kontextnachweis auswerten | je Prozess ist ein Unterschied in der **Aktion** belegbar | kein wesentlicher Unterschied messbar → Ablauf falsch gewählt, nicht das Produkt widerlegt (§10 Schritt 4) |
| M4 | Case-Engine, `node:sqlite`, nur falls M3 besteht | Neustart mitten im Fall verliert nichts; geänderte Nutzlast macht die Freigabe ungültig; doppelte Zustellung wird verweigert | die Engine mehr Pflege braucht als der Dateiweg |
| M5 | Ersetzungskandidat gegen dieselben Abnahmen | bekannt ist, was ein Kandidat ersetzt, was der Aufwand ist und was offen bleibt | ein Kandidat mit geringerem Gesamtaufwand alle vier Fälle besteht → integrieren statt bauen (§10 Schritt 5) |

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

M0 und M1 sind nicht von einer Freigabe abhängig und erzeugen keine Kosten außer Zeit: Schemas,
Verzeichnisgerüst, die fiktive Firma und vier Fälle mit vorab notierten Ergebnissen. M2 braucht dann nur
noch die Qoder-Sitzung.

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
