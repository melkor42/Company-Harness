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
