import { AFP_RATES } from "../constants/rates";

export function calculateAFP(salary: number, type: keyof typeof AFP_RATES) {
  return salary * AFP_RATES[type];
}