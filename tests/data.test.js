import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CATEGORIES } from '../js/data/categories.js';
import { FLASHCARDS } from '../js/data/flashcards.js';
import { QUIZ } from '../js/data/quiz.js';
import { COPPER_PIPES, STEEL_PIPES } from '../js/data/reference.js';

const catIds = new Set(CATEGORIES.map((c) => c.id));

test('Lernkarten haben eindeutige IDs, gültige Kategorie und Inhalt', () => {
  assert.equal(new Set(FLASHCARDS.map((c) => c.id)).size, FLASHCARDS.length);
  for (const c of FLASHCARDS) {
    assert.ok(catIds.has(c.cat), `${c.id}: Kategorie ${c.cat}`);
    assert.ok(c.q.trim() && c.a.trim(), `${c.id}: Frage/Antwort leer`);
  }
});

test('Quizfragen sind gültig', () => {
  assert.equal(new Set(QUIZ.map((q) => q.id)).size, QUIZ.length);
  for (const q of QUIZ) {
    assert.ok(catIds.has(q.cat), `${q.id}: Kategorie ${q.cat}`);
    assert.ok(q.options.length >= 2, `${q.id}: zu wenige Antworten`);
    assert.equal(new Set(q.options).size, q.options.length, `${q.id}: doppelte Antworten`);
    assert.ok(Number.isInteger(q.correct) && q.correct >= 0 && q.correct < q.options.length, `${q.id}: correct ungültig`);
    assert.ok(q.explain.trim(), `${q.id}: Erklärung fehlt`);
  }
});

test('jede Kategorie hat Lernkarten und Quizfragen', () => {
  for (const c of CATEGORIES) {
    assert.ok(FLASHCARDS.some((f) => f.cat === c.id), `keine Karten für ${c.id}`);
    assert.ok(QUIZ.some((q) => q.cat === c.id), `keine Fragen für ${c.id}`);
  }
});

test('Rohr-Innendurchmesser werden richtig berechnet', () => {
  assert.equal(COPPER_PIPES.find((p) => p.od === 15).id, 13);
  assert.equal(STEEL_PIPES.find((p) => p.dn === 15).id, 16.1);
});
