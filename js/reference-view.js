import {
  COPPER_PIPES, STEEL_PIPES, PIPE_THREADS, PIPE_COLORS, EXPANSION, UNITS, FORMULAS, litersPerMeter,
} from './data/reference.js';
import { esc, num } from './util.js';
import { lengthChange, waterVolume, heatingFlowRate } from './calc.js';

export const REFERENCE_SECTIONS = [
  { id: 'kupferrohr', icon: '🟠', title: 'Kupferrohre', subtitle: 'Maße & Wasserinhalt (DIN EN 1057)' },
  { id: 'stahlrohr', icon: '⚙️', title: 'Gewinderohre', subtitle: 'DN, Zoll & Maße (DIN EN 10255)' },
  { id: 'gewinde', icon: '🔩', title: 'Rohrgewinde', subtitle: 'Whitworth-Rohrgewinde' },
  { id: 'farben', icon: '🎨', title: 'Rohrkennzeichnung', subtitle: 'Farben nach DIN 2403' },
  { id: 'ausdehnung', icon: '↔️', title: 'Längenausdehnung', subtitle: 'Tabelle & Rechner' },
  { id: 'wasserinhalt', icon: '🪣', title: 'Wasserinhalt', subtitle: 'Rechner für Rohrleitungen' },
  { id: 'volumenstrom', icon: '🌡️', title: 'Heizungs-Volumenstrom', subtitle: 'Aus Leistung & Spreizung' },
  { id: 'einheiten', icon: '📐', title: 'Einheiten', subtitle: 'Umrechnungen' },
  { id: 'formeln', icon: '🧮', title: 'Formeln', subtitle: 'Wichtige Formeln' },
];

const table = (head, rows) => `
  <div class="table-wrap"><table>
    <thead><tr>${head.map(([label, cls]) => `<th class="${cls ?? ''}">${label}</th>`).join('')}</tr></thead>
    <tbody>${rows.map((r) => `<tr>${r.map(([v, cls]) => `<td class="${cls ?? ''}">${v}</td>`).join('')}</tr>`).join('')}</tbody>
  </table></div>`;

function pipeLabel(kind, p) {
  return kind === 'cu' ? `Cu ${num(p.od, p.od % 1 ? 1 : 0)} × ${num(p.wall, 1)}` : `DN ${p.dn} (${p.inch}″)`;
}

