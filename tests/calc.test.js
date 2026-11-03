import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lengthChange, waterVolume, heatingFlowRate } from '../js/calc.js';
import { litersPerMeter } from '../js/data/reference.js';

const close = (a, b, eps = 1e-3) => assert.ok(Math.abs(a - b) < eps, `${a} ≈ ${b}`);

test('Längenänderung Kupfer 10 m, 50 K = 8,4 mm', () => {
  close(lengthChange(10, 0.0168, 50), 8.4);
});

test('Wasserinhalt Cu 15×1 (Innen 13 mm) ≈ 0,133 l/m', () => {
  close(litersPerMeter(13), 0.1327);
  close(waterVolume(13, 10), 1.327);
});

test('Volumenstrom 10 kW bei 10 K ≈ 860 l/h', () => {
  close(heatingFlowRate(10, 10), 859.85, 0.01);
});

test('ungültige Eingaben ergeben NaN', () => {
  assert.ok(Number.isNaN(lengthChange(NaN, 0.0168, 50)));
  assert.ok(Number.isNaN(waterVolume(13, -1)));
  assert.ok(Number.isNaN(heatingFlowRate(10, 0)));
});
