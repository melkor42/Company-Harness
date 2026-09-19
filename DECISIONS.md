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

## 2026-09-19 — Vorschlag, nicht bestätigt: zwei Prüfprozesse vor jeder Plattform

**Entscheidungsvorschlag:** Kundenänderung → abgestimmter Lieferplan und erbrachte Leistung →
rechnungsbereite Nachweise werden als erste Prüfprozesse vorgeschlagen, zuerst in der vorhandenen
Qoder-/Datei-Arbeitsweise. Hexis und Oracle werden erst danach gegen dieselben Abnahmekriterien
verglichen. Quelle: Agentenanalyse, [`CONTEXT-SIGNOFF.md`](CONTEXT-SIGNOFF.md) §3 und §10, Stand 2026-09-19.

**Status:** Nicht von Manuel bestätigt. Die offene Reihenfolge und die Wahl des Fallmaterials stehen in
`CONTEXT-SIGNOFF.md` §11 als `OFFEN — Manuel`.
