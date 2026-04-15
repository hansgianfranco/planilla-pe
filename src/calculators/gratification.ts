import { ESSALUD } from "../constants/rates";

export function calculateGratification(salary: number) {
  const bonus = salary * ESSALUD;
  return salary + bonus;
}