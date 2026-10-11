# Recherche: Kontextverwaltung für Agenten — kuratierte Dateien vs. RAG

**Stand: 2026-10-10.** Alle Quellen an diesem Tag abgerufen.

**Fragestellung.** Delta Weave verwaltet den Agenten-Kontext heute als kleine Markdown-Dateien im
Dateisystem (AGENTS.md, memory-Dateien, Docs im Repo). Die These lautet: Eine Lösung muss an den
Kontext der bestehenden Umgebung angepasst werden; ein minimales dateibasiertes Setup ist oft schon
leistungsfähig genug; RAG (Vektorsuche/Retrieval) ist für den Menschen eine Blackbox, während das
Dateisystem eine vertraute, meist vorhandene Umgebung ist. Es soll nicht komplizierter werden als
nötig — aber RAG bleibt für gute Ergebnisse in Prozessen relevant. Untersucht wird gegen Primärquellen:
Anthropic, agents.md, OpenAI, Manus, HumanLayer, Cursor, MCP, Chroma, arXiv-Benchmarks, Glean/Dust.

**Kennzeichnungsregel dieses Berichts.** *Gemessen* = unabhängige Benchmark-Arbeit oder dokumentierte
Spezifikation. *Selbstauskunft* = Anbieter beschreibt das eigene Produkt oder den eigenen Experimentieraufbau
(OpenAI zu Codex, Anthropic zu Claude, Manus zu Manus). *Herstellerbehauptung* = Marketing-/Doku-Aussage
ohne Funktionsnachweis. Nach Repo-Regel ist Herstellerangabe ≠ Funktionsnachweis.

## §1 Zusammenfassung

Die Primärquellen stützen die These deutlich: Die Erstautoren der dominanten Agenten-Praxis — Anthropic,
das OpenAI-Codex-Team, die agents.md-Konvention, Manus, HumanLayer — empfehlen übereinstimmend ein
dateibasiertes, schrittweise nachladbares Kontext-Setup (AGENTS.md/CLAUDE.md, `docs/`-Verzeichnis, Skills
mit progressiver Disclosure) und kommen dabei ohne Vektor-Infrastruktur aus. Parallel zeigen unabhängige
Benchmarks (NoLiMa, Chroma Context Rot, Lost in the Middle, GlobalQA), dass sowohl lange Kontexte als auch
reine Top-K-Retrieval-Verfahren systematische Grenzen haben: Leistung degradiert schon bei wenigen
tausend Tokens, und korpusweite Fragen scheitern an Chunk-Retrieval. Retrieval wird also nicht überflüssig,
aber es ist ein Skalierungs- und Kostenthema, kein Einstiegs-Thema: Nötig wird es, wenn der kuratierte
Korpus das real nutzbare Fenster überschreitet, wenn semantische Suche über unüberschaubare Mengen nötig
ist oder wenn Berechtigungen für viele Nutzer erzwungen werden müssen. Für ein Solo-Setup mit wenigen
kuratierten Dateien ist ein Vektorspeicher heute durch nichts Primär belegt erforderlich — konkrete
Schwellenwerte (Korpusgröße, Änderungsfrequenz, Nutzerzahl) nennt keine der geprüften Quellen; das bleibt OFFEN.

## §2 Was das Minimum ist, das funktioniert

