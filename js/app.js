import { CATEGORIES, categoryById } from './data/categories.js';
import { FLASHCARDS } from './data/flashcards.js';
import { QUIZ } from './data/quiz.js';
import { rateCard, dueCards, boxStats, masteryPercent, buildQuiz, shuffle } from './learn.js';
import { load, save, clearAll } from './storage.js';
import { esc } from './util.js';
import { REFERENCE_SECTIONS, renderReference } from './reference-view.js';

const QUIZ_LENGTH = 10;
const view = document.getElementById('view');

// ---------- Hilfsfunktionen ----------
const getProgress = () => load('cards', {});
const getQuizHistory = () => load('quiz-history', []);

function cardsFor(catId) {
  return catId === 'alle' ? FLASHCARDS : FLASHCARDS.filter((c) => c.cat === catId);
}
function questionsFor(catId) {
  return catId === 'alle' ? QUIZ : QUIZ.filter((q) => q.cat === catId);
}
function catLabel(catId) {
  if (catId === 'alle') return 'Alle Themen';
  return categoryById(catId)?.name ?? 'Unbekannt';
}

function progressBar(percent) {
  return `<div class="progress" role="progressbar" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100"><div style="width:${percent}%"></div></div>`;
}

// ---------- Startseite ----------
function renderHome() {
  const progress = getProgress();
  const due = dueCards(FLASHCARDS, progress).length;
  const mastery = masteryPercent(FLASHCARDS, progress);
  const history = getQuizHistory();
  const last = history[0];

  view.innerHTML = `
    <h1>Moin! 👋</h1>
    <p class="muted">Dein Lernbegleiter für die Ausbildung zum Anlagenmechaniker SHK.</p>

    <div class="card">
      <div class="stat-row">
        <div class="stat"><div class="value">${due}</div><div class="label">Karten fällig</div></div>
        <div class="stat"><div class="value">${mastery}%</div><div class="label">sicher gelernt</div></div>
        <div class="stat"><div class="value">${last ? `${last.score}/${last.total}` : '–'}</div><div class="label">letztes Quiz</div></div>
      </div>
      ${progressBar(mastery)}
      <div class="btn-row">
        <a class="btn primary" href="#/karten/alle">Fällige Karten lernen</a>
        <a class="btn" href="#/quiz/alle">Schnell-Quiz</a>
      </div>
    </div>

    <h2>Themen</h2>
    <div class="grid">
      ${CATEGORIES.map((c) => {
        const cards = cardsFor(c.id);
        const pct = masteryPercent(cards, progress);
        return `<a class="tile" href="#/karten/${c.id}">
          <div class="icon" aria-hidden="true">${c.icon}</div>
          <div class="title">${esc(c.name)}</div>
          <div class="muted">${cards.length} Karten · ${pct}%</div>
          ${progressBar(pct)}
        </a>`;
      }).join('')}
    </div>

    <h2>Nachschlagen</h2>
    <div class="grid">
      ${REFERENCE_SECTIONS.slice(0, 4).map((s) => `<a class="tile" href="#/nachschlagen/${s.id}">
        <div class="icon" aria-hidden="true">${s.icon}</div><div class="title">${esc(s.title)}</div></a>`).join('')}
    </div>`;
}

// ---------- Lernkarten ----------
function renderCardsIndex() {
  const progress = getProgress();
  const tiles = [{ id: 'alle', name: 'Alle Themen', icon: '📚' }, ...CATEGORIES].map((c) => {
    const cards = cardsFor(c.id);
    const due = dueCards(cards, progress).length;
    const pct = masteryPercent(cards, progress);
    return `<a class="tile" href="#/karten/${c.id}">
      <div class="icon" aria-hidden="true">${c.icon}</div>
      <div class="title">${esc(c.name)}</div>
      <div class="muted">${due} fällig · ${pct}% sicher</div>
      ${progressBar(pct)}
    </a>`;
  });

  const stats = boxStats(FLASHCARDS, progress);
  view.innerHTML = `
    <h1>Lernkarten</h1>
    <p class="muted">Karten, die du weißt, wandern ein Fach weiter und kommen seltener wieder (nach 1, 3, 7 und 14 Tagen). Nicht gewusste Karten starten wieder in Fach 1.</p>
    <div class="grid">${tiles.join('')}</div>

    <h2>Deine Lernfächer</h2>
    <div class="table-wrap"><table>
      <thead><tr><th>Fach</th>${[0, 1, 2, 3, 4, 5].map((b) => `<th class="num">${b === 0 ? 'neu' : b}</th>`).join('')}</tr></thead>
      <tbody><tr><td>Karten</td>${[0, 1, 2, 3, 4, 5].map((b) => `<td class="num">${stats[b]}</td>`).join('')}</tr></tbody>
    </table></div>
    <div class="btn-row"><button class="btn" id="reset">Lernstand zurücksetzen</button></div>`;

  view.querySelector('#reset').addEventListener('click', () => {
    if (confirm('Wirklich den gesamten Lernstand (Karten und Quiz-Ergebnisse) löschen?')) {
      clearAll();
      renderCardsIndex();
    }
  });
}

function startCardSession(catId) {
  const cards = cardsFor(catId);
  if (cards.length === 0) return renderNotFound();
  const due = dueCards(cards, getProgress());
  const session = { catId, queue: due, retried: new Set(), done: 0, known: 0, practice: false, revealed: false };
  renderCardSession(session);
}

function renderCardSession(s) {
  const label = esc(catLabel(s.catId));

  if (s.queue.length === 0) {
    const cards = cardsFor(s.catId);
    view.innerHTML = `
      <h1>${label}</h1>
      <div class="card">
        ${s.done > 0
          ? `<h3>Geschafft! 🎉</h3><p>${s.done} Karten wiederholt, davon ${s.known} gewusst.</p>`
          : `<h3>Alles erledigt ✅</h3><p>In diesem Thema ist gerade keine Karte fällig.</p>`}
        <p class="muted">${masteryPercent(cards, getProgress())}% der Karten sind sicher gelernt.</p>
        <div class="btn-row">
          <button class="btn primary" id="practice">Alle ${cards.length} Karten üben</button>
          <a class="btn" href="#/karten">Zur Übersicht</a>
        </div>
      </div>`;
    view.querySelector('#practice').addEventListener('click', () => {
      renderCardSession({ ...s, queue: shuffle(cards), retried: new Set(), done: 0, known: 0, practice: true, revealed: false });
    });
    return;
  }

  const card = s.queue[0];
  const box = getProgress()[card.id]?.box ?? 0;
  view.innerHTML = `
    <h1>${label}</h1>
    <p class="muted">${s.queue.length} Karte${s.queue.length === 1 ? '' : 'n'} übrig${s.practice ? ' · Übungsmodus' : ''}</p>
    <article class="card flashcard" aria-live="polite">
      <div class="side-label">${esc(categoryById(card.cat)?.name ?? '')} · ${box === 0 ? 'neu' : `Fach ${box}`}</div>
      <div class="question">${esc(card.q)}</div>
      ${s.revealed ? `<div class="answer">${esc(card.a)}</div>` : ''}
    </article>
    <div class="btn-row">
      ${s.revealed
        ? `<button class="btn bad" data-rate="0">✗ Nicht gewusst</button>
           <button class="btn ok" data-rate="1">✓ Gewusst</button>`
        : `<button class="btn primary" id="reveal">Antwort zeigen</button>`}
    </div>`;

  if (!s.revealed) {
    const btn = view.querySelector('#reveal');
    btn.addEventListener('click', () => renderCardSession({ ...s, revealed: true }));
    btn.focus();
    return;
  }

  view.querySelectorAll('[data-rate]').forEach((btn) => btn.addEventListener('click', () => {
    const known = btn.dataset.rate === '1';
    save('cards', rateCard(getProgress(), card.id, known));
    const queue = s.queue.slice(1);
    // Nicht gewusste Karten kommen in dieser Runde einmal wieder dran
    if (!known && !s.retried.has(card.id)) {
      s.retried.add(card.id);
      queue.push(card);
    }
    renderCardSession({ ...s, queue, done: s.done + 1, known: s.known + (known ? 1 : 0), revealed: false });
  }));
}

// ---------- Quiz ----------
function renderQuizIndex() {
  const history = getQuizHistory();
  const tiles = [{ id: 'alle', name: 'Alle Themen', icon: '📚' }, ...CATEGORIES].map((c) => {
    const count = questionsFor(c.id).length;
    const best = history.filter((h) => h.cat === c.id)
      .reduce((m, h) => Math.max(m, Math.round((h.score / h.total) * 100)), -1);
    return `<a class="tile" href="#/quiz/${c.id}">
      <div class="icon" aria-hidden="true">${c.icon}</div>
      <div class="title">${esc(c.name)}</div>
      <div class="muted">${count} Fragen${best >= 0 ? ` · Bestwert ${best}%` : ''}</div>
    </a>`;
  });

  view.innerHTML = `
    <h1>Quiz</h1>
    <p class="muted">Bis zu ${QUIZ_LENGTH} zufällige Fragen. Teste dich wie in der Prüfung.</p>
    <div class="grid">${tiles.join('')}</div>
    ${history.length ? `
      <h2>Letzte Ergebnisse</h2>
      <div class="table-wrap"><table>
        <thead><tr><th>Datum</th><th>Thema</th><th class="num">Ergebnis</th></tr></thead>
        <tbody>${history.slice(0, 10).map((h) => `<tr>
          <td>${new Date(h.date).toLocaleDateString('de-DE')}</td>
          <td>${esc(catLabel(h.cat))}</td>
          <td class="num">${h.score}/${h.total}</td></tr>`).join('')}
        </tbody></table></div>` : ''}`;
}

function startQuiz(catId) {
  const pool = questionsFor(catId);
  if (pool.length === 0) return renderNotFound();
  renderQuizQuestion({ catId, questions: buildQuiz(pool, QUIZ_LENGTH), index: 0, score: 0, answer: null, wrong: [] });
}

function renderQuizQuestion(s) {
  const q = s.questions[s.index];
  const answered = s.answer !== null;
  const isLast = s.index === s.questions.length - 1;

  view.innerHTML = `
    <h1>${esc(catLabel(s.catId))}</h1>
    <p class="muted">Frage ${s.index + 1} von ${s.questions.length} · ${s.score} richtig</p>
    ${progressBar(Math.round((s.index / s.questions.length) * 100))}
    <article class="card" style="margin-top:12px">
      <div class="question" style="font-weight:600;font-size:18px;margin-bottom:12px">${esc(q.q)}</div>
      <div class="options">
        ${q.options.map((o, i) => {
          let cls = '';
          if (answered && i === q.correct) cls = 'correct';
          else if (answered && i === s.answer) cls = 'wrong';
          return `<button class="option ${cls}" data-i="${i}" ${answered ? 'disabled' : ''}>${esc(o)}</button>`;
        }).join('')}
      </div>
      ${answered ? `<div class="feedback" aria-live="polite">
        <strong>${s.answer === q.correct ? '✓ Richtig!' : '✗ Leider falsch.'}</strong> ${esc(q.explain)}
      </div>` : ''}
    </article>
    ${answered ? `<div class="btn-row"><button class="btn primary" id="next">${isLast ? 'Auswertung' : 'Nächste Frage'}</button></div>` : ''}`;

  if (!answered) {
    view.querySelectorAll('.option').forEach((btn) => btn.addEventListener('click', () => {
      const answer = Number(btn.dataset.i);
      const right = answer === q.correct;
      renderQuizQuestion({ ...s, answer, score: s.score + (right ? 1 : 0), wrong: right ? s.wrong : [...s.wrong, q] });
    }));
    return;
  }

  const next = view.querySelector('#next');
  next.focus();
  next.addEventListener('click', () => {
    if (isLast) return renderQuizResult(s);
    renderQuizQuestion({ ...s, index: s.index + 1, answer: null });
  });
}

