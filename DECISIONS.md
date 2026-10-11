# Entscheidungen — Company Harness

Chronik dieses Workspaces. **Anhängen, nicht überschreiben.** Verworfene oder ersetzte Entscheidungen
bleiben stehen und werden als ersetzt markiert. Jede Zeile trägt Datum und Quelle.

Unterschied zum Delta-Weave-Hub: `D:\OneDrive\Delta Weave\decisions\log.md` ist die Chronik der Firma und
aller Projekte. Hier stehen nur Entscheidungen, die die Umsetzung des Company Harness betreffen.
Richtungsänderungen am Produktumfang werden zusätzlich im Hub-Knoten
`D:\OneDrive\Delta Weave\projects\company-harness.md` nachgezogen.

---

## 2026-09-19 — Workspace angelegt, Produktplan aus dem Hub verschoben

**Entscheidung:** Der Company Harness bekommt einen eigenen Workspace unter
`C:\Users\Admin\Documents\Company-Harness`; dort beginnt die initiale Umsetzung. Der recherchierte
Produktplan wurde aus `D:\OneDrive\Delta Weave\projects\company-harness.md` hierher **verschoben**, nicht
kopiert. Im Hub bleibt ein schlanker Verweisknoten. Manuels ursprüngliche Konzeptfassung wurde als
`docs/sources/konzept-ursprung-2026-09-19.md` gesichert, weil die Session-Anlage unter
`C:\Users\Admin\.qoder\tmp\` vergänglich ist.

**Grund:** Der Hub ist das Verzeichnis über Person, Firma und Projekte — nicht der Ort für
Umsetzungsunterlagen. Dieselbe Trennung gilt bereits für ATHA, FinanzMehrwert und den job-agent.
Quelle: Manuel, direkte Angabe im Chat, Stand 2026-09-19.

**Anwendung:** Neue Fakten zur Umsetzung gehören hierher. Neue Fakten zu Person, Firma, Vertrieb oder
Freigaben gehören in den Hub. Kein Duplikat an beiden Orten.

## 2026-09-19 — Git ohne Remote

**Entscheidung:** Der Workspace wird als lokales Git-Repo initialisiert, ohne Remote und ohne
Veröffentlichung. Quelle: Manuel, Auswahl im Chat, Stand 2026-09-19.

**Grund:** Umsetzung bekommt sofort Versionsgeschichte; über ein GitHub-Repo und dessen Sichtbarkeit
entscheidet Manuel später. Der Hub selbst ist privat und push-bedingt empfindlich — dieselbe Vorsicht
gilt hier, sobald echte Kundendaten ins Spiel kommen.

**Grenze:** Kein Push, kein öffentliches Repo, kein Hinzufügen von Kundendaten ohne Freigabe.

**Status: ersetzt** am selben Tag durch „Privates GitHub-Repo eingerichtet" (unten). Die Grenze zu
Kundendaten gilt unverändert weiter.

## 2026-09-19 — Vorschlag, nicht bestätigt: zwei Prüfprozesse vor jeder Plattform

**Entscheidungsvorschlag:** Kundenänderung → abgestimmter Lieferplan und erbrachte Leistung →
rechnungsbereite Nachweise werden als erste Prüfprozesse vorgeschlagen, zuerst in der vorhandenen
Qoder-/Datei-Arbeitsweise. Hexis und Oracle werden erst danach gegen dieselben Abnahmekriterien
verglichen. Quelle: Agentenanalyse, [`CONTEXT-SIGNOFF.md`](CONTEXT-SIGNOFF.md) §3 und §10, Stand 2026-09-19.

**Status: teils entschieden** am selben Tag, siehe „Prototyp-Plan" unten. Die Reihenfolge ist überholt;
der Vorrang der Datei-Baseline vor jeder Plattform bleibt bestehen und ist jetzt bestätigt.

## 2026-09-19 — Prototyp-Plan: Baseline zuerst, beide Prüfprozesse parallel

**Entscheidung:** Der erste Prototyp-Schritt ist die beaufsichtigte Baseline in der vorhandenen
Qoder-/Datei-Arbeitsweise; eine dauerhafte Case-Engine wird erst gebaut, wenn der Kontextnachweis erbracht
ist. Beide Prüfprozesse — Kundenänderung → Lieferplan und Leistung → rechnungsbereite Nachweise — laufen
von Anfang an parallel. Quelle: Manuel, zwei Auswahlangaben im Chat, Stand 2026-09-19.

**Grund:** Die Baseline liefert die Evidenz zu `CONTEXT-SIGNOFF.md` §10 Schritt 1–4, bevor Baukosten
entstehen. Parallele Prozesse prüfen die geteilte Architektur an zwei Fällen statt sie von einem Fall
hochzurechnen; der Preis ist doppeltes Fallmaterial pro Runde.
Quelle: Manuels Angabe; Abwägung in [`docs/prototype-plan.md`](docs/prototype-plan.md) §0.

**Anwendung:** Meilensteine M0–M5 mit je einer Abbruchbedingung stehen in
[`docs/prototype-plan.md`](docs/prototype-plan.md) §7. Die Reihenfolge-Empfehlung aus §3 des Sign-Offs
(Änderung zuerst) ist damit überholt und bleibt als Vorschlag stehen.

## 2026-09-19 — Fallmaterial synthetisch: abgeleitet, nicht entschieden

**Entscheidung:** Der Prototyp arbeitet durchgehend mit erfundenem Material, fiktive Firma „Nordwind
Betriebstechnik". **Status: aus dem Regelbestand abgeleitet, nicht von Manuel entschieden.**

**Grund:** `AGENTS.md` Regel 4 und `CONTEXT-SIGNOFF.md` §5 Regel 4 schließen echte Mail-, Kalender-,
Buchhaltungs- oder Kundenzugänge ohne ausdrückliche Freigabe aus; eine Freigabe liegt nicht vor.
Synthetisches Material ist der einzige Weg, der die Regel nicht berührt.

**Grenze:** Der Nachweis gilt damit für die Architektur, nicht für die Markthypothese. Welche echten
Quellen gelesen werden dürften, bleibt `OFFEN — Manuel` in §11 Punkt 3 des Sign-Offs.

## 2026-09-19 — Privates GitHub-Repo eingerichtet

**Entscheidung:** Der Workspace bekommt ein **privates** GitHub-Repo unter
`https://github.com/melkor42/Company-Harness` und wird dorthin gepusht. Quelle: Manuel,
Sichtbarkeitsangabe im Chat sowie eigene Anlage des Repos, Stand 2026-09-19.