**Anthropic, „Effective context engineering for AI agents" (2025-09-29, Selbstauskunft/Praxisleitfaden).**
Das Ziel ist, die „smallest possible set of high-signal tokens that maximize the likelihood of some desired
outcome" zu finden; Kontext ist eine „critical but finite resource" mit einem „attention budget", das mit
wachsender Tokenzahl erodiert („context rot"). Als Minimum für längere Sessions nennt der Beitrag explizit die Pflege einer „CLAUDE.md"-Art-Datei und
strukturierte Notizen („NOTES.md") auf dem Dateisystem. Für
Unterlagen, die erst zur Laufzeit gebraucht werden, empfiehlt Anthropic „just-in-time context strategies":
der Agent hält nur leichte Identifier im Kontext — zitiert werden „file paths, stored queries, web links" —
und liest bei Bedarf mechanisch nach; für Coding-Agenten heißt es, „glob and grep allow it to navigate"
ein Repo ohne Vorindexierung. Das sei ausdrücklich nachvollziehbar („mirrors human cognition: we generally
don't memorize entire corpuses of information, but rather introduce external organization and indexing
systems like file systems, inboxes, and bookmarks"). Vektor-Retrieval wird nicht verworfen, aber als
vor-inference „embedding-based pre-inference time retrieval" als separaten, primär für große, unübersichtliche
Korpora gedachten Pfad beschrieben. (Quelle: anthropic.com, Stand 2026-10-10.)

**Anthropic, „Building effective agents" (2024-12-19).** Die Grundregel: simple, komponierbare Muster statt
Frameworks — „Consistently, the most successful implementations use simple, composable patterns rather than
complex frameworks." Das ist das Zitat, das die „nicht komplizierter als nötig"-Haltung der These direkt stützt.

**agents.md (Konventionsseite, undatiert).** AGENTS.md ist ein „README for agents": Anweisungen in einer
eigenen Datei statt im menschlichen README, gefunden über Hierarchie-Regel „The closest AGENTS.md to the
edited file wins". Die Konvention ist bewusst dateibasiert, Versionskontroll-fähig und ohne jede Retrieval-
Infrastruktur; unterstützt u. a. von OpenAI Codex, Google Jules, Cursor und VS Code.

**Anthropic Agent Skills (Engineering-Post 2025-10-16; offizielle Doku, Stand 2026-10-10).** Ein Skill ist
ein Ordner mit `SKILL.md` auf dem Dateisystem. Das Kernargument der These — wenig Dateien, aber gestuft
geladen — ist hier zur Spezifikation geworden: immer geladen wird nur die Metadaten-Zeile (ca. 100 Tokens),
der Skill-Rumpf bei Auslösung (< ca. 5.000 Tokens), gebündelte Referenzdateien erst bei Zugriff
(„zero tokens until accessed"). Diese „progressive disclosure" ersetzt faktisch ein Retrieval-System durch
Namens- und Dateisuche. Ohne Embeddings umsetzbar.

**OpenAI, „Harness engineering: leveraging Codex in an agent-first world" (2026-02-11, Selbstauskunft).**
Das Codex-Team beschreibt den Kontextaufbau rein dateibasiert: „Repository knowledge lives in a structured
docs/ directory … treated as the system of record" und „AGENTS.md serves primarily as a map." Kontrollen
liegen nicht im Prompt, sondern im Repo: „Enforced mechanically via custom linters and structural tests."
Als Zahlen nennt OpenAI für das Experiment rund eine Million Zeilen Code, etwa sieben Engineers,
1.500 Pull Requests und die Behauptung, „built this in about 1/10th the time". *Wichtig:* Die Originalseite
lieferte bei Abruf eine 403-Sperre; die Zitate stammen aus einem Wayback-Machine-Spiegel der Originalseite
(Abruf 2026-10-10). Die Zahlen sind Selbstauskunft über ein internes Experiment, nicht unabhängig verifiziert.

**Cursor Rules (offizielle Doku, Stand 2026-10-10).** „Rules provide persistent, reusable context at the
prompt level", abgelegt in `.cursor/rules` oder `AGENTS.md`; die Empfehlung lautet, Regeln „focused,
actionable, and scoped" zu halten und die 500-Zeilen-Marke pro Datei im Blick zu behalten. Auch hier:
kein Retrieval-System, nur Textdateien im Projekt.

**Zwischenstand:** Alle geprüften Empfehlungskanäle — Anthropic, OpenAI, agents.md, Manus, Cursor — sind
 ohne Vektorsuche/Embedding-Infrastruktur umsetzbar. Das datumgestützte Minimum für Delta Weave ist
identisch mit dem, was bereits gebaut ist: AGENTS.md als Karte, verlinkte Kuratierungsdateien,
gestuftes Nachladen über Dateipfade.

## §3 Grenzen von RAG-only (und von „viel Kontext")

Die independent gemessenen Befunde betreffen beide Extrempositionen — Vollkontext *und* reines
Top-K-Retrieval:

**Lost in the Middle** (Liu et al., arXiv 2307.03172, eingereicht 2023-07-06, *gemessen*): Leistung ist
U-förmig — „performance is often highest when relevant information occurs at the beginning or end … and
significantly degrades when models must access relevant information in the middle" langer Kontexte.
Position im Kontext ist ein systematischer Fehlerfaktor, unabhängig davon, ob die Information dabei ist.

**NoLiMa** (Modarressi et al., arXiv 2502.05167, v1 2025-02-07, ICML 2025, *gemessen*): 13 Modelle mit
beworbenen ≥128K-Fenstern wurden mit Fragen ohne wörtliche Übereinstimmung zur „needle" getestet. Ergebnis:
„At 32K … 11 models drop below 50% of their strong short-length baselines", und selbst GPT-4o fällt von
99,3 % auf 69,7 %. Reasoning und CoT-Prompting heben das nicht grundsätzlich. Die beworbenen Fenstergrößen
sind damit kein Beleg für nutzbar vergleichbaren Zugang zu langem Kontext. Das zugehörige GitHub-Repo
definiert „effective length" als längsten Kontext mit ≥85 % des Kurz-Kontext-Scores. Eine darüber hinausgehende
pauschale Aussage „die meisten Modelle sind praktisch auf ≤2K Tokens beschränkt", die im Umlauf ist, war auf
den geprüften Primärseiten (arXiv-Abstract, GitHub-README) so wörtlich nicht verifizierbar — sie bleibt hier
nicht als Zahl gesetzt.

**Chroma, „Context Rot"** (Hong/Troynikov/Huber, 2025-07-14, *gemessen*, von einem Retrieval-Anbieter —
Interesse an der these „long context ist unzuverlässig, deshalb Kontext kuratieren"): 18 Modelle bis in den
Millionen-Token-Bereich getestet; Kernbefund wörtlich: „performance grows increasingly unreliable as input
length grows", selbst auf triviale Aufgaben, mit „non-uniform impact" von Distraktoren. Schlussfolgerung der
Autoren: Kontextengineering (Kuratierung, Komprimierung) statt blindes Volleinfüllen.

**Paulsen, „Maximum Effective Context Window"** (arXiv 2509.21361, eingereicht 2025-09-21, AAIML 2026,
*gemessen*): führt den Begriff MECW ein („shifts based on problem type") und berichtet, dass bei einigen
Modellen die Halluzinationsraten schon „as input token counts reach as little as 2000 tokens" ansteigen.

**Grenzen reinen Retrieval-Ansatzes:** Das RAG-Gründungspapier selbst (Lewis et al., arXiv 2005.11401,
2020-05-22, *gemessen*) formuliert den Anlass nüchtern: parametrische Modelle haben begrenzten, unpräzisen
Wissenszugriff — „their ability to access and precisely manipulate knowledge is still limited, and hence on
knowledge-intensive tasks, their performance lags". Barnett et al. (arXiv 2401.05856, 2024-01-11, *gemessen/
Systematisierung*) zählen die sieben Failure Points einer RAG-Pipeline auf — Chunking, Retrieval, Embedding,
Generierung usw. — und benennen als Ziel von RAG u. a., „the problem of hallucinated responses" zu *reduzieren*,
nicht zu beseitigen. Der schärfste neuere Befund betrifft die *Art* der Frage: **GlobalQA** (arXiv 2510.26205,
2025-10, *gemessen*) testet korpusweite Aufgaben (Zählen, Extremwerte, Sortieren, Top-k über eine ganze
Dokumentsammlung) und findet: „existing RAG methods perform poorly on global tasks, with the strongest
baseline achieving only 1.51 F1." Wer „über den ganzen Bestand" fragen muss (welche Verträge laufen 2026 aus?
welcher Kunde hat am häufigsten Kulanz erhalten?), bekommt mit Top-K-Chunks messbar fast nichts — das
Fragmentierungsproblem ist exakt das, was eine kuratierte Datei (z. B. eine gepflegte Tabelle im Kontext)
löst, die ein Agent direkt liest.

**Einordnung für die These:** Kein geprüfter Primärtext sagt, dass RAG generell fehlschlägt. Die gemessenen
Fehlerquellen sind (a) Positions-/Längen-Degradation (unabhängig davon, ob retrieved oder geladen wurde),
(b) Chunk-Verlust bei korpusweiten Fragen, (c) Halluzination trotz vorhandener Evidenz. Eine
Vektorsuche-Pipeline behebt nichts davon automatisch; sie *verschiebt* das Problem in Retriever-Qualität,
Chunking und Re-Ranking — lauter Stellschrauben, die für den Betreiber unsichtbar sind (Blackbox-Einwand
der These, hier insoweit gedeckt, als die Fehlerarten in den Papers dokumentiert sind).

## §4 Wann Retrieval tatsächlich nötig wird

Was Primärquellen hergeben, sind Kriterien und Kostenargumente, keine harten Schwellen:

- **Anthropic (2025-09-29):** just-in-time-Navigation über Dateipfade/grep ist „slower than retrieving
  pre-computed data" und eignet sich, wenn der Agent die *Struktur* kennt und wenig, aber gezielt sucht;
  Embedding-Retrieval steht dort als Weg für große Bestände, in denen man nicht weiß, wo etwas liegt.
  Das ist das Kriterium: bekannte Struktur → Dateisystem; unbekannter, großer Korpus → semantische Suche.
- **Google DeepMind / EMNLP-2024-Studie** (arXiv 2407.16833, *gemessen*): „Results reveal that when resourced
  sufficiently, LC consistently outperforms RAG … However, RAG's significantly lower cost remains a distinct
  advantage." Nötig wird Retrieval also auch als *Kosten*-Hebel, sobald Volumen anfällt — die Hybrid-Empfehlung
  der Autoren (Self-Route: pro Frage zwischen RAG und Vollkontext wählen) passt zur These „RAG bleibt für gute
  Ergebnisse relevant", ohne einen dauerhaften Vektorspeicher zu erzwingen.
- **Real nutzbare Fenstergröße:** NoLiMa (11 von 13 Modellen unter 50 % Baseline bei 32K), Chroma (nicht-
  monotone Degradation) und Paulsen (Halluzination ab ~2.000 Tokens) begrenzen, wie viel „kuratiert alles
  vorladen" praktisch sein kann. Wer diesen Rahmen sprengt, braucht *irgendeine* Selektion — Dateisystem-
  Navigation mit metaschlanken Einstiegspunkten ist die nächstliegende; Vektorsuche erst die teuerste.
- **Mehrere Nutzer/Berechtigungen:** Glean dokumentiert (Herstellerdoku) sein Muster so: „fetch data from
  connected applications and store the information in Glean's system"; „search results strictly adhere to the
  access permissions set in the source application." Ab dem Punkt, an dem ein Agent fremde Bestände mit
  individuellen Rechten bedienen muss, ist ein Berechtigungs-/Indexsystem außerhalb eigener Dateien der
  realistische Weg — beim Solo-Betrieb mit einem Betreiber als Rechteinhaber entfällt dieses Kriterium.

**OFFEN — Manuel:** Belastbare Zahlen zu Korpusgröße, Änderungsfrequenz oder Nutzerzahl, ab denen ein
Datei-Ansatz kippt, nennt *keine* der geprüften Primärquellen. Anthropic, OpenAI und Manus liefern
mechanistische Kriterien (Struktur bekannt? Zugriffsrecht? Kosten?), keine Mengenschwellen. Eine eigene
Schwelle müsste Delta Weave aus dem M3-/M4-Messprototyp ableiten, nicht aus Literatur.

## §5 Nachvollziehbarkeit als Argument

Die dokumentarischen Primärquellen für „menschenlesbare Artefakte statt Blackbox":

- **HumanLayer, 12-Factor-Agents** (GitHub, ab 2025-04, Erstautor Dex Horthy): Faktor 3 „Own your context
  window" setzt die Priorität: „Context engineering is the #1 job of AI engineering"; das Fenster wird als
  RAM modelliert („context window is like RAM"), befüllt aus „user messages, tool outputs, system prompts,
  history". Ausdrücklich gefordert werden menschenlesbare Zwischenergebnisse und „version control your prompts
  and context" — Prüfbarkeit über Git-Diff ist dort Argument, nicht Nebenprodukt. (Quelle: GitHub-README,
  Stand 2026-10-10.)
- **Manus-Blog** (2025-07-18, Selbstauskunft): „treat the file system as the ultimate context"; Dateien als
  „structured, externalized memory" — das Dateisystem ist „unlimited in size, persistent by nature" und
  damit Speicher wie Retrieval-Index in einem, ohne eigene Infrastruktur. Ökonomisches Detail dort:
  gecachte Input-Tokens kosten $0.30 gegen $3 uncached (Anbieterzahl, nicht unabhängig gemessen) —
  Stabilität des Dateikontexts ist auch ein Kostenargument. Praktiken: `todo.md`-Festschreibung (Recitation), Fehler im
  Kontext lassen statt löschen, Tool-Maskierung statt Herausfiltern.
- **OpenAI Harness engineering** (2026-02-11): `docs/` als „system of record", AGENTS.md nur als Karte,
  Regeln „enforced mechanically via custom linters and structural tests". Nachvollziehbarkeit heißt hier:
  Was der Agent wissen darf, steht in dateien, die sich per Diff prüfen lassen; was er einhalten muss,
  liegt außerhalb des Prompts in CI — deckungsgleich mit der Repo-Regel „Zugriff wird außerhalb des Modells
  erzwungen".
- **MCP Filesystem-Server** (offizielles Modell Context Protocol, servers-Repo, undatiert/Stand 2026-10-10):
  Standardisierter Weg, Agenten direkt an bestehende Verzeichnisse anzuhängen: „All filesystem operations are
  restricted to allowed directories", Absicherung über konfigurierte Roots. Nachvollziehbarkeitsgewinn:
  Der Agent liest die *Originaldateien*, keine indexierte Kopie; Zugriff ist Pfad- und damit prüfbar begrenzt.
- **agents.md / Cursor / Anthropic Skills** (§2): gemeinsam ist allen dreien, dass Kontext eine *Textdatei
  im Projekt* ist — versionierbar, diff-bar, von jedem Editor einsehbar. Das ist der Kern des Blackbox-
  Arguments der These, so explizit in den Quellen allerdings meist als Nebeneffekt beschrieben, nicht als
  messbarer Vorteil. Einen Benchmark „Dateicontext schlägt Vektor-Retrieval in der Mensch-Vertrauensprüfung"
  habe ich nicht gefunden; OFFEN.

## §6 Was das für die These bedeutet

**Stützt sie stark:** Die Empfehlung „an den Kontext der bestehenden Umgebung anpassen, minimal starten"
ist die ausdrückliche Erstautoren-Praxis — Anthropic (CLAUDE.md, just-in-time, grep), OpenAI (docs/ als
System of Record), agents.md, Cursor, Manus, 12-factor. Kein geprüfter Primärtext verlangt für ein Solo-
Kontext-Setup eine Embedding-Infrastruktur. Das Dateisystem ist über MCP sogar genormt angebunden.

**Korrigiert sie an zwei Rändern:** (1) Das Dateisystem ist nicht per se zuverlässiger *fürs Modell*:
Context Rot, NoLiMa und Lost in the Middle zeigen, dass auch der kuratierte Voll-Zugriff an Positions-
und Längengrenzen stößt. „Dateien statt RAG" löst die Blackbox-Frage, nicht die Aufmerksamkeits-Frage —
Kuratierung muss also aktiv *knapp* halten, nicht nur *lesbar* sein. (2) GlobalQA belegt, dass Top-K-Retrieval
für korpusweite Fragen praktisch versagt; die Schlussfolgerung „Dateien sind besser" gilt dort besonders,
aber die Umkehrung — „RAG reicht für alles" — wäre falsch. Für Prozesse, die *aggregieren* müssen, bleibt
die kuratierte Übersichtsdatei das Mittel, nicht die Chunksuche.

**Ergänzt sie:** Die These „RAG bleibt für gute Ergebnisse in Prozessen relevant" findet ihr Primärargument
in der EMNLP-2024-Studie zu LC vs. RAG (Kosten) und in Self-Route-artigen Hybridmustern — Retrieval als
*Fallback für unübersichtliche, fremde oder große Bestände*, kuratierte Datei als *Normalfall*. Das
praktische Kriterium statt einer Schwellzahl: Bekannte Struktur und ein Rechteinhaber → Dateien;
Unbekannter großer Korpus, viele Nutzer mit unterschiedlichen Rechten, oder Kosten bei hohem Volumen →
Retrieval bzw. gehostetes System (à la Glean/Dust, beides Herstellermodelle mit Indexierung und
Permissions-Mirroring). Eine empfohlene Architektur-Stufe für den Prototyp: AGENTS.md als Karte →
Skills/Unterdateien per progressiver Disclosure → grep/glob → (erst bei Messbedarf) Vektorschicht,
entsprechend dem M4-Experiment in CONTEXT-SIGNOFF §8.

## §7 Quellen

Primärquellen (Selbstauskunft = Anbieter über eigenes Produkt; gemessen = Benchmark/Paper; Herstellerbehauptung = Marketing/Doku):

1. Anthropic: „Effective context engineering for AI agents", 2025-09-29, anthropic.com/engineering/effective-context-engineering-for-ai-agents — Selbstauskunft/Praxisleitfaden. (Abruf 2026-10-10.)
2. Anthropic: „Building effective agents", 2024-12-19, anthropic.com/engineering/building-effective-agents — Selbstauskunft. (Abruf 2026-10-10.)
3. agents.md, offizielle Konventionsseite, undatiert, agents.md — Spezifikation. (Abruf 2026-10-10.)
4. Anthropic: „Equipping agents for the real world with Agent Skills", 2025-10-16, anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills; plus Agent-Skills-Doku, platform.claude.com/docs/en/agents-and-tools/agent-skills/overview, undatiert — Selbstauskunft/ Spezifikation. (Abruf 2026-10-10.)
5. OpenAI: „Harness engineering: leveraging Codex in an agent-first world", 2026-02-11, openai.com/index/harness-engineering/ — Selbstauskunft; Originalseite 403, Zitate über Wayback-Spiegel (web.archive.org), abgerufen 2026-10-10.
6. Cursor Docs: „Rules", undatiert, cursor.com/docs/context/rules — Herstellerdoku. (Abruf 2026-10-10.)
7. Chroma: „Context Rot: How Increasing Input Tokens Impacts LLM Performance", 2025-07-14, trychroma.com/research/context-rot — gemessen (Anbieter mit Eigeninteresse an „Kontext kuratieren"). (Abruf 2026-10-10.)
8. Modarressi et al.: „NoLiMa: Long-Context Evaluation Beyond Literal Matching", arXiv:2502.05167 (v1 2025-02-07, v3 2025-07-09), ICML 2025; github.com/adobe-research/NoLiMa — gemessen. (Abruf 2026-10-10.)
9. Liu et al.: „Lost in the Middle: How Language Models Use Long Contexts", arXiv:2307.03172, eingereicht 2023-07-06 — gemessen. (Abruf 2026-10-10.)
10. Paulsen: „The Maximum Effective Context Window for Real World Long Context Tasks", arXiv:2509.21361, eingereicht 2025-09-21, AAIML 2026 — gemessen. (Abruf 2026-10-10.)
11. „Towards Global Retrieval Augmented Generation: A Benchmark for Global Reasoning on Corpora (GlobalQA)", arXiv:2510.26205, 2025-10 — gemessen. (Abruf 2026-10-10.)
12. Barnett et al.: „Seven Failure Points When Engineering a Retrieval Augmented Generation System", arXiv:2401.05856, eingereicht 2024-01-11 — Systematisierung/Messrahmen. (Abruf 2026-10-10.)
13. Lewis et al.: „Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", arXiv:2005.11401, eingereicht 2020-05-22 — gemessen (RAG-Gründungspapier). (Abruf 2026-10-10.)
14. „Retrieval Augmented Generation or Long-Context LLMs? A Comprehensive Study and Hybrid Approach"
    (Google DeepMind; laut arXiv-Seite accepted to EMNLP 2024 industry), arXiv:2407.16833 — gemessen. (Abruf 2026-10-10.)
15. HumanLayer (Dex Horthy): „12-factor agents", GitHub-README, ab 2025-04, github.com/humanlayer/12-factor-agents — Praxisleitfaden Erstautor. (Abruf 2026-10-10.)
16. Manus: „Context Engineering for AI Agents: Lessons from Building Manus", 2025-07-18, manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus — Selbstauskunft. (Abruf 2026-10-10.)
17. Model Context Protocol: offizieller Filesystem-Server, github.com/modelcontextprotocol/servers/tree/main/src/filesystem, undatiert — Spezifikation/Doku. (Abruf 2026-10-10.)
18. Glean Docs: „About connectors", docs.glean.com/connectors/about — Herstellerdoku; Marketingzahl „275+ apps" (glean.com/platform/connectors) ist Herstellerbehauptung ohne Funktionstest. (Abruf 2026-10-10.)
19. Dust Docs: „Connections", docs.dust.tt/docs/connections — Herstellerdoku. (Abruf 2026-10-10.)

Nebenquellen nur zur Zugangsvermittlung: InfoQ-Meldung zu OpenAI Harness Engineering (2026-02-21),
infq.com/news/2026/02/openai-harness-engineering-codex/ — wurde nicht als Belegstoff verwendet, die
Zitate oben stammen aus dem archivierten Original.

**Nicht belegt / OFFEN — Manuel:** Mengenschwellen für den Umschaltpunkt Datei→RAG; ein Benchmark für
Nachvollziehbarkeit (Datei vs. Vektorspeicher); das im Umlauf befindliche „effektive Länge ≤2K Tokens"-Zitat
zu NoLiMa (nur als abgeleitete, wörtlich nicht verifizierte Aussage behandelt); alle OpenAI-Zahlen sind
Selbstauskunft eines internen Experiments.
