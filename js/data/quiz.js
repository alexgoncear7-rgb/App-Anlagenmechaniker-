// Quizfragen (Multiple Choice). `correct` ist der Index der richtigen Antwort in `options`.
// Die Antworten werden in der App gemischt angezeigt.
export const QUIZ = [
  // ---------- Trinkwasser ----------
  {
    id: 'q-tw-01', cat: 'trinkwasser',
    q: 'Welche Mindesttemperatur muss am Austritt des Trinkwassererwärmers einer Großanlage gehalten werden?',
    options: ['50 °C', '55 °C', '60 °C', '70 °C'], correct: 2,
    explain: 'Nach DVGW W 551 mindestens 60 °C am Austritt, im Zirkulationsrücklauf mindestens 55 °C.',
  },
  {
    id: 'q-tw-02', cat: 'trinkwasser',
    q: 'Welche Temperatur soll Trinkwasser kalt nicht überschreiten?',
    options: ['15 °C', '20 °C', '25 °C', '30 °C'], correct: 2,
    explain: 'Kaltwasser soll höchstens 25 °C erreichen, um Keimwachstum zu verhindern.',
  },
  {
    id: 'q-tw-03', cat: 'trinkwasser',
    q: 'Welche Flüssigkeitskategorie nach DIN EN 1717 beschreibt eine Gefährdung durch Mikroorganismen oder Viren?',
    options: ['Kategorie 2', 'Kategorie 3', 'Kategorie 4', 'Kategorie 5'], correct: 3,
    explain: 'Kategorie 5 ist die höchste Kategorie: Gefährdung durch Mikroorganismen oder Viren.',
  },
  {
    id: 'q-tw-04', cat: 'trinkwasser',
    q: 'Welche Sicherungseinrichtung schützt bis Flüssigkeitskategorie 5?',
    options: ['Rückflussverhinderer Typ EA', 'Freier Auslauf Typ AA', 'Rohrbelüfter', 'Systemtrenner Typ CA'], correct: 1,
    explain: 'Der freie Auslauf trennt über eine Luftstrecke und ist bis Kategorie 5 zulässig.',
  },
  {
    id: 'q-tw-05', cat: 'trinkwasser',
    q: 'Ab welchem Speicherinhalt gilt ein Trinkwassererwärmer nach W 551 als Großanlage?',
    options: ['Mehr als 200 l', 'Mehr als 300 l', 'Mehr als 400 l', 'Mehr als 1000 l'], correct: 2,
    explain: 'Großanlage: Speicher über 400 l und/oder mehr als 3 l Leitungsinhalt bis zur Entnahmestelle.',
  },

  // ---------- Heizung ----------
  {
    id: 'q-hz-01', cat: 'heizung',
    q: 'Welchen Ansprechdruck hat das Sicherheitsventil einer typischen Heizungsanlage im Einfamilienhaus?',
    options: ['1,5 bar', '3 bar', '6 bar', '10 bar'], correct: 1,
    explain: 'Üblich sind 3 bar bei geschlossenen Heizungsanlagen im Einfamilienhaus.',
  },
  {
    id: 'q-hz-02', cat: 'heizung',
    q: 'Eine Anlage ist 12 m hoch (über MAG). Welcher MAG-Vordruck ergibt sich überschlägig?',
    options: ['1,0 bar', '1,2 bar', '1,4 bar', '2,0 bar'], correct: 2,
    explain: 'p₀ ≈ 12 m ÷ 10 + 0,2 bar = 1,4 bar.',
  },
  {
    id: 'q-hz-03', cat: 'heizung',
    q: 'Wie viel Wärme braucht man, um 100 kg Wasser um 10 K zu erwärmen?',
    options: ['ca. 0,116 kWh', 'ca. 1,16 kWh', 'ca. 11,6 kWh', 'ca. 41,9 kWh'], correct: 1,
    explain: 'Q = m · c · Δϑ = 100 kg · 1,163 Wh/(kg·K) · 10 K ≈ 1163 Wh ≈ 1,16 kWh.',
  },
  {
    id: 'q-hz-04', cat: 'heizung',
    q: 'Warum ist eine niedrige Rücklauftemperatur bei Brennwertgeräten wichtig?',
    options: [
      'Damit die Pumpe weniger Strom braucht',
      'Damit der Wasserdampf im Abgas kondensiert und die Kondensationswärme genutzt wird',
      'Damit das Sicherheitsventil nicht anspricht',
      'Damit der Schornstein nicht versottet',
    ], correct: 1,
    explain: 'Nur unter dem Taupunkt (ca. 55 °C bei Erdgas) kondensiert der Wasserdampf und gibt Wärme ab.',
  },
  {
    id: 'q-hz-05', cat: 'heizung',
    q: 'Nach welcher Norm wird die Heizlast berechnet?',
    options: ['DIN 1988-300', 'DIN EN 12831', 'DIN 1986-100', 'DIN EN 1717'], correct: 1,
    explain: 'DIN EN 12831 regelt die Heizlastberechnung.',
  },
  {
    id: 'q-hz-06', cat: 'heizung',
    q: 'Eine Heizung läuft mit 70/55 °C. Wie groß ist die Spreizung?',
    options: ['5 K', '10 K', '15 K', '125 K'], correct: 2,
    explain: 'Spreizung = Vorlauf − Rücklauf = 70 °C − 55 °C = 15 K.',
  },
  {
    id: 'q-hz-07', cat: 'heizung',
    q: 'Was beschreibt die Jahresarbeitszahl (JAZ) einer Wärmepumpe?',
    options: [
      'Die Leistungszahl bei A2/W35 auf dem Prüfstand',
      'Die Anzahl der Betriebsstunden pro Jahr',
      'Das Verhältnis von abgegebener Heizwärme zu aufgenommenem Strom über ein Jahr',
      'Die maximale Vorlauftemperatur',
    ], correct: 2,
    explain: 'Die JAZ bewertet den realen Betrieb über ein ganzes Jahr, der COP nur einen Prüfpunkt.',
  },

  // ---------- Gas ----------
  {
    id: 'q-gs-01', cat: 'gas',
    q: 'Mit welchem Druck wird die Dichtheitsprüfung einer neuen Niederdruck-Gasleitung nach TRGI durchgeführt?',
    options: ['20 mbar', '50 mbar', '150 mbar', '1 bar'], correct: 2,
    explain: 'Die Dichtheitsprüfung erfolgt mit 150 mbar, die Belastungsprüfung vorher mit 1 bar.',
  },
  {
    id: 'q-gs-02', cat: 'gas',
    q: 'Welcher Nenn-Anschlussdruck liegt bei Erdgas am Gerät an?',
    options: ['20 mbar', '50 mbar', '100 mbar', '1 bar'], correct: 0,
    explain: 'Erdgas: 20 mbar, Flüssiggas: 50 mbar.',
  },
  {
    id: 'q-gs-03', cat: 'gas',
    q: 'Bei welcher Temperatur löst eine thermisch auslösende Absperreinrichtung (TAE) etwa aus?',
    options: ['ca. 60 °C', 'ca. 100 °C', 'ca. 250 °C', 'ca. 600 °C'], correct: 1,
    explain: 'Die TAE sperrt bei einem Brand bei etwa 100 °C die Gaszufuhr ab.',
  },
  {
    id: 'q-gs-04', cat: 'gas',
    q: 'Welche Aussage über Flüssiggas (Propan) ist richtig?',
    options: [
      'Es ist leichter als Luft',
      'Es ist schwerer als Luft und sammelt sich am Boden',
      'Es ist genauso schwer wie Luft',
      'Es ist nicht brennbar',
    ], correct: 1,
    explain: 'Flüssiggas ist schwerer als Luft, deshalb gelten für Räume unter Erdgleiche besondere Anforderungen.',
  },
  {
    id: 'q-gs-05', cat: 'gas',
    q: 'Welches Regelwerk ist für Erdgas-Installationen in Gebäuden maßgeblich?',
    options: ['TRGI (DVGW G 600)', 'DIN 1988-200', 'DIN 1986-100', 'VDI 6023'], correct: 0,
    explain: 'Die TRGI (DVGW-Arbeitsblatt G 600) regelt Gasinstallationen in Gebäuden.',
  },

  // ---------- Abwasser ----------
  {
    id: 'q-aw-01', cat: 'abwasser',
    q: 'Welche Sperrwasserhöhe muss ein Geruchverschluss mindestens haben?',
    options: ['20 mm', '35 mm', '50 mm', '100 mm'], correct: 2,
    explain: 'Die Mindest-Sperrwasserhöhe beträgt 50 mm.',
  },
  {
    id: 'q-aw-02', cat: 'abwasser',
    q: 'Wo liegt die Rückstauebene in der Regel?',
    options: ['Kellerfußboden', 'Straßenoberkante an der Anschlussstelle', 'Oberkante Erdgeschoss', 'Sohle des Kanals'], correct: 1,
    explain: 'Meist legt die Gemeinde die Straßenoberkante an der Anschlussstelle als Rückstauebene fest.',
  },
  {
    id: 'q-aw-03', cat: 'abwasser',
    q: 'Wie lang darf eine unbelüftete Einzelanschlussleitung höchstens sein?',
    options: ['2 m', '4 m', '6 m', '10 m'], correct: 1,
    explain: 'Höchstens 4 m Länge, 1 m Höhenunterschied und drei 90°-Umlenkungen.',
  },
  {
    id: 'q-aw-04', cat: 'abwasser',
    q: 'Wozu dient die Hauptlüftung über Dach?',
    options: [
      'Zur Kühlung des Abwassers',
      'Zum Druckausgleich, damit Geruchverschlüsse nicht leergesaugt werden',
      'Zur Erhöhung des Gefälles',
      'Zur Ableitung von Regenwasser',
    ], correct: 1,
    explain: 'Die Lüftung verhindert Über- und Unterdruck in der Anlage und führt Kanalgase ab.',
  },

  // ---------- Werkstoffe & Verbindungen ----------
  {
    id: 'q-ws-01', cat: 'werkstoffe',
    q: 'Ab welcher Temperatur spricht man von Hartlöten?',
    options: ['Über 250 °C', 'Über 450 °C', 'Über 650 °C', 'Über 900 °C'], correct: 1,
    explain: 'Die Grenze zwischen Weich- und Hartlöten liegt bei 450 °C.',
  },
  {
    id: 'q-ws-02', cat: 'werkstoffe',
    q: 'Welche Reihenfolge verstößt in Fließrichtung gegen die Fließregel?',
    options: [
      'Verzinkter Stahl → Kupfer',
      'Kupfer → verzinkter Stahl',
      'Edelstahl → Kupfer',
      'Kunststoff → Kupfer',
    ], correct: 1,
    explain: 'Kupferionen aus dem Kupferrohr verursachen am nachfolgenden verzinkten Stahl Lochkorrosion.',
  },
  {
    id: 'q-ws-03', cat: 'werkstoffe',
    q: 'Ein 10 m langes Kupferrohr (α = 0,0168 mm/(m·K)) wird von 10 °C auf 60 °C erwärmt. Wie groß ist die Längenänderung?',
    options: ['ca. 0,84 mm', 'ca. 8,4 mm', 'ca. 16,8 mm', 'ca. 84 mm'], correct: 1,
    explain: 'Δl = 10 m · 0,0168 mm/(m·K) · 50 K = 8,4 mm.',
  },
  {
    id: 'q-ws-04', cat: 'werkstoffe',
    q: 'Bis zu welchem Außendurchmesser dürfen Kupferrohre in der Trinkwasser-Installation nicht hartgelötet werden?',
    options: ['bis 15 mm', 'bis 22 mm', 'bis 28 mm', 'bis 54 mm'], correct: 2,
    explain: 'Hartlöten ist bis einschließlich 28 mm in Trinkwasser-Installationen nicht zulässig.',
  },

  // ---------- Physik & Elektro ----------
  {
    id: 'q-gl-01', cat: 'grundlagen',
    q: 'Wie viel Meter Wassersäule entsprechen ungefähr 1 bar?',
    options: ['1 m', '10 m', '100 m', '0,1 m'], correct: 1,
    explain: '1 bar ≈ 10 m Wassersäule (genau ca. 10,2 m).',
  },
  {
    id: 'q-gl-02', cat: 'grundlagen',
    q: 'Ein Heizstab nimmt bei 230 V einen Strom von 8,7 A auf. Wie groß ist die Leistung ungefähr?',
    options: ['ca. 200 W', 'ca. 1 kW', 'ca. 2 kW', 'ca. 26 kW'], correct: 2,
    explain: 'P = U · I = 230 V · 8,7 A ≈ 2001 W ≈ 2 kW.',
  },
  {
    id: 'q-gl-03', cat: 'grundlagen',
    q: 'Welche Farbe hat der Schutzleiter (PE)?',
    options: ['Blau', 'Braun', 'Schwarz', 'Grün-gelb'], correct: 3,
    explain: 'Der Schutzleiter ist grün-gelb, der Neutralleiter blau.',
  },
  {
    id: 'q-gl-04', cat: 'grundlagen',
    q: 'Wie berechnet man die Querschnittsfläche eines Rohres mit Innendurchmesser d?',
    options: ['A = π · d', 'A = π · d² / 4', 'A = d² · 4 / π', 'A = 2 · π · d'], correct: 1,
    explain: 'Kreisfläche: A = π · d² / 4 (oder π · r²).',
  },
];
