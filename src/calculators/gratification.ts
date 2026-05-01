import { ESSALUD } from "../constants/rates";
import { round } from "../utils/rounding";
import { WorkRegime } from "../types/employee";

export function calculateGratification(salary: number, hasEPS = false, regime: WorkRegime = "GENERAL") {
  if (regime === "MICRO") return 0;
  
  let base = salary;
  if (regime === "PEQUENA") {
    base = salary / 2;
  }
  
  const rate = hasEPS ? 0.0675 : ESSALUD;
  const bonus = round(base * rate);
  return round(base + bonus);
}