const renderers = {
  kupferrohr: () => table(
    [['Außen-Ø × Wand (mm)'], ['Innen-Ø mm', 'num'], ['Inhalt l/m', 'num']],
    COPPER_PIPES.map((p) => [[pipeLabel('cu', p)], [num(p.id, 1), 'num'], [num(litersPerMeter(p.id), 3), 'num']]),
  ),

  stahlrohr: () => table(
    [['DN'], ['Zoll'], ['Außen × Wand mm', 'num'], ['Innen-Ø mm', 'num'], ['Inhalt l/m', 'num']],
    STEEL_PIPES.map((p) => [[p.dn], [`${p.inch}″`], [`${num(p.od, 1)} × ${num(p.wall, 1)}`, 'num'], [num(p.id, 1), 'num'], [num(litersPerMeter(p.id), 3), 'num']]),
  ) + '<p class="notice">Mittlere Reihe (früher DIN 2440). Die Zollangabe bezeichnet die Nennweite, nicht den tatsächlichen Durchmesser.</p>',

  gewinde: () => table(
    [['Größe'], ['Außen-Ø mm', 'num'], ['Gänge/Zoll', 'num'], ['Steigung mm', 'num']],
    PIPE_THREADS.map((t) => [[`G/R ${t.size}`], [num(t.od, 3), 'num'], [t.tpi, 'num'], [num(t.pitch, 3), 'num']]),
  ) + '<p class="notice">G = zylindrisches Rohrgewinde (ISO 228), R/Rp = kegeliges bzw. zylindrisches Innengewinde für dichtende Verbindungen (EN 10226).</p>',

  farben: () => table(
    [['Gr.', 'num'], ['Durchflussstoff'], ['Farbe']],
    PIPE_COLORS.map((c) => [
      [c.group, 'num'], [esc(c.medium), 'wrap'],
      [`<span class="swatch" style="background:${c.hex}${c.extra ? `;box-shadow: inset -12px 0 0 ${c.extra}` : ''}" aria-hidden="true"></span> ${esc(c.color)}`, 'wrap'],
    ]),
  ),

  ausdehnung: (root) => {
    root.insertAdjacentHTML('beforeend', `
      ${table([['Werkstoff'], ['α in mm/(m·K)', 'num']], EXPANSION.map((e) => [[esc(e.material)], [num(e.alpha, e.alpha < 0.1 ? 4 : 2), 'num']]))}
      <h2>Rechner: Längenänderung</h2>
      <div class="card">
        <div class="form-grid">
          <label>Werkstoff<select id="mat">${EXPANSION.map((e, i) => `<option value="${i}">${esc(e.material)}</option>`).join('')}</select></label>
          <label>Rohrlänge in m<input id="len" type="number" inputmode="decimal" min="0" step="0.1" value="10"></label>
          <label>Temperaturänderung in K<input id="dt" type="number" inputmode="decimal" step="1" value="50"></label>
        </div>
        <div class="result" id="out" aria-live="polite"></div>
        <p class="muted">Δl = l₀ · α · Δϑ</p>
      </div>`);
    const update = () => {
      const e = EXPANSION[Number(root.querySelector('#mat').value)];
      const dl = lengthChange(parseNum(root.querySelector('#len').value), e.alpha, parseNum(root.querySelector('#dt').value));
      root.querySelector('#out').textContent = Number.isFinite(dl) ? `Δl = ${num(dl, 1)} mm` : 'Bitte gültige Werte eingeben';
    };
    bind(root, update);
    return '';
  },

  wasserinhalt: (root) => {
    const options = [
      ...COPPER_PIPES.map((p, i) => `<option value="cu-${i}">${pipeLabel('cu', p)}</option>`),
      ...STEEL_PIPES.map((p, i) => `<option value="st-${i}">Stahl ${pipeLabel('st', p)}</option>`),
    ].join('');
    root.insertAdjacentHTML('beforeend', `
      <div class="card">
        <div class="form-grid">
          <label>Rohr<select id="pipe">${options}</select></label>
          <label>Länge in m<input id="len" type="number" inputmode="decimal" min="0" step="0.5" value="10"></label>
        </div>
        <div class="result" id="out" aria-live="polite"></div>
        <p class="muted">Hilft z. B. beim Spülen, Befüllen oder bei der 3-Liter-Regel (W 551).</p>
      </div>`);
    const update = () => {
      const [kind, idx] = root.querySelector('#pipe').value.split('-');
      const pipe = (kind === 'cu' ? COPPER_PIPES : STEEL_PIPES)[Number(idx)];
      const v = waterVolume(pipe.id, parseNum(root.querySelector('#len').value));
      root.querySelector('#out').textContent = Number.isFinite(v)
        ? `${num(v, 2)} Liter${v > 3 ? ' (über 3 Liter!)' : ''}`
        : 'Bitte gültige Länge eingeben';
    };
    bind(root, update);
    return '';
  },

  volumenstrom: (root) => {
    root.insertAdjacentHTML('beforeend', `
      <div class="card">
        <div class="form-grid">
          <label>Wärmeleistung in kW<input id="kw" type="number" inputmode="decimal" min="0" step="0.1" value="10"></label>
          <label>Spreizung in K<input id="dt" type="number" inputmode="decimal" min="0" step="1" value="10"></label>
        </div>
        <div class="result" id="out" aria-live="polite"></div>
        <p class="muted">V̇ = Q̇ / (c · Δϑ) mit c = 1,163 Wh/(kg·K), Wasser ≈ 1 kg/l</p>
      </div>`);
    const update = () => {
      const lh = heatingFlowRate(parseNum(root.querySelector('#kw').value), parseNum(root.querySelector('#dt').value));
      root.querySelector('#out').textContent = Number.isFinite(lh)
        ? `${num(lh, 0)} l/h (${num(lh / 1000, 2)} m³/h)`
        : 'Bitte Werte größer 0 eingeben';
    };
    bind(root, update);
    return '';
  },

  einheiten: () => table([['Wert'], ['entspricht']], UNITS.map((u) => [[esc(u.from)], [esc(u.to)]])),

  formeln: () => FORMULAS.map((f) => `
    <div class="card"><h3>${esc(f.name)}</h3>
      <div style="font-size:20px;font-weight:600;margin:4px 0">${esc(f.formula)}</div>
      <div class="muted">${esc(f.note)}</div></div>`).join(''),
};

function parseNum(value) {
  return value.trim() === '' ? NaN : Number(value.replace(',', '.'));
}

function bind(root, update) {
  root.querySelectorAll('input, select').forEach((el) => el.addEventListener('input', update));
  update();
}

export function renderReference(section, root) {
  const html = renderers[section.id](root);
  if (html) root.insertAdjacentHTML('beforeend', html);
}
