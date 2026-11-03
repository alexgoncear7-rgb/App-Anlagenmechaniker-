# SHK-Prüfungstrainer

Lern-App für die **Gesellenprüfung Teil 2 im Beruf Anlagenmechaniker/-in SHK**. Sie läuft als installierbare Web-App (PWA) im Browser auf Handy und PC und funktioniert nach dem ersten Öffnen auch offline.

## Funktionen

- **Start:** Countdown bis zur Prüfung, Lernserie, Lernstand und „Weiterlernen“ mit 15 Fragen. Fehler und markierte Fragen lassen sich gezielt wiederholen.
- **Themen:** Bereiche laut Orientierungshilfe, also Projekt 1 bis 3, Einsatzgebiet 4.1 und Wirtschafts- und Sozialkunde, dazu Zusatzwissen.
- **Rechnen:** Rechenaufgaben, deren Zahlen jedes Mal neu erzeugt werden. Zu jeder Aufgabe gibt es Formel und Lösungsweg.
- **Tabellen:** Nachschlagewerk mit
  - Kupferrohren, Gewinderohren und Rohrgewinden
  - Rohrkennzeichnung nach DIN 2403, Ausdehnungskoeffizienten, Einheiten und Formeln
  - Rechnern für Längenänderung, Wasserinhalt (mit Hinweis auf die 3-Liter-Regel) und Heizungs-Volumenstrom
- **Prüfung:** Prüfungssimulation mit Uhr und Note. Richtig gibt 5 Punkte, falsch 0.
- **Statistik:** Fortschritt nach Bereich, Ergebnisse der Rechenaufgaben und der Prüfungen.

Der Lernstand wird nur im Browser gespeichert (`localStorage`). Es gibt kein Konto und keinen Server.

## Starten

Die ganze App steckt in einer Datei, `index.html`. Du brauchst nur einen statischen Webserver:

```bash
npm start          # startet python3 -m http.server 8080
# danach http://localhost:8080 öffnen
```

Damit Nutzer nach einer Änderung an `index.html` die neue Version laden, erhöhst du `CACHE_VERSION` in `sw.js`.

## Inhalte erweitern

Alle Inhalte stehen im `<script>`-Teil von `index.html`:

| Was | Wo |
| --- | --- |
| Fragen (Multiple Choice) | Listen `EXTRA`, `FACH`, `MORE`, `MORE2`, `ORIENT_MC`. Format: `M(nummer, thema, frage, [antworten], index_richtig, erklärung)` |
| Themennamen und Bereiche | `NAMES`, `GROUPS_O` |
| Rechenaufgaben | `CALC` mit einer Funktion `gen()` je Aufgabentyp |
| Tabellen und Rechner | `REF` sowie die Daten `REF_CU`, `REF_ST`, `REF_THR`, `REF_COL`, `REF_ALPHA`, `REF_UNITS`, `REF_FX` |
| Prüfungsdatum | `EXAM_DATE` |

Jede Frage braucht eine eindeutige Nummer, weil der Lernfortschritt daran gespeichert wird.

> Alle Angaben ohne Gewähr. Maßgeblich sind die jeweils gültigen Normen, Regelwerke und Herstellerangaben.
