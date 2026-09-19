# Korpus: Nordwind Betriebstechnik

**Synthetisch — durchgehend erfunden.** Dieses Korpus ist kein Kunde, kein Angebot und keine
Geschichtsgrundlage. Firmierung, Namen, Beträge, Nummern und Termine sind erfunden und haben keine
Beziehung zu einem realen Delta-Weave-Kunden. Jeder Datensatz im Korpus trägt `synthetisch: true`, damit
ein einzelnes Ergebnisblatt auch ohne dieses Dokument als erfunden zu erkennen ist.

Der Korpus ist das Versuchsfeld für [`../docs/prototype-plan.md`](../docs/prototype-plan.md) §5.

## Die Firma

Nordwind Betriebstechnik, inhabergeführter B2B-Dienstleister, acht Personen, Projektgeschäft für
mittelständische Produktions- und Handwerksbetriebe. Software für Betriebs- und Wartungsprozesse.

| Rolle | Name im Korpus | Wofür sie Eigentümer ist |
|---|---|---|
| `rolle:inhaber` | Till Brakenhoff | Preise, Kulanz, verbindliche Zusagen |
| `rolle:projektleitung` | Sanne Köppen | Umfang, Termine, Abnahmeprotokolle |
| `rolle:entwicklung` | Reza Afshar | Zeiterfassung, technische Machbarkeit |
| `rolle:buchhaltung` | Marek Ebeling | Rechnungsstellung, Mahnwesen |

Rollen sind die Eigentümer, nicht die Personen: eine Freigabe bindet an die Rolle. Die Namen stehen nur
dafür, dass im Korpus ein Mensch erreichbar ist.

## Die zwei laufenden Kunden

| Kunde | Projekt | Auftragsdatum | Umfang | Termin | Satz | Bestellnummer |
|---|---|---|---|---|---|---|
| Kestenholt Metallbau GmbH | `PRJ-KEST-1` Maschinen-Dashboard | 2026-04-08 | Modul 1 + 2, 12 PT | 2026-11-13 | 145 €/h | 4711-Metall |
| Veldt & Söhne Haustechnik GmbH | `PRJ-VELD-1` Wartungsportal | 2026-05-19 | Portal inkl. Übernahme, 9 PT | 2026-10-30 | 138 €/h | 2026-118 |

## Dateien in diesem Ordner

`context/quellen/` die erfundenen Firmendokumente — sie sind die **Original-Stufe**.
`context/datensaetze/` die daraus extrahierten Kontextdatensätze — jeder verweist mit `source` auf eine
Quelle, und der Validator lehnt ab, wenn die Quelle nicht existiert.

Ein Fakt, der in keiner Quelle steht, existiert in diesem Korpus nicht. Das ist die Absicht: Der Harness
soll zeigen, dass er eine Lücke benennt, statt sie zu füllen.
