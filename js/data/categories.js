// Lernfelder / Themenbereiche der App
export const CATEGORIES = [
  { id: 'trinkwasser', name: 'Trinkwasser', icon: '💧' },
  { id: 'heizung', name: 'Heizung', icon: '🔥' },
  { id: 'gas', name: 'Gas', icon: '🟡' },
  { id: 'abwasser', name: 'Abwasser', icon: '🚽' },
  { id: 'werkstoffe', name: 'Werkstoffe & Verbindungen', icon: '🔧' },
  { id: 'grundlagen', name: 'Physik & Elektro', icon: '⚡' },
];

export function categoryById(id) {
  return CATEGORIES.find((c) => c.id === id);
}
