# Manifest — Company Harness

**Stand 2026-10-09.** Quelle: Manuels Diktat in der Sitzung vom 2026-10-09, hier verdichtet, nicht
umgedeutet. Was in diesem Dokument steht, ist seine Position. Die Gegenlese eines Agenten — mit Recherche
und Einwänden — steht absichtlich getrennt in [`manifest-gegenlese.md`](manifest-gegenlese.md), damit sich
Standpunkt und Kritik nicht vermischen. Eine HTML-Fassung beider Teile liegt in
[`manifest.html`](manifest.html).

Das Manifest ersetzt keinen der bestehenden Pläne. Es benennt das Ziel, das den Plänen bisher fehlte, und
die Haltung, aus der sie zu lesen sind.

---

## 1. Das Ziel ist die Evaluierung

Bisher wurde gebaut, ohne dass jemand gesagt hätte, wofür. Das wird hier nachgeholt: **Das Ziel dieser
Phase ist die Evaluierung**, nicht das Produkt. Was in `prototype/` liegt, ist ein Prüfstand. Er soll
zeigen, ob die Gedanken in diesem Manifest tragen — und wo sie es nicht tun. Ein Prüfstand, der sein
Ergebnis schon kennt, ist keiner; deshalb stehen die Abbruchbedingungen im Plan neben den Zielen und
nicht darunter.

## 2. Der Harness ist schon da

Der Agenten-Harness muss nicht gebaut werden. Er existiert in Form von Qoder und seinen Verwandten, und
für verschiedene Problemklassen vermehren sich gerade spezialisierte Harness-Lösungen. Das ist keine
Bedrohung für die Idee, sondern ihre Voraussetzung: Je mehr der Harness kann, desto deutlicher verschiebt
sich die Frage für eine Firma weg von „Wie bekomme ich einen Agenten?" hin zu **„Wie richte ich den
Harness für meine Aufgaben ein?"** — also wie entstehen Presets für Aufgabenklassen, die ein Betrieb
immer wieder braucht. Darin liegt das, was Delta Weave beitragen kann. Nicht im Modell, nicht im Harness.

## 3. Aufgaben sind der Kern, und welche Aufgaben, ist das Domänenwissen

Im Kern geht es immer darum, Aufgaben zu lösen. Welche Aufgaben in einem Betrieb anfallen, wie sie
richtig gestellt sind und was als gelöst gilt — das ist das Domänenwissen, und das steckt bei kleinen
Firmen im Kopf von ein, zwei Menschen. Der Mensch muss die Probleme und die gewünschte Art der Lösung gut
formulieren können. Das ist Arbeit und bleibt Arbeit; kein Werkzeug nimmt sie ab.

Der schwerste Teil ist aber nicht die Formulierung selbst, sondern sie **im Kontext zu halten**:
angereichert mit dem, was dazugehört, verknüpft mit dem, was davon abhängt, und zwar so, dass das Modell
genug Grundlage hat, eine komplexe Aufgabe **ohne Annahmen und ohne Rückfragen** zu lösen. Jede Annahme
ist eine Stelle, an der das Ergebnis still falsch werden kann. Jede Rückfrage ist Zeit des Menschen, die
das Werkzeug eigentlich sparen sollte.

## 4. Kontext halten, ohne dass er verfault

Mehr Kontext ist nicht besser. Zu viel davon verschlechtert das Ergebnis — der Fachbegriff dafür ist
Context Rot. Es gilt also nicht, alles bereitzustellen, was es gibt, sondern **genau
das, was die Aufgabe braucht**, in guter Qualität, ohne Ballast. Das ist Kontext-Handling, und es ist bis
heute Handarbeit: entscheiden, was hineingehört, was veraltet ist, was mit wem verknüpft werden muss.

Dass es Handarbeit ist, erklärt, warum es für die meisten Betriebe nicht stattfindet. Und es erklärt den
strukturellen Vorteil, mit dem Delta Weave startet: eine Person, mehrere Projekte. Der gesamte relevante
Kontext kann aus einer Hand kommen; es gibt keine zweite oder dritte Quelle, die widerspricht, nachhinkt
oder fehlt. Das macht den eigenen Betrieb zum besten ersten Labor — und markiert zugleich die Grenze,
hinter der die Methode auf andere Firmen übertragen werden muss, bei denen das nicht gilt.

## 5. Drei Arbeitsweisen, nicht eine

Nicht jede Aufgabe verdient denselben Aufwand. Es sind drei Arbeitsweisen zu unterscheiden:

**Einmalaufgaben** werden im Chat gestellt und dort beantwortet. So wie heute. Dafür braucht es keine
Prozessdefinition und keinen Fallzustand; wer sie dafür einführt, erzeugt Bürokratie statt sie zu lösen.

