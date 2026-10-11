# Was ist ein Harness?

*Für Menschen, die bisher ein Chatfenster benutzt haben. Keine Fachbegriffe vorausgesetzt;
die wenigen, die nötig sind, werden erklärt.*

## Modell und Harness sind zwei verschiedene Dinge

Das **Modell** ist das, was Antworten erzeugt — die KI, mit der man im Chatfenster schreibt.
Der **Harness** (englisch für „Geschirr") ist das Programm **um das Modell herum**: Er reicht
deine Nachrichten ans Modell weiter, gibt ihm Werkzeuge in die Hand (Dateien lesen und
schreiben, Befehle ausführen, im Netz suchen) und entscheidet, was das Modell alles zu sehen
bekommt. ChatGPT im Browser ist ein Chat um ein Modell. Ein Harness ist eine **Arbeitsumgebung**
um dasselbe Modell: Der Agent — so heißt das Modell im Harness — kann nicht nur antworten,
sondern **handeln**: Dateien anlegen, Code ausführen, seine eigenen Notizen pflegen.

Der Name des Harness variiert (Qoder, Claude Code, Cursor und andere), und viele Einzelheiten
sind **harness-abhängig**. Wo dieser Text so eine Stelle berührt, steht ein Hinweis auf den
passenden Anhang in `anhaenge/`.

## Was in jeder Session passiert

Eine **Session** ist ein Arbeitsgespräch mit dem Agenten. Wichtig ist zu wissen: Die Session
ist **vergänglich**. Sie wird lang, der Agent verliert den Überblick, sie wird geschlossen,
und das Gespräch ist weg. Was danach noch stimmen soll, muss **in Dateien** stehen — nicht im
Gespräch. Das ist der wichtigste Unterschied zum Chatfenster: Im Harness ist die Datei der
Dauerspeicher, das Gespräch nur der Arbeitsvorgang.

Was der Agent in einer Session „sieht", heißt **Kontext**. Der Kontext ist begrenzt, und mehr
davon macht die Antworten nicht besser, sondern ab einer gewissen Menge messbar schlechter
(dafür hat sich der Begriff **Context Rot** eingebürgert). Deshalb ist die zentrale Fähigkeit
im Umgang mit einem Harness nicht „möglichst viel hineingeben", sondern **kuratieren**:
genau das bereithalten, was die Arbeit braucht, in guter Qualität, ohne Ballast.

## Die fünf Grundbegriffe

**Regeldateien** (z. B. `AGENTS.md`) liegen im Projekt oder auf Benutzerebene und werden zu
Beginn gelesen. Hier steht, was immer gilt: Was dieses Projekt ist, welche Regeln der Agent
befolgen soll, wo er was findet. Kurz halten — diese Datei ist in *jeder* Session im Kontext.

**Skills** sind Anleitungspakete für bestimmte Aufgaben. Sie bestehen aus einer kurzen
Beschreibung, die der Agent immer sieht, und dem eigentlichen Inhalt, der erst geladen wird,
wenn die Aufgabe drankommt. So bleibt der Kontext schlank: Der Agent „kann" viele Dinge,
ohne dass alle Anleitungen ständig mitgeschleppt werden. *Wo Skills abgelegt werden, ist
harness-abhängig — siehe Anhang.*

**Hooks** sind kleine Programme, die der Harness bei bestimmten Ereignissen ausführt — etwa
nach jeder Antwort oder vor jedem Werkzeugaufruf. Hooks laufen **außerhalb** des Modells:
Sie sind deterministisch und damit die richtige Stelle für Dinge, die *garantiert* passieren
müssen (eine Regel dagegen kann der Agent übersehen, ein Hook nicht). *Registrierung ist
harness-abhängig — siehe Anhang.*

**Memories** sind kleine Notizdateien, die der Agent selbst anlegt und pflegt: was er über
dich gelernt hat, welche deiner Regeln er sich merken soll, wo Dinge liegen. Ein Index
(z. B. `MEMORY.md`) zeigt, was es gibt; jede Zeile verweist auf eine eigene Datei. Memories
sind das Gedächtnis über Sessions hinweg — *Ablageort und Format sind harness-abhängig.*

**Kontextdateien** sind alles andere, was du dem Agenten an Wissen mitgibst: Vision des
Projekts, Entscheidungen, Glossare, Referenzmaterial. Sie liegen als normale Dateien im
Projekt (gern in Git), und der Agent liest sie bei Bedarf. Hier gilt das Prinzip
**agent-first ablegen**: so ordnen und benennen, dass ein Agent — oder ein neuer Rechner —
ohne Rückfragen weiterarbeiten kann.

## Warum das am Anfang verwirrend ist

Ein Harness ist **ein Konzept, das von mehreren Produkten leicht anders umgesetzt wird** —
kein einzelnes Programm, das man einmal kennenlernt. Dieselbe Idee heißt hier „Skill", dort
„Rule" oder „Command"; dieselbe Information liegt hier unter `~/.qoder`, dort im Projekt.
Genau deshalb führt dieser Skill: Er erklärt das Konzept, markiert jede harness-abhängige
Stelle und legt die Einzelheiten in den Anhang deines Harness.

## Die drei Grundsätze, die überall gelten

1. **Dateien schlagen Gespräche.** Was zählt, wird geschrieben — der Chat ist Flüchtigkeit.
2. **Weniger Kontext, besser kuratiert.** Der Engpass ist nicht das Modell, sondern die
   Qualität dessen, was es zu sehen bekommt.
3. **Erzwingen schlägt Bitten.** Was garantiert passieren muss (Zugriffsgrenzen,
   Prüfungen, Absicherungen), gehört in Hooks, Werkzeuge oder Ordnerstrukturen — nicht in
   eine Regel, die der Agent auch vergessen kann.
