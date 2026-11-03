// Lernlogik ohne DOM-Abhängigkeiten (damit sie in Node getestet werden kann).

export const MAX_BOX = 5;
// Wiederholungsabstand je Lernfach (Leitner-System) in Tagen
export const BOX_INTERVAL_DAYS = { 1: 0, 2: 1, 3: 3, 4: 7, 5: 14 };
const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Bewertet eine Lernkarte und liefert den neuen Fortschritt zurück (ohne Mutation).
 * Gewusst → ein Fach weiter, nicht gewusst → zurück in Fach 1.
 */
export function rateCard(progress, cardId, known, now = Date.now()) {
  const current = progress[cardId]?.box ?? 0;
  const box = known ? Math.min(Math.max(current, 1) + 1, MAX_BOX) : 1;
  const due = now + BOX_INTERVAL_DAYS[box] * DAY_MS;
  return { ...progress, [cardId]: { box, due } };
}

/** Karten, die jetzt dran sind: neue Karten und fällige Wiederholungen, niedrigstes Fach zuerst. */
export function dueCards(cards, progress, now = Date.now()) {
  return cards
    .filter((c) => !progress[c.id] || progress[c.id].due <= now)
    .sort((a, b) => (progress[a.id]?.box ?? 0) - (progress[b.id]?.box ?? 0));
}

/** Zählt Karten je Fach (0 = noch nie gelernt). */
export function boxStats(cards, progress) {
  const stats = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const c of cards) stats[progress[c.id]?.box ?? 0]++;
  return stats;
}

/** Anteil „sicher“ gelernter Karten (Fach 4 und 5) in Prozent. */
export function masteryPercent(cards, progress) {
  if (cards.length === 0) return 0;
  const s = boxStats(cards, progress);
  return Math.round(((s[4] + s[5]) / cards.length) * 100);
}

export function shuffle(list, rng = Math.random) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Stellt ein Quiz zusammen: zufällige Auswahl, Antworten gemischt.
 * `correct` wird auf die neue Position der richtigen Antwort umgerechnet.
 */
export function buildQuiz(questions, count, rng = Math.random) {
  return shuffle(questions, rng)
    .slice(0, count)
    .map((q) => {
      const order = shuffle(q.options.map((_, i) => i), rng);
      return {
        ...q,
        options: order.map((i) => q.options[i]),
        correct: order.indexOf(q.correct),
      };
    });
}