**Komplexe Aufgaben, insbesondere Bürokratie-Aufträge,** laufen **über Dokumente**. Der Mensch erteilt den
Auftrag, der Agent erzeugt Dokumente, und die Arbeit geht an diesen Dokumenten weiter. Das ist kein
Zufall der Technik, sondern Nachbildung dessen, wie Bürokratie unter Menschen funktioniert: Ein Dokument
wird an die nächste zuständige Stelle weitergegeben und dort als Dokument bewertet — nicht als
Gesprächsverlauf. Das Dokument trägt den Zustand, nicht der Chat.

**Wiederkehrende Abläufe innerhalb der Firma** bekommen eine eigene Oberfläche: eine Website oder eine
Anwendung, in der das Ergebnis dargestellt wird. Das ist der Punkt, an dem aus einer Arbeitsweise ein
Produkt werden kann.

## 6. Der Core Loop

Das Zusammenspiel aus §3 bis §5 ist der Core Loop: Der Mensch formuliert Aufgabe und Maßstab und hält den
Kontext kuratiert; der Agent löst die Aufgabe daraus heraus und legt das Ergebnis als Dokument ab; der
Mensch prüft am Dokument, nicht am Gespräch, und das Geprüfte wird wieder Kontext für die nächste
Aufgabe. Das Wort *Loop* bleibt — es ist die einzige Stelle, an der ein englisches Wort hier etwas
bezeichnet, was ein deutsches nicht so knapp trifft: Es ist eine Schleife, die mit jedem Durchlauf den
Kontext besser machen muss, sonst fault er (§4).

## 7. Deterministisches in die Anwendung, Urteil in den Harness

Für wiederkehrende Abläufe gilt eine klare Trennlinie. **Was deterministisch ablaufen soll — Abgleiche,
Berechnungen, Zustandsübergänge, Pflichtfelder, Freigabeprüfungen — gehört in die Anwendung**, wo es
jedes Mal gleich läuft und geprüft werden kann. **Was von der Intelligenz des Modells profitiert — Lesen,
Abwägen, Vorschlagen, Formulieren — bleibt im Harness.** Die Anwendung ruft den Harness für die Teile, die
Urteil brauchen, und hält alles andere selbst. Ein Modell, das eine Summe bildet, ist ein Fehler im
Entwurf; eine Anwendung, die eine Kundenmail deutet, ebenso.

## 8. Sehen, dass es gelöst ist

Die Oberfläche ist nicht zuerst Bedienung, sondern Prüfung. Sie ist „nur eine andere Art zu analysieren,
was du für eine Arbeit erledigt hast" — der Ort, an dem der Mensch **sieht**, dass das Problem tatsächlich
gelöst ist, statt es aus einem Gesprächsprotokoll herauszulesen. Deshalb gilt: Eine Oberfläche ist dann
richtig, wenn sie **exakt auf die Problemlösung zugeschnitten** ist. Eine generische Chat- oder
Dashboard-Ansicht erklärt nicht, ob der Fall stimmt; eine Ansicht, die genau die Nachweise, Entscheidungen
und Abweichungen dieses einen Ablaufs zeigt, tut es. Für den Menschen ist das die Sprache, in der er den
Agenten versteht.

## 9. Was daraus für die Evaluierung folgt

Drei Dinge verschieben sich gegenüber dem bisherigen Plan, ohne ihn aufzuheben:

Erstens wird **„ohne Annahmen und ohne Rückfragen"** zum Teil des Maßstabs. Ein Lauf, der zum richtigen
Ergebnis kommt, aber dafür zweimal fragen musste, hat gezeigt, dass der Kontext unvollständig war — das
ist ein Befund gegen den Kontext, nicht gegen das Modell, und gehört so ins Messprotokoll.

Zweitens ist **Kontextqualität selbst Gegenstand der Messung**. Der A/B-Vergleich (ohne Kontext gegen
freigegebenen Kontext) prüft bisher, ob Kontext die Aktion ändert. Er prüft noch nicht, ob *weniger,
besserer* Kontext dasselbe leistet wie der volle Fallkontext. Das ist die Frage aus §4, und sie ist offen.

Drittens ist die **Oberfläche Prüfmittel, nicht Ausbaustufe**. Wenn der Mensch nur an einer passgenauen
Ansicht sieht, ob der Fall stimmt, dann gehört eine solche Ansicht — und sei es die einfachste denkbare —
in die Evaluierung, nicht erst in ein späteres Produkt.

Alles Weitere — Markt, Ersetzbarkeit, Kandidaten, Meilensteine — steht in
[`product-plan.md`](product-plan.md) und [`prototype-plan.md`](prototype-plan.md) und wird von diesem
Manifest nicht wiederholt.
