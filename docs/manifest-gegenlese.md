# Gegenlese zum Manifest

**Stand 2026-10-09.** Verfasser: Agent, auf Manuels Bitte, „auch ein konstruktiver Kritiker" zu sein.
Grundlage sind [`manifest.md`](manifest.md), eine Web-Recherche vom 2026-10-09 (Quellen am Ende, je mit
Datum) und eigenes Modellwissen, das als solches gekennzeichnet ist. Was hier steht, ist Einwand und
Vorschlag — nicht Entscheidung. Angenommen wird davon nur, was in `DECISIONS.md` landet.

---

## 1. Was trägt

Vier Kernaussagen des Manifests sind nicht nur plausibel, sondern inzwischen gut belegt.

**Kontext kuratieren statt maximieren (§4)** ist keine Vorsicht, sondern Messergebnis. Chroma hat im Juli
2025 an 18 Modellen gezeigt, dass die Genauigkeit mit der Eingabelänge sinkt, auch bei identischer,
einfacher Aufgabe; ähnliche, aber irrelevante Inhalte verstärken den Effekt. NoLiMa (Februar 2025) ist
härter: Sobald die Antwort nicht per Wortübereinstimmung zu finden ist, sondern geschlossen werden muss,
fallen elf von dreizehn Modellen bei 32.000 Tokens unter die Hälfte ihrer Kurzkontext-Leistung. Das
heißt für §3: „angereichert und verknüpft" ist richtig, aber gerade die Verknüpfungen, über die das Modell
*schließen* muss, verfallen am schnellsten. Nicht die Menge an Wissen entscheidet, sondern wie nah die
relevante Stelle an der Frage steht.

**Dokumente als Übergabeeinheit (§5)** ist der Konsens, der sich gerade bildet: Googles A2A-Protokoll
definiert „Artifacts" als formales Austauschobjekt zwischen Agenten; Anthropic und Manus beschreiben
Dateien als ausgelagerten Zustand; OpenAIs eigener Codex-Harness nutzt `AGENTS.md` und Dokumentation als
„single source of truth" für Agenten. Deine Beobachtung, dass das dem menschlichen Bürokratieweg
entspricht, ist der verständlichste Grund dafür, den ich gelesen habe.

**Deterministisches in Code, Urteil ins Modell (§7)** ist seit Anthropics „Building effective agents"
(Dezember 2024) und den „12-factor agents" (April 2025) das anerkannte Muster. Hier gibt es nichts zu
kritisieren — außer, dass der Validator in `prototype/tools/` genau diese Anwendung bereits *ist*; eine
zweite „App" neben ihm wäre Dopplung.

**Zugriff außerhalb des Modells, Freigabe an die Nutzlast gebunden** (deine Regel, nicht im Manifest, aber
seine Grundlage): Keine der geprüften Plattformen dokumentiert das. MCP-Elicitation (Spezifikation
2025-06-18) sammelt Eingaben, bindet aber keine Freigabe an einen Hash; die OpenAI Agents SDK zeigt
Argumente vor der Freigabe, bindet aber nicht kryptografisch; Microsofts Freigaben hängen an
Ablaufschritten, nicht an Nutzlasten. Das ist ein echter Unterschied. Es heißt aber auch: Du baust vor dem
Standard, und das muss klein bleiben.

## 2. Wo ich widerspreche

**„Ohne Annahmen und ohne Rückfragen" (§3) kollidiert mit deiner eigenen härtesten Regel.** „Was nicht
belegt ist, wird gefragt, nicht gesetzt" steht im Messprotokoll als Vergleichsmaßstab, und BILL-01
*erwartet* als richtiges Ergebnis eine Frage an `rolle:entwicklung`. Beides zugleich geht nicht. Der
Fehler liegt in der Verallgemeinerung: Zu vermeiden ist die Rückfrage, die ein **Kontextloch** anzeigt —
etwas, das im Bestand hätte stehen müssen. Erwünscht ist die Rückfrage, die eine **vorgesehene Aktion**
ist — eine Entscheidung, die niemandem außer dem Eigentümer zusteht. Das Manifest sollte „ohne
vermeidbare Rückfragen" sagen und das Messprotokoll die zwei Sorten getrennt zählen. Sonst belohnt der
Maßstab ein Modell, das rät, statt zu fragen — und genau das wolltest du verhindern.

**Der strukturelle Vorteil (§4) ist zugleich die größte Hürde des Produkts.** Eine Person, aller Kontext
aus einer Hand: Das macht den eigenen Betrieb zum sauberen Labor. Beim ersten Kunden gilt nichts davon.
Dort ist der Kontext verteilt, widersprüchlich, teils nur im Kopf, und niemand pflegt ihn. Der teurste Teil
der Dienstleistung wird dann nicht das *Halten* von Kontext sein, sondern das *Beschaffen und
Aktuellhalten* — Interviews, Extraktion aus bestehenden Systemen, Streit um die gültige Version. Das
Manifest beschreibt den Core Loop für den Fall, in dem der Kontext bereits da ist. Wenn „Dienstleistung
soll in Produkt übergehen" (Sign-off §2) ernst gemeint ist, muss die Kontextbeschaffung selbst zu einem
Verfahren werden — sonst bleibt der Produktanteil der Validator, und alles andere bleibt Stunden. MIT
NANDA (August 2025) nennt als Hauptgrund gescheiterter Piloten nicht die Modellqualität, sondern dass
Werkzeuge nicht zum Arbeitsablauf passen; die Kontextbeschaffung ist genau die Stelle, an der das
entschieden wird.

