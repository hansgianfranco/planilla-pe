import { getLimits } from "../constants/limits";
import { round } from "../utils/rounding";

export function calculateOvertime(monthlyGross: number, hours25: number, hours35: number) {
  const dayRate = monthlyGross / 30;
  const hourRate = dayRate / 8;
  
  const total25 = round(hourRate * 1.25 * hours25);
  const total35 = round(hourRate * 1.35 * hours35);
  
  return {
    hourRate: round(hourRate),
    total25,
    total35,
    total: round(total25 + total35),
  };
}

export function calculateNightSurcharge(monthlyGross: number, year?: number) {
  const limits = getLimits(year);
  // El sueldo mínimo nocturno es RMV + 35%
  const nightMinimum = limits.RMV * 1.35;
  const surcharge = Math.max(0, nightMinimum - monthlyGross);
  
  return {
    nightMinimum: round(nightMinimum),
    surcharge: round(surcharge),
  };
}
