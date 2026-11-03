// Nachschlagewerk – Tabellenwerte für die Praxis.
// Angaben ohne Gewähr. Maßgeblich sind die jeweils gültigen Normen und Herstellerangaben.

/** Wasserinhalt in Litern pro Meter aus dem Innendurchmesser in mm. */
export function litersPerMeter(innerDiameterMm) {
  return (Math.PI / 4) * innerDiameterMm ** 2 / 1000;
}

// Kupferrohre nach DIN EN 1057 (gängige Abmessungen in der Haustechnik)
export const COPPER_PIPES = [
  { od: 12, wall: 1 },
  { od: 15, wall: 1 },
  { od: 18, wall: 1 },
  { od: 22, wall: 1 },
  { od: 28, wall: 1.5 },
  { od: 35, wall: 1.5 },
  { od: 42, wall: 1.5 },
  { od: 54, wall: 2 },
  { od: 64, wall: 2 },
  { od: 76.1, wall: 2 },
  { od: 88.9, wall: 2 },
  { od: 108, wall: 2.5 },
].map((p) => ({ ...p, id: +(p.od - 2 * p.wall).toFixed(1) }));

// Gewinderohre nach DIN EN 10255, mittlere Reihe (früher DIN 2440)
export const STEEL_PIPES = [
  { dn: 6, inch: '1/8', od: 10.2, wall: 2.0 },
  { dn: 8, inch: '1/4', od: 13.5, wall: 2.3 },
  { dn: 10, inch: '3/8', od: 17.2, wall: 2.3 },
  { dn: 15, inch: '1/2', od: 21.3, wall: 2.6 },
  { dn: 20, inch: '3/4', od: 26.9, wall: 2.6 },
  { dn: 25, inch: '1', od: 33.7, wall: 3.2 },
  { dn: 32, inch: '1 1/4', od: 42.4, wall: 3.2 },
  { dn: 40, inch: '1 1/2', od: 48.3, wall: 3.2 },
  { dn: 50, inch: '2', od: 60.3, wall: 3.6 },
  { dn: 65, inch: '2 1/2', od: 76.1, wall: 3.6 },
  { dn: 80, inch: '3', od: 88.9, wall: 4.0 },
  { dn: 100, inch: '4', od: 114.3, wall: 4.5 },
].map((p) => ({ ...p, id: +(p.od - 2 * p.wall).toFixed(1) }));

// Whitworth-Rohrgewinde (ISO 228 / ISO 7, EN 10226): Außendurchmesser und Gangzahl
export const PIPE_THREADS = [
  { size: '1/8', od: 9.728, tpi: 28 },
  { size: '1/4', od: 13.157, tpi: 19 },
  { size: '3/8', od: 16.662, tpi: 19 },
  { size: '1/2', od: 20.955, tpi: 14 },
  { size: '3/4', od: 26.441, tpi: 14 },
  { size: '1', od: 33.249, tpi: 11 },
  { size: '1 1/4', od: 41.910, tpi: 11 },
  { size: '1 1/2', od: 47.803, tpi: 11 },
  { size: '2', od: 59.614, tpi: 11 },
  { size: '2 1/2', od: 75.184, tpi: 11 },
  { size: '3', od: 87.884, tpi: 11 },
  { size: '4', od: 113.030, tpi: 11 },
].map((t) => ({ ...t, pitch: +(25.4 / t.tpi).toFixed(3) }));

// Kennzeichnung von Rohrleitungen nach dem Durchflussstoff (DIN 2403)
export const PIPE_COLORS = [
  { group: 1, medium: 'Wasser', color: 'Grün', hex: '#237f52' },
  { group: 2, medium: 'Wasserdampf', color: 'Rot', hex: '#a72920' },
  { group: 3, medium: 'Luft', color: 'Grau', hex: '#9b9b9b' },
  { group: 4, medium: 'Brennbare Gase', color: 'Gelb (Zusatzfarbe Rot)', hex: '#f6b600', extra: '#a72920' },
  { group: 5, medium: 'Nicht brennbare Gase', color: 'Gelb (Zusatzfarbe Schwarz)', hex: '#f6b600', extra: '#0e0e10' },
  { group: 6, medium: 'Säuren', color: 'Orange', hex: '#d05d28' },
  { group: 7, medium: 'Laugen', color: 'Violett', hex: '#904684' },
  { group: 8, medium: 'Brennbare Flüssigkeiten', color: 'Braun (Zusatzfarbe Rot)', hex: '#9c6b30', extra: '#a72920' },
  { group: 9, medium: 'Nicht brennbare Flüssigkeiten', color: 'Braun (Zusatzfarbe Schwarz)', hex: '#9c6b30', extra: '#0e0e10' },
  { group: 0, medium: 'Sauerstoff', color: 'Blau', hex: '#1e5a9a' },
];

// Längenausdehnungskoeffizienten α in mm/(m·K) – Richtwerte
export const EXPANSION = [
  { material: 'Stahl', alpha: 0.012 },
  { material: 'Edelstahl', alpha: 0.016 },
  { material: 'Kupfer', alpha: 0.0168 },
  { material: 'Mehrschichtverbundrohr (PE-X/Al/PE-X)', alpha: 0.025 },
  { material: 'PVC-U', alpha: 0.08 },
  { material: 'PP-R', alpha: 0.15 },
  { material: 'PE-X', alpha: 0.15 },
  { material: 'PE-HD', alpha: 0.2 },
];

// Häufige Einheiten-Umrechnungen
export const UNITS = [
  { from: '1 bar', to: '100 000 Pa = 1 000 hPa = 100 kPa' },
  { from: '1 bar', to: '≈ 10,2 m Wassersäule' },
  { from: '1 mbar', to: '100 Pa ≈ 10,2 mm WS' },
  { from: '1 kWh', to: '3 600 kJ = 3,6 MJ' },
  { from: '1 W', to: '1 J/s' },
  { from: '1 m³', to: '1 000 l' },
  { from: '1 l/s', to: '3,6 m³/h' },
  { from: '1 Zoll', to: '25,4 mm' },
  { from: '0 °C', to: '273,15 K' },
  { from: 'Temperaturdifferenz', to: '1 K = 1 °C (Differenz)' },
];

// Wichtige Formeln
export const FORMULAS = [
  { name: 'Wärmemenge', formula: 'Q = m · c · Δϑ', note: 'c(Wasser) ≈ 4,19 kJ/(kg·K) = 1,163 Wh/(kg·K)' },
  { name: 'Wärmeleistung (Wasser)', formula: 'Q̇ = ṁ · c · Δϑ', note: 'ṁ in kg/h, Q̇ in W mit c = 1,163 Wh/(kg·K)' },
  { name: 'Längenänderung', formula: 'Δl = l₀ · α · Δϑ', note: 'α in mm/(m·K), l₀ in m → Δl in mm' },
  { name: 'Volumenstrom', formula: 'V̇ = A · v', note: 'A = π · d² / 4' },
  { name: 'Hydrostatischer Druck', formula: 'p = ρ · g · h', note: 'Wasser: ca. 0,1 bar je Meter Höhe' },
  { name: 'Ohmsches Gesetz', formula: 'U = R · I', note: 'P = U · I' },
  { name: 'MAG-Vordruck (Überschlag)', formula: 'p₀ ≈ h / 10 + 0,2 bar', note: 'h = statische Höhe über MAG in m' },
];