**Presets sind kein Burggraben (§2).** Anthropics Agent Skills (Oktober 2025) sind absichtlich offen und
portabel, `AGENTS.md` ist tool-übergreifende Konvention, und Vorlagen-Marktplätze (Relevance AI u. a.,
Herstellerangaben) verschenken generische Konfigurationen bereits. Ein Preset für „Kundenänderung prüfen"
wird es in einem Jahr kostenlos geben. Was es nicht kostenlos geben wird: das Preset **gepaart mit dem
geprüften Firmenkontext, den Datenverträgen und den Abnahmefällen**, gegen die es gemessen wurde. OpenAIs
Harness-Bericht (Februar 2026) sagt es von der anderen Seite: Der Wert lag nicht in der Anweisung, sondern
darin, dass Dokumentation per CI gegen die Wirklichkeit geprüft wurde. Das Produkt ist das geprüfte Paar,
nicht die Vorlage.

## 3. Was du noch nicht siehst

**Der Core Loop erzeugt selbst den Verfall, den er verhindern will.** §6 sagt: Das Geprüfte wird Kontext
für die nächste Aufgabe. Jedes Ergebnisdokument ist damit Kandidat für den Bestand — und mit jedem Fall
wächst er. Ohne ein Tor, das entscheidet, was zurück in den Kontext darf, was einen Vorgänger ablöst
(`supersedes`) und was abläuft (`valid_until`), ist der Loop ein Generator für genau die ähnlichen,
irrelevanten Inhalte, die Chroma als Hauptverstärker des Verfalls misst. Die Schemas haben die Felder
schon; das Manifest hat die Regel noch nicht. Der OpenAI-Harness brauchte eine Prüfpipeline gegen
Dokumentendrift aus demselben Grund.

**Mehrschrittige Büroabläufe sind heute noch unzuverlässig.** TheAgentCompany (Dezember 2024, aktualisiert
2025) ließ Agenten realistische Büroaufgaben über mehrere Anwendungen lösen; der beste schaffte rund 30 %.
Dominant scheiterten lange Ketten und Schnittstellenwechsel. Für §5 heißt das: „Dokument wird an die
nächste Stelle weitergegeben" darf im Prototyp kein Automatismus sein. Jede Weitergabe ist ein
Zustandsübergang mit Prüfpunkt — was die Zustandsmaschine im `case-state`-Schema bereits vorsieht. Das
Manifest sollte das aussprechen, damit die spätere Anwendung es nicht aus Bequemlichkeit abschafft.

**„Exakt auf die Problemlösung zugeschnitten" (§8) skaliert nicht als Satz.** Eine eigene Oberfläche je
Prozess ist bei zwei Prozessen gut und bei zwanzig eine Pflegelast, die den Produktanteil wieder auffrisst.
Der Ausweg liegt in deinen eigenen Verträgen: Eine Fallansicht, die aus `state.json`, den
Kontextdatensätzen mit Quelle, den Aktionen mit Freigabe-Hash und den Abweichungen zum erwarteten
Ergebnis gerendert wird, ist für *jeden* Prozess passgenau — weil die Prozessdefinition sagt, was gezeigt
wird. Zugeschnitten muss die Ansicht sein, nicht handgebaut.

**Qoder ist ein Hersteller.** Hooks, Skill-Formate und Session-Verhalten des Harness sind nicht deins.
Alles, was Preset heißt, sollte in offenen Formaten liegen (`AGENTS.md`-Konvention, Skill-Ordner, deine
JSON-Schemas) und nichts von Qoder-Besonderheiten voraussetzen, das sich nicht in einer Woche ersetzen
lässt. Der Sign-off nennt Qoder austauschbar; das Manifest sollte sagen, woran man das misst.

## 4. Wo Firmen mehr kritischen Mehrwert bekommen könnten

Die gemessenen Erfolge liegen bisher in **hochvolumigen, skriptnahen Aufgaben**: Brynjolfsson u. a.
(QJE, März 2025) messen +14 % gelöste Vorgänge je Stunde im Kundensupport, bei Neulingen +15 bis 34 %.
Für niedrigvolumige, maßgeschneiderte Bürokratie — genau deine Zielaufgaben — gibt es keinen
vergleichbaren Beleg. Das ist kein Gegenargument, aber eine Beweislast: Den Nutzen wirst du nur mit der
eigenen instrumentierten Baseline zeigen, und kein Bericht nimmt dir das ab.

Zwei Werte stecken in deinem Entwurf, die das Manifest nicht benennt und die für eine Firma oft schwerer
wiegen als gesparte Minuten:

