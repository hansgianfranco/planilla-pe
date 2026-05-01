export interface YearlyLimits {
  UIT: number;
  RMV: number;
}

export const LIMITS_BY_YEAR: Record<number, YearlyLimits> = {
  2024: { UIT: 5150, RMV: 1025 },
  2025: { UIT: 5350, RMV: 1130 },
  2026: { UIT: 5500, RMV: 1130 },
};

export const DEFAULT_YEAR = 2026;

export function getLimits(year = DEFAULT_YEAR): YearlyLimits {
  return LIMITS_BY_YEAR[year] || LIMITS_BY_YEAR[DEFAULT_YEAR];
}

// Retrocompatibilidad con constantes directas (usando 2026)
export const UIT = LIMITS_BY_YEAR[DEFAULT_YEAR].UIT;
export const RMV = LIMITS_BY_YEAR[DEFAULT_YEAR].RMV;
export const FAMILY_ALLOWANCE = RMV * 0.1;