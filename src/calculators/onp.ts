import { ONP_RATE } from "../constants/rates";

export function calculateONP(salary: number) {
  return salary * ONP_RATE;
}