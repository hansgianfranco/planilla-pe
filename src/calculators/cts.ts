import { round } from "../utils/rounding";
import { WorkRegime } from "../types/employee";

export function calculateCTS(salary: number, regime: WorkRegime = "GENERAL") {
  if (regime === "MICRO") return 0;
  
  const gratificationFraction = salary / 6;
  const computableRemuneration = salary + gratificationFraction;
  
  let total = computableRemuneration / 2;
  if (regime === "PEQUENA") {
    total = total / 2;
  }
  
  return round(total);
}