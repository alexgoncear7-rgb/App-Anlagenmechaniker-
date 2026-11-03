// Rechenfunktionen für das Nachschlagewerk. Ungültige Eingaben ergeben NaN.
import { litersPerMeter } from './data/reference.js';

const valid = (...values) => values.every((v) => Number.isFinite(v));

/** Längenänderung in mm: l₀ in m, α in mm/(m·K), Δϑ in K. */
export function lengthChange(lengthM, alpha, deltaK) {
  if (!valid(lengthM, alpha, deltaK) || lengthM < 0) return NaN;
  return lengthM * alpha * deltaK;
}

/** Wasserinhalt in Litern aus Innendurchmesser (mm) und Länge (m). */
export function waterVolume(innerDiameterMm, lengthM) {
  if (!valid(innerDiameterMm, lengthM) || lengthM < 0) return NaN;
  return litersPerMeter(innerDiameterMm) * lengthM;
}

/** Heizwasser-Volumenstrom in l/h aus Leistung (kW) und Spreizung (K). */
export function heatingFlowRate(powerKw, spreadK) {
  if (!valid(powerKw, spreadK) || powerKw < 0 || spreadK <= 0) return NaN;
  return (powerKw * 1000) / (1.163 * spreadK);
}