**Nachweisbarkeit als Nebenprodukt.** Jede Aktion mit Quelle, jede Freigabe mit Hash, jeder Zustand mit
Zeitpunkt — das ist ein Prüfpfad, den ein Chat-Assistent nicht hat und den ein Betrieb gegenüber
Steuerberater, Kunde oder Prüfer braucht. Eigene Einschätzung, nicht recherchiert: Für deutsche Betriebe
ist Belegführung kein Komfort, sondern Pflicht; eine Lösung, die den Nachweis *beim Arbeiten* erzeugt
statt danach, verkauft sich über ein anderes Argument als „KI spart Zeit". Zahlen dazu: OFFEN — Manuel.

**Wissen aus dem Kopf des Inhabers in den Bestand.** Der kuratierte Kontext ist für einen inhabergeführten
Betrieb auch eine Vertretungs- und Nachfolgesicherung. Das ist eigenes Modellwissen über den Mittelstand,
keine Quelle in diesem Bestand; aber es wäre ein Discovery-Gespräch wert, ob ein Inhaber dafür eher zahlt
als für die Fallbearbeitung selbst.

Und eine Richtung, die du bewusst meidest, aber nicht vergessen solltest: Dort, wo eine Zielfirma bereits
ein operatives System führt (PSA, Rechnungswesen), ist der schnellste Mehrwert oft der **Abgleich zwischen
diesem System und der Korrespondenz** — die Lücke, die niemand bemerkt, bis sie Geld kostet. Das ist
dieselbe Architektur, nur mit einem Anschluss mehr und einem Schreibziel weniger.

## 5. Was ich am Plan ändern würde

1. **Messprotokoll §4 ergänzen:** Rückfragen in zwei Spalten — *Kontextloch* (zu vermeiden) und
   *vorgesehene Entscheidungsfrage* (erwünscht). Nur die erste zählt gegen den Lauf.
2. **Eine dritte Bedingung C vorsehen,** sobald A/B gelaufen sind: kuratierter Minimalkontext statt
   vollem Fallkontext. Das ist die eigentliche Frage aus §4 des Manifests, und sie ist derzeit ungemessen.
3. **Eine Rückführungsregel formulieren:** Welche Ergebnisdokumente werden Kontextdatensätze, mit welchem
   `scope`, welchem `valid_until`, welchem `supersedes`? Ohne sie wächst der Bestand ungeprüft.
4. **Die Fallansicht in M2 aufnehmen,** als einfachste schemagetriebene Darstellung — keine Anwendung,
   eine Seite aus `runs/<fall>/`. Das ist §9 des Manifests, aber als Prüfmittel statt als Versprechen.
5. **Kontextbeschaffung als eigenen Prüfpunkt** benennen: Wie lange braucht ein Betrieb, der nicht du
   bist, bis er einen validen Korpus hat? Das ist die Zahl, an der sich „Dienstleistung wird Produkt"
   entscheidet, und sie fehlt in jeder Tabelle.

---

## Quellen (Web-Recherche 2026-10-09)

- Chroma, *Context Rot*, 2025-07-14 — https://www.trychroma.com/research/context-rot
- Modarressi u. a., *NoLiMa*, 2025-02-07 (ICML 2025) — https://arxiv.org/abs/2502.05167
- Liu u. a., *Lost in the Middle*, 2023-07 (TACL 2024) — https://arxiv.org/abs/2307.03172
- Anthropic, *Effective context engineering for AI agents*, 2025-09-29 — https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- Anthropic, *Agent Skills*, 2025-10-16 — https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
- AGENTS.md, undatiert — https://agents.md/
- OpenAI, *Harness engineering*, 2026-02-11 — https://openai.com/index/harness-engineering/
- Google, *A2A*, 2025-04-09 — https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/
- Manus, *Context Engineering for AI Agents*, 2025-07-18 — https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus
- Xu u. a., *TheAgentCompany*, 2024-12-18 (rev. 2025) — https://arxiv.org/abs/2412.14161
- MCP, *Elicitation*, Spezifikation 2025-06-18 — https://modelcontextprotocol.io/specification/2025-06-18/client/elicitation
- OpenAI Agents SDK, *Human in the loop*, undatiert — https://openai.github.io/openai-agents-python/human_in_the_loop/
- Microsoft, *Tool approval* (Agent Framework), 2026-09-28; *AI approvals in Copilot Studio*, 2025-09-03
- Brynjolfsson u. a., *Generative AI at Work*, QJE 2025-03 — https://digitaleconomy.stanford.edu/publication/generative-ai-at-work/
- MIT NANDA, *The GenAI Divide*, 2025-08-18 — Interviews, kein gemessener ROI; Methodik umstritten
- Anthropic, *Building effective agents*, 2024-12-19 — https://www.anthropic.com/research/building-effective-agents
- HumanLayer, *12-factor agents*, 2025-04-03 — https://github.com/humanlayer/12-factor-agents

Herstellerseiten (Relevance AI, Lindy, Microsoft) belegen, was beworben oder dokumentiert ist, nicht, was im
Einsatz funktioniert — Regel 3 des Sign-offs.
