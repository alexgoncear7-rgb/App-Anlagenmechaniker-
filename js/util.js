/** Maskiert Text für die sichere Ausgabe in HTML. */
export function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/** Zahl im deutschen Format, z. B. 0,133. */
export function num(value, digits = 2) {
  return Number(value).toLocaleString('de-DE', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}