**Grund:** `CONTEXT-SIGNOFF.md` §11 Punkt 9 war offen („Wann und ob ein privates GitHub-Repo folgt").
Zwei GitHub-Konten sind auf diesem Rechner im Gebrauch — `ManuelOnemundi` für ATHA und FinanzMehrwert,
`melkor42` für Delta-Weave, Held, MMC-Delta und job-agent. Die Wahl fiel auf `melkor42`, das Konto des
Hub-Repos.

**Vorgeschichte, damit der Irrtum nicht wiederholt wird:** Ein erster Prüflauf hatte ergeben, es sei kein
GitHub-Zugang vorhanden. Das war falsch: `gh` fehlt zwar, aber Git Credential Manager ist **systemweit**
konfiguriert (`C:/Program Files/Git/etc/gitconfig`, `credential.helper = manager`) und funktioniert über
HTTPS. Wer nur `git config --global` liest, übersieht es. Der vorhandene SSH-Schlüssel ist dagegen bei
GitHub nicht hinterlegt.

**Grenze:** Privat, nicht öffentlich. `oeffentlichkeit.md` liegt außerhalb dieses Workspaces und konnte in
dieser Sitzung nicht gegengeprüft werden; ein Screenshot oder Zitat aus dem Repo gilt bereits als nach
außen und ist zurückgestellt. Kein Kundenmaterial, keine Credentials, kein automatischer Push.

**Korrektur am selben Tag:** Der Halbsatz „konnte nicht gegengeprüft werden" war falsch und ist durch eine
Prüfung ersetzt. Eine Verzeichnisauflistung des Hubs über die Shell wird von der Rechteprüfung abgewiesen,
das gezielte Lesen einer benannten Datei dagegen nicht. `MAP.md` und `company/oeffentlichkeit.md` wurden
nachgelesen: Company Harness steht auf keiner der drei Listen der Freigabeliste, und `MAP.md` führt den
Knoten mit „intern, keine Veröffentlichungsfreigabe". Am Ergebnis ändert sich nichts — privates Repo
zulässig, jedes Zitat nach außen nicht. Festzuhalten bleibt der Fehler: **Nicht aus einem geblockten `ls`
auf unlesbare Inhalte schließen.**

## 2026-09-20 — M0 und M1 gebaut; der Validator ist die Durchsetzungsstelle

**Entscheidung:** Die vier Verträge liegen als JSON-Schema unter `schema/` und als Beispieldateien unter
`prototype/`. Der Korpus ist eine erfundene Firma mit sechs Quelldokumenten, zwanzig Kontextdatensätzen,
zwei Prozessen, vier Fällen und vier Sandbox-Schreibzielen. `node prototype/tools/validate.mjs` prüft den
Bestand; jede Prüfung ist mit einem Negativbeleg verifiziert.

**Fünf Punkte, die beim Bauen anders kamen als im Plan und hier nachgezogen sind:**

1. **Ein fünftes Schema.** Der Fallvertrag hat zwei Dateien: `fall.json` (unveränderlich) und
   `runs/<fall>/state.json` (der wandernde Zustand). Ohne eigenes Schema wäre der Zustand — die eigentliche
   Behauptung des Produkts — der einzige ungeprüfte Teil des Bestands geblieben.
2. **Ein viertes Sandbox-System.** `postausgang.json` kam dazu, weil die Kundennachricht die Aktion ist, an
   der sich Duplikat-Schutz und nutzlastgebundene Freigabe zeigen muss. Drei Dateien hätten das nicht
   geprüft, sondern behauptet.
3. **Die Laufprüfungen sitzen im Validator, nicht erst in der Engine.** Eine Aktion, die ihre
   Prozessdefinition nicht vorsieht, ein abweichendes Schreibziel, `ausgeführt` ohne Freigabeeintrag, ein
   Idempotenzschlüssel zweimal: Das wird jetzt ab M1 abgewiesen, obwohl die Engine erst in M4 entsteht. Eine
   Allowlist, die nur im Kopf des späteren Programms existiert, ist keine Grenze.
4. **Ein Muster ist kein Kalender.** `stand` war gegen `\d{4}-\d{2}-\d{2}` geprüft und ließ `2026-02-30`
   durch. Seither prüft der Validator den Kalenderdatum-Wert, nicht nur seine Form.
5. **`supersedes` war ein Feld ohne Benutzung.** Die Störung „Evidenz ändert sich nach der Freigabe" war nur
   im erwarteten Ergebnis beschrieben. Jetzt liegt der Nachfolger-Datensatz mit `supersedes` real im Korpus
   (`kap-kest-frei-bis-termin-2026-09-21`, 0,8 PT statt 2,3 PT) — sonst könnte M2 die Störung nicht setzen.

**Zwei eigene Fehler, aufgeschrieben damit sie sich nicht wiederholen:** Der Verzeichnisläufer des
Validators hatte bei verschachtelten Ordnern den Präfix doppelt gesetzt; dadurch liefen die
Fallordner-Prüfungen in M0 nie an, obwohl der Lauf „OK" meldete. Entdeckt wurde er erst, als Fälle
existierten — **ein Prüfer, der nichts findet, weil er nichts sieht, ist kein Prüfstand.** Und die
Anordnung `/aktion.*\.json$/` hätte eine `state.json` in `runs/` still übersprungen; seither fällt jede
JSON-Datei dort, die auf keine Zuordnung passt, als Fehler auf.

## 2026-09-20 — M1 heißt „gebaut", nicht „bestanden"

**Entscheidung:** In der Meilensteintabelle des Prototyp-Plans steht M1 auf **gebaut, nicht bestanden**. Der
Prüferspruch — ein Mensch ohne Vorwissen sagt je Fall „stimmt" oder „stimmt nicht" — steht aus.

**Grund:** Die Fälle, ihre erwarteten Ergebnisse und dieser Bestand stammen aus einer Hand (Agent,
2026-09-19/20). Die Regel „wer den Fall geschrieben hat, darf ihn nicht ausgewertet haben" gilt auch gegen
den eigenen Befund: Ein vorab geschriebenes Ergebnis ist nur dann ein Maßstab, wenn jemand anderes es
gegenlesen hat. M2 gegen einen unbestätigten Maßstab laufen zu lassen wäre ein Nachweis ins Leere.

**Anwendung:** Vor dem ersten A/B-Lauf ist `prototype/cases/*/erwartet.md` von einer Person ohne
Sitzungsvorwissen gegenzulesen; das Ergebnis kommt in `prototype/evaluation/MESSPROTOKOLL.md` §2 und diese
Zeile gilt als erledigt.

## 2026-10-09 — Das Ziel dieser Phase heißt Evaluierung; Manifest und Gegenlese getrennt

**Entscheidung (Manuel, Diktat 2026-10-09):** Das Ziel der laufenden Arbeit ist die **Evaluierung**, nicht
das Produkt. Seine Haltung dazu steht in [`docs/manifest.md`](docs/manifest.md) und gilt als bestätigte
Position — neben §2 des Sign-offs, nicht darunter.

**Entscheidung (Agent, 2026-10-09):** Die Gegenlese liegt als eigene Datei
[`docs/manifest-gegenlese.md`](docs/manifest-gegenlese.md), nicht als Abschnitt im Manifest.

**Grund:** Standpunkt und Kritik aus einer Datei lassen sich später nicht mehr trennen; dann ist nicht mehr
erkennbar, was Manuel gesagt hat und was ein Agent eingewandt hat. Dieselbe Trennung, die der Sign-off
zwischen *Bestätigt* und *Vorschlag* zieht.

**Anwendung:** Die fünf Planänderungen aus der Gegenlese §5 (Rückfragen zweigeteilt zählen; Bedingung C mit
Minimalkontext; Rückführungsregel für Ergebnisdokumente; Fallansicht in M2; Kontextbeschaffung als
Prüfpunkt) sind **Vorschläge**. Was Manuel davon annimmt, wird hier als eigener Eintrag festgehalten und
dann in Messprotokoll und Prototyp-Plan nachgezogen — nicht vorher.

## 2026-10-10 — Gegenlese angenommen; Recherche zur Kontext-Verwaltung angesetzt

**Entscheidung (Manuel, 2026-10-10):** Er stimmt der Gegenlese in
[`docs/manifest-gegenlese.md`](docs/manifest-gegenlese.md) überein — „absolut der gleichen Meinung". Damit
gelten die fünf Planänderungen aus deren §5 als **angenommene Richtung** (Rückfragen zweigeteilt zählen;
Bedingung C mit Minimalkontext; Rückführungsregel; Fallansicht in M2; Kontextbeschaffung als Prüfpunkt).
Der Nachzug in Messprotokoll und Prototyp-Plan steht noch aus und ist eigener Arbeitsschritt.

**Zusatz (Manuel, 2026-10-10):** Die große Arbeit liegt im Verwalten des Kontexts. Er verwaltet seinen
eigenen Agenten-Kontext lokal als kleine Markdown-Dateien, die der Agent findet und benutzt; eine Lösung
muss an den Kontext der bestehenden Umgebung angepasst werden. Dazu ist eine Recherche angesetzt:
Best Practices für dateibasierte kuratierte Kontext-Setups gegenüber RAG-Systemen, Grenzen von RAG-only,
wann Retrieval nötig wird. Ergebnis wird in `docs/recherche-kontext-verwaltung.md` erwartet.

## 2026-10-11 — Ziel neu gefasst: Brauchbarkeit über Unternehmen hinweg; Messbetrieb zurückgestellt

**Entscheidung (Manuel, 2026-10-11):** Das Ziel ist neu gefasst: herausfinden, **was relevant ist, um einen
Harness für unterschiedliche Unternehmen nützlich und hilfreich zu machen**. Der große Hebel ist die
**Kontext-Kuration** — an ihr hängt, ob Ergebnisse effizient erzielt werden. Die bisherige Prototyp-Arbeit
(Testläufe, synthetische Firmendaten, M0/M1-Messapparat) hatte nach seiner Einschätzung kein echtes, von
ihm vorgegebenes Ziel und stört die Konzeptdiskussion eher, als dass sie sie trägt. Er erwägt die Löschung;
die Entscheidung darüber steht aus.

**Anwendung:** Die acht Fragen der laufenden M2-Runde sind hinfällig und werden nicht beantwortet. Die
Arbeit läuft auf der Konzeptebene weiter; Grundlage bleiben Manifest, Gegenlese und die
Kontext-Recherche. Der Umgang mit dem Prototyp-Bestand (löschen, einfrieren, teilweise übernehmen) wird
als eigene Entscheidung geklärt und hier festgehalten.
