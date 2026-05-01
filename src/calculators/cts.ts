import { round } from "../utils/rounding";

export function calculateCTS(salary: number) {
  const computableRemuneration = salary + (salary / 6);
  return round(computableRemuneration / 2);
}