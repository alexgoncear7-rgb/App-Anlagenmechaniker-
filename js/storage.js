// Speichert Lernstand lokal im Browser. Fehler (z. B. privater Modus) werden abgefangen,
// die App funktioniert dann ohne Speicherung weiter.
const PREFIX = 'shk-app:';

export function load(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function save(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* Speicherung nicht möglich – ignorieren */
  }
}

export function clearAll() {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => localStorage.removeItem(k));
  } catch {
    /* ignorieren */
  }
}
