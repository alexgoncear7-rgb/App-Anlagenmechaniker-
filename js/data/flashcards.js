// Lernkarten: Frage (q) und Antwort (a), zugeordnet zu einer Kategorie (cat).
// Jede Karte braucht eine eindeutige, stabile id – daran hängt der Lernfortschritt.
export const FLASHCARDS = [
  // ---------- Trinkwasser ----------
  {
    id: 'tw-01', cat: 'trinkwasser',
    q: 'Welche Temperatur soll Trinkwasser kalt (PWC) nicht überschreiten?',
    a: '25 °C. Darüber steigt das Risiko für Keimwachstum (z. B. Legionellen). Kaltwasserleitungen deshalb nicht neben warmen Leitungen ohne Dämmung verlegen.',
  },
  {
    id: 'tw-02', cat: 'trinkwasser',
    q: 'Welche Temperaturen fordert das DVGW-Arbeitsblatt W 551 für Trinkwasser warm?',
    a: 'Am Austritt des Trinkwassererwärmers mindestens 60 °C, im Zirkulationsrücklauf mindestens 55 °C. Die Temperaturdifferenz im System darf höchstens 5 K betragen.',
  },
  {
    id: 'tw-03', cat: 'trinkwasser',
    q: 'Wann gilt eine Trinkwasser-Erwärmungsanlage als Großanlage (W 551)?',
    a: 'Wenn der Trinkwassererwärmer mehr als 400 Liter fasst und/oder mehr als 3 Liter in einer Rohrleitung zwischen Abgang Trinkwassererwärmer und Entnahmestelle stehen (ohne Zirkulationsleitung).',
  },
  {
    id: 'tw-04', cat: 'trinkwasser',
    q: 'In welchem Temperaturbereich vermehren sich Legionellen besonders stark?',
    a: 'Etwa zwischen 25 °C und 45 °C. Ab etwa 60 °C werden sie abgetötet, bei 70 °C sehr schnell.',
  },
  {
    id: 'tw-05', cat: 'trinkwasser',
    q: 'Welche Norm regelt den Schutz des Trinkwassers vor Verunreinigungen durch Rückfließen?',
    a: 'DIN EN 1717 (mit DIN 1988-100). Sie teilt Flüssigkeiten in die Kategorien 1 bis 5 ein und ordnet passende Sicherungseinrichtungen zu.',
  },
  {
    id: 'tw-06', cat: 'trinkwasser',
    q: 'Was bedeuten die Flüssigkeitskategorien 1 bis 5 nach DIN EN 1717?',
    a: '1: Trinkwasser direkt aus der Trinkwasser-Installation.\n2: Keine Gesundheitsgefährdung, aber Geschmack, Geruch, Farbe oder Temperatur verändert.\n3: Gesundheitsgefährdung durch einen oder mehrere weniger giftige Stoffe.\n4: Gesundheitsgefährdung durch giftige oder sehr giftige Stoffe.\n5: Gesundheitsgefährdung durch Mikroorganismen oder Viren.',
  },
  {
    id: 'tw-07', cat: 'trinkwasser',
    q: 'Welche Sicherungseinrichtung schützt bis einschließlich Flüssigkeitskategorie 5?',
    a: 'Der freie Auslauf (z. B. Typ AA). Zwischen Wasserspiegel und Auslauf besteht eine Luftstrecke, sodass kein Rückfließen möglich ist.',
  },

  // ---------- Heizung ----------
  {
    id: 'hz-01', cat: 'heizung',
    q: 'Welchen Ansprechdruck hat das Sicherheitsventil einer typischen Heizungsanlage im Einfamilienhaus?',
    a: 'In der Regel 3 bar. Das Sicherheitsventil schützt den Wärmeerzeuger vor unzulässigem Überdruck.',
  },
  {
    id: 'hz-02', cat: 'heizung',
    q: 'Wie wird der Vordruck eines Membran-Ausdehnungsgefäßes (MAG) überschlägig bestimmt?',
    a: 'Statischer Druck plus Zuschlag: p₀ ≈ Anlagenhöhe über MAG in m ÷ 10 + 0,2 bar. Beispiel: 8 m Höhe → 0,8 bar + 0,2 bar = 1,0 bar.',
  },
  {
    id: 'hz-03', cat: 'heizung',
    q: 'Um wie viel Prozent dehnt sich Wasser beim Erwärmen von 10 °C auf 90 °C ungefähr aus?',
    a: 'Um etwa 3,6 %. Diese Volumenzunahme muss das Ausdehnungsgefäß aufnehmen.',
  },
  {
    id: 'hz-04', cat: 'heizung',
    q: 'Wie groß ist die spezifische Wärmekapazität von Wasser?',
    a: 'c ≈ 4,19 kJ/(kg·K) bzw. 1,163 Wh/(kg·K). Damit gilt: Q = m · c · Δϑ.',
  },
  {
    id: 'hz-05', cat: 'heizung',
    q: 'Was ist der Unterschied zwischen Heizwert (Hi) und Brennwert (Hs)?',
    a: 'Der Brennwert enthält zusätzlich die Kondensationswärme des Wasserdampfs im Abgas. Bei Erdgas ist Hs etwa 11 % größer als Hi. Brennwertgeräte nutzen diese Wärme, indem sie das Abgas unter den Taupunkt abkühlen.',
  },
  {
    id: 'hz-06', cat: 'heizung',
    q: 'Bei welcher Abgastemperatur kondensiert der Wasserdampf im Abgas von Erdgas ungefähr?',
    a: 'Der Taupunkt liegt bei etwa 55 °C. Deshalb sind niedrige Rücklauftemperaturen für Brennwertgeräte wichtig.',
  },
  {
    id: 'hz-07', cat: 'heizung',
    q: 'Was versteht man unter hydraulischem Abgleich?',
    a: 'Die Einstellung der Volumenströme (z. B. über voreinstellbare Thermostatventile), damit jeder Heizkörper genau die Wassermenge erhält, die er für seine Heizlast braucht. Folge: gleichmäßige Wärmeverteilung, weniger Pumpenstrom, keine Strömungsgeräusche.',
  },
  {
    id: 'hz-08', cat: 'heizung',
    q: 'Nach welcher Norm wird die Heizlast eines Gebäudes berechnet?',
    a: 'Nach DIN EN 12831 (mit nationalem Beiblatt). Die Heizlast setzt sich aus Transmissions- und Lüftungswärmeverlusten zusammen.',
  },
  {
    id: 'hz-09', cat: 'heizung',
    q: 'Was gibt die Jahresarbeitszahl (JAZ) einer Wärmepumpe an?',
    a: 'Das Verhältnis der über ein Jahr abgegebenen Heizwärme zur aufgenommenen elektrischen Energie. Der COP beschreibt dagegen nur einen einzelnen Betriebspunkt unter Prüfbedingungen.',
  },
  {
    id: 'hz-10', cat: 'heizung',
    q: 'Was bedeutet „Spreizung“ in einer Heizungsanlage?',
    a: 'Die Temperaturdifferenz zwischen Vorlauf und Rücklauf, z. B. 55/45 °C → Spreizung 10 K.',
  },

  // ---------- Gas ----------
  {
    id: 'gs-01', cat: 'gas',
    q: 'Welches Regelwerk gilt für Gasinstallationen in Gebäuden (Niederdruck)?',
    a: 'Die TRGI – Technische Regel für Gasinstallationen (DVGW-Arbeitsblatt G 600).',
  },
  {
    id: 'gs-02', cat: 'gas',
    q: 'Wie werden neue Niederdruck-Gasleitungen nach TRGI vor Inbetriebnahme geprüft?',
    a: '1. Belastungsprüfung: mit Luft oder inertem Gas bei 1 bar, Prüfdauer 10 Minuten (ohne Armaturen/Geräte).\n2. Dichtheitsprüfung: mit 150 mbar; Anpassungs- und Prüfzeit richten sich nach dem Leitungsvolumen (unter 100 l je 10 Minuten).',
  },
  {
    id: 'gs-03', cat: 'gas',
    q: 'Warum ist Flüssiggas (Propan) gefährlicher in Kellerräumen als Erdgas?',
    a: 'Flüssiggas ist schwerer als Luft und sammelt sich am Boden bzw. in tiefer liegenden Räumen. Erdgas ist leichter als Luft und steigt nach oben.',
  },
  {
    id: 'gs-04', cat: 'gas',
    q: 'Welcher Anschlussdruck (Nennwert) liegt bei Erdgas bzw. Flüssiggas am Gasgerät an?',
    a: 'Erdgas: 20 mbar. Flüssiggas: 50 mbar (in Deutschland üblich).',
  },
  {
    id: 'gs-05', cat: 'gas',
    q: 'Was ist eine TAE und wann löst sie aus?',
    a: 'Eine thermisch auslösende Absperreinrichtung. Sie sperrt die Gaszufuhr bei einem Brand automatisch ab, sobald etwa 100 °C erreicht werden.',
  },
  {
    id: 'gs-06', cat: 'gas',
    q: 'Wozu dient ein Gasströmungswächter (GS)?',
    a: 'Er schließt automatisch, wenn der Gasdurchfluss einen festgelegten Wert überschreitet, z. B. bei einem Leitungsbruch oder bei Manipulation.',
  },
  {
    id: 'gs-07', cat: 'gas',
    q: 'In welchem Bereich liegen die Explosionsgrenzen von Methan (Erdgas) in Luft?',
    a: 'Etwa zwischen 4,4 und 17 Vol.-%. Unterhalb ist das Gemisch zu mager, oberhalb zu fett zum Zünden.',
  },

  // ---------- Abwasser ----------
  {
    id: 'aw-01', cat: 'abwasser',
    q: 'Wie hoch muss die Sperrwasserhöhe eines Geruchverschlusses mindestens sein?',
    a: '50 mm. Sie verhindert, dass Kanalgase in den Raum gelangen.',
  },
  {
    id: 'aw-02', cat: 'abwasser',
    q: 'Was ist die Rückstauebene und wo liegt sie meistens?',
    a: 'Die höchste Ebene, bis zu der das Abwasser in der Entwässerungsanlage ansteigen kann. Meist ist das die Straßenoberkante an der Anschlussstelle. Entwässerungsgegenstände darunter brauchen eine Hebeanlage oder einen Rückstauverschluss.',
  },
  {
    id: 'aw-03', cat: 'abwasser',
    q: 'Welche Grenzen gelten für unbelüftete Einzelanschlussleitungen (DIN 1986-100)?',
    a: 'Länge höchstens 4 m, Höhenunterschied höchstens 1 m, höchstens drei 90°-Umlenkungen (ohne Anschlussbogen).',
  },
  {
    id: 'aw-04', cat: 'abwasser',
    q: 'Welches Mindestgefälle haben unbelüftete Einzelanschlussleitungen?',
    a: '1 cm/m (1 %).',
  },
  {
    id: 'aw-05', cat: 'abwasser',
    q: 'Wozu dient die Hauptlüftung einer Entwässerungsanlage?',
    a: 'Sie führt die Fallleitung über Dach und sorgt für Druckausgleich. Damit werden Geruchverschlüsse nicht leergesaugt oder herausgedrückt, und Kanalgase werden abgeführt.',
  },
  {
    id: 'aw-06', cat: 'abwasser',
    q: 'Wann wird ein Fettabscheider benötigt?',
    a: 'Wenn fetthaltiges Abwasser anfällt, z. B. in Großküchen, Restaurants oder Metzgereien. Geregelt in DIN EN 1825 und DIN 4040-100.',
  },

  // ---------- Werkstoffe & Verbindungen ----------
  {
    id: 'ws-01', cat: 'werkstoffe',
    q: 'Wo liegt die Temperaturgrenze zwischen Weichlöten und Hartlöten?',
    a: 'Bei 450 °C. Weichlöten liegt darunter, Hartlöten darüber.',
  },
  {
    id: 'ws-02', cat: 'werkstoffe',
    q: 'Bis zu welchem Außendurchmesser ist Hartlöten von Kupferrohren in der Trinkwasser-Installation nicht zulässig?',
    a: 'Bis einschließlich 28 mm. Dort wird weichgelötet oder gepresst.',
  },
  {
    id: 'ws-03', cat: 'werkstoffe',
    q: 'Was besagt die Fließregel bei Mischinstallationen?',
    a: 'In Fließrichtung darf kein unedleres Metall (z. B. verzinkter Stahl) nach einem edleren Metall (z. B. Kupfer) eingebaut werden. Sonst gelangen Kupferionen ins Wasser und verursachen Lochkorrosion am verzinkten Stahl.',
  },
  {
    id: 'ws-04', cat: 'werkstoffe',
    q: 'Wie berechnet man die Längenänderung einer Rohrleitung?',
    a: 'Δl = l₀ · α · Δϑ\nl₀ = Ausgangslänge, α = Längenausdehnungskoeffizient, Δϑ = Temperaturänderung.',
  },
  {
    id: 'ws-05', cat: 'werkstoffe',
    q: 'Welcher Rohrwerkstoff dehnt sich bei Erwärmung am stärksten aus: Stahl, Kupfer oder PE-X?',
    a: 'PE-X (ca. 0,15–0,2 mm/(m·K)). Kupfer liegt bei ca. 0,017 mm/(m·K), Stahl bei ca. 0,012 mm/(m·K).',
  },
  {
    id: 'ws-06', cat: 'werkstoffe',
    q: 'Wozu dient die „unverpresst undicht“-Funktion bei Pressfittings?',
    a: 'Ein versehentlich nicht verpresster Fitting wird bei der Druckprüfung sofort durch Undichtheit erkannt.',
  },

  // ---------- Physik & Elektro ----------
  {
    id: 'gl-01', cat: 'grundlagen',
    q: 'Wie viel Pascal und wie viel Meter Wassersäule entspricht 1 bar?',
    a: '1 bar = 100 000 Pa = 1 000 hPa ≈ 10 m Wassersäule (genau ca. 10,2 m).',
  },
  {
    id: 'gl-02', cat: 'grundlagen',
    q: 'Wie lautet das ohmsche Gesetz und die Formel für die elektrische Leistung?',
    a: 'U = R · I und P = U · I (bei ohmscher Last).',
  },
  {
    id: 'gl-03', cat: 'grundlagen',
    q: 'Welche Farben haben Schutzleiter und Neutralleiter?',
    a: 'Schutzleiter (PE): grün-gelb. Neutralleiter (N): blau.',
  },
  {
    id: 'gl-04', cat: 'grundlagen',
    q: 'Warum werden metallene Rohrleitungen in den Schutzpotentialausgleich einbezogen?',
    a: 'Damit zwischen berührbaren leitfähigen Teilen keine gefährliche Berührungsspannung entstehen kann. Bei einem Fehler fließt der Strom über den Potentialausgleich ab.',
  },
  {
    id: 'gl-05', cat: 'grundlagen',
    q: 'Wie berechnet man den Volumenstrom aus Fließgeschwindigkeit und Querschnitt?',
    a: 'V̇ = A · v. A = Querschnittsfläche (π · d² / 4), v = Fließgeschwindigkeit.',
  },
];
