import { ESSALUD } from "../constants/rates";
import { round } from "../utils/rounding";

export function calculateGratification(salary: number, hasEPS = false) {
  const rate = hasEPS ? 0.0675 : ESSALUD;
  const bonus = round(salary * rate);
  return round(salary + bonus);
}