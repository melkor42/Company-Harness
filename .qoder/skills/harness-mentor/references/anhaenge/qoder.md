# Anhang Qoder — harness-abhängige Einzelheiten

*Alles in dieser Datei gilt nur für Qoder (Stand 2026-10-12). Pfade und Felder können
sich mit Versionen ändern — bei einem Fehler neu prüfen statt annehmen. Die Konzepte
stehen in `../didaktik.md`; hier steht nur, wo sie bei Qoder konkret liegen. Gepflegt
wird diese Datei wie eine Abhängigkeit: datiert, und nur mit Geprüftem.*

## Pfade (Windows)

| Was | Wo |
|---|---|
| Globale Regeln (immer geladen) | `C:\Users\Admin\.qoder\agents.md` |
| Memory-Dateien + Index | `C:\Users\Admin\.qoder\memory\` und `MEMORY.md` dort |
| Projekt-Memory (je Workspace) | `C:\Users\Admin\.qoder\projects\<workspace-slug>\memory\` |
| Eigene Skills (Benutzerebene) | `C:\Users\Admin\.qoder\skills\<name>\SKILL.md` |
| Skills (Projektebene) | `<workspace>\.qoder\skills\<name>\SKILL.md` |
| Hooks | `C:\Users\Admin\.qoder\hooks\`, registriert in `settings.json` unter `hooks` |
| Sitzungsprotokolle | `C:\Users\Admin\.qoder\logs\runs\` |

## Skills in Qoder

- Ein Skill ist ein Ordner mit `SKILL.md`: YAML-Frontmatter (`name`, `description`
  — eine Zeile, max. 1024 Zeichen) plus Markdown-Rumpf; Referenzdateien daneben
  werden erst bei Bedarf geladen.
- Qoder kennt zusätzliche Frontmatter-Felder, u. a. `disable-model-invocation`
  (der Skill startet nur per explizitem Aufruf `/name`, nicht automatisch) und
  `argument-hint`.
- Nach dem Anlegen: Session neu starten oder `/skills reload`; Sichtbarkeit mit
  `/skills list` prüfen.

## Memories in Qoder

- Format: eine Datei je Eintrag, kebab-case-Name, YAML-Frontmatter mit `name`,
  `description`, `metadata.type` (`user`, `feedback`, `project`, `reference`);
  der Index `MEMORY.md` ist eine Zeile pro Eintrag, keine Inhalte.
- Praxis: Typ-Präfix im Dateinamen (`user-…`, `feedback-…`, `reference-…`),
  Verknüpfungen als `[[datei-name]]`, relative Daten immer absolut schreiben.

## Die Begleitung bei Qoder fortsetzen

- Die **Begleitnotiz** liegt als `project-`-Memory-Eintrag unter
  `~/.qoder/projects/<workspace-slug>/memory/` und ist im `MEMORY.md`-Index
  verlinkt — mehr Apparat braucht sie nicht.
- **Optionaler Verstärker:** ein `SessionStart`-Hook läuft außerhalb des Modells
  und kann die Notiz bei jedem Sitzungsbeginn melden. Registrierung in
  `settings.json`. Auf dem Referenzrechner existiert ein `UserPromptSubmit`-Hook
  (Telegram-Skript) — Beleg, dass Hook-Registrierung hier trägt (Stand 2026-10-12).
- Hooks dürfen keine Secrets ins Repo oder in Antworten leiten.

## Modi bei Qoder

Qoder kennt u. a. einen **Planungsmodus**: Der Agent liefert zuerst einen prüfbaren
Plan und handelt erst nach Freigabe — die Antwort auf „erst übergriffig, dann
zögerlich". Für das Lernelement „Harness-Modi" (siehe `../didaktik.md`) ist er das
anschaulichste Beispiel. (Stand 2026-10-12; Bezeichnung und Tastenkürzel in der
eigenen Version prüfen.)

## Bekannte Grenzen (Stand 2026-10-12)

- Im Auto-Modus sind manche Schreibzugriffe außerhalb des Workspaces gesperrt —
  Dateien unter `~/.qoder` (Skills, Hooks) legt der Nutzer im Zweifel selbst an;
  der Agent bereitet den Inhalt vor.
- Hooks laufen außerhalb des Modells und sind damit die einzige Stelle für
  Garantien; Regeln in Markdown sind Bitten, keine Sperren.
