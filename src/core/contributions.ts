import { ESSALUD } from "../constants/rates";
import { round } from "../utils/rounding";

export function calculateEmployerContributions(salary: number, hasEPS = false) {
  const rate = hasEPS ? 0.0675 : ESSALUD;
  const essalud = round(salary * rate);

  return {
    essalud,
    total: essalud,
  };
}