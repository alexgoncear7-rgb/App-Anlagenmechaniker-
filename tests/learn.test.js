import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rateCard, dueCards, boxStats, masteryPercent, buildQuiz, MAX_BOX } from '../js/learn.js';

const DAY = 24 * 60 * 60 * 1000;
const cards = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];

test('gewusste neue Karte kommt in Fach 2, fällig nach 1 Tag', () => {
  const p = rateCard({}, 'a', true, 0);
  assert.deepEqual(p.a, { box: 2, due: DAY });
});

test('nicht gewusste Karte fällt zurück in Fach 1 und ist sofort fällig', () => {
  const p = rateCard({ a: { box: 4, due: 0 } }, 'a', false, 100);
  assert.deepEqual(p.a, { box: 1, due: 100 });
});

test('Fach steigt nicht über das Maximum', () => {
  const p = rateCard({ a: { box: MAX_BOX, due: 0 } }, 'a', true, 0);
  assert.equal(p.a.box, MAX_BOX);
});

test('rateCard verändert den alten Fortschritt nicht', () => {
  const old = { a: { box: 2, due: 0 } };
  rateCard(old, 'a', true, 0);
  assert.deepEqual(old, { a: { box: 2, due: 0 } });
});

test('dueCards liefert neue und fällige Karten, niedrigstes Fach zuerst', () => {
  const progress = { a: { box: 3, due: 50 }, b: { box: 2, due: 500 } };
  const due = dueCards(cards, progress, 100).map((c) => c.id);
  assert.deepEqual(due, ['c', 'a']);
});

test('boxStats und masteryPercent zählen richtig', () => {
  const progress = { a: { box: 4, due: 0 }, b: { box: 5, due: 0 } };
  assert.deepEqual(boxStats(cards, progress), { 0: 1, 1: 0, 2: 0, 3: 0, 4: 1, 5: 1 });
  assert.equal(masteryPercent(cards, progress), 67);
  assert.equal(masteryPercent([], {}), 0);
});

test('buildQuiz mischt Antworten und behält die richtige Antwort', () => {
  const qs = Array.from({ length: 20 }, (_, i) => ({ id: `q${i}`, options: ['A', 'B', 'C', 'D'], correct: i % 4 }));
  const quiz = buildQuiz(qs, 10);
  assert.equal(quiz.length, 10);
  for (const q of quiz) {
    const original = qs.find((o) => o.id === q.id);
    assert.equal(q.options[q.correct], original.options[original.correct]);
    assert.deepEqual([...q.options].sort(), ['A', 'B', 'C', 'D']);
  }
  assert.equal(new Set(quiz.map((q) => q.id)).size, 10);
});