function renderQuizResult(s) {
  const total = s.questions.length;
  const pct = Math.round((s.score / total) * 100);
  const history = [{ date: Date.now(), cat: s.catId, score: s.score, total }, ...getQuizHistory()].slice(0, 50);
  save('quiz-history', history);

  const verdict = pct >= 90 ? 'Hervorragend! 🏆' : pct >= 67 ? 'Gut gemacht! 👍' : pct >= 50 ? 'Bestanden – da geht noch mehr. 💪' : 'Weiter üben – du schaffst das! 📚';

  view.innerHTML = `
    <h1>Auswertung</h1>
    <div class="card">
      <div class="stat"><div class="value">${s.score} / ${total}</div><div class="label">${pct}% richtig</div></div>
      ${progressBar(pct)}
      <p style="margin-top:12px"><strong>${verdict}</strong></p>
      <div class="btn-row">
        <button class="btn primary" id="again">Neues Quiz</button>
        <a class="btn" href="#/quiz">Zur Übersicht</a>
      </div>
    </div>
    ${s.wrong.length ? `<h2>Das solltest du wiederholen</h2>
      ${s.wrong.map((q) => `<div class="card">
        <h3>${esc(q.q)}</h3>
        <p><strong>Richtig:</strong> ${esc(q.options[q.correct])}</p>
        <p class="muted">${esc(q.explain)}</p></div>`).join('')}` : ''}`;

  view.querySelector('#again').addEventListener('click', () => startQuiz(s.catId));
}

// ---------- Nachschlagewerk ----------
function renderReferenceIndex() {
  view.innerHTML = `
    <h1>Nachschlagewerk</h1>
    <p class="muted">Tabellen, Formeln und Rechner für Werkstatt und Baustelle.</p>
    <div class="grid">
      ${REFERENCE_SECTIONS.map((s) => `<a class="tile" href="#/nachschlagen/${s.id}">
        <div class="icon" aria-hidden="true">${s.icon}</div>
        <div class="title">${esc(s.title)}</div>
        <div class="muted">${esc(s.subtitle)}</div></a>`).join('')}
    </div>`;
}

function renderReferenceSection(id) {
  const section = REFERENCE_SECTIONS.find((s) => s.id === id);
  if (!section) return renderNotFound();
  view.innerHTML = `<p><a href="#/nachschlagen">← Nachschlagewerk</a></p><h1>${esc(section.title)}</h1>`;
  renderReference(section, view);
  view.insertAdjacentHTML('beforeend', '<p class="notice">Angaben ohne Gewähr. Maßgeblich sind die jeweils gültigen Normen, Regelwerke und Herstellerangaben.</p>');
}

function renderNotFound() {
  view.innerHTML = '<h1>Seite nicht gefunden</h1><p><a href="#/">Zur Startseite</a></p>';
}

// ---------- Router ----------
const routes = [
  [/^\/$/, () => renderHome(), 'home'],
  [/^\/karten$/, () => renderCardsIndex(), 'karten'],
  [/^\/karten\/([\w-]+)$/, (m) => startCardSession(m[1]), 'karten'],
  [/^\/quiz$/, () => renderQuizIndex(), 'quiz'],
  [/^\/quiz\/([\w-]+)$/, (m) => startQuiz(m[1]), 'quiz'],
  [/^\/nachschlagen$/, () => renderReferenceIndex(), 'nachschlagen'],
  [/^\/nachschlagen\/([\w-]+)$/, (m) => renderReferenceSection(m[1]), 'nachschlagen'],
];

function router() {
  const path = location.hash.replace(/^#/, '') || '/';
  let tab = '';
  const match = routes.find(([re]) => re.test(path));
  if (match) {
    match[1](path.match(match[0]));
    tab = match[2];
  } else {
    renderNotFound();
  }
  document.querySelectorAll('.tabbar a').forEach((a) => {
    const active = a.dataset.tab === tab;
    a.classList.toggle('active', active);
    if (active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', router);
router();

// ---------- Offline-Fähigkeit ----------
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('sw.js').catch(() => { /* offline-Modus nicht verfügbar */ });
}
