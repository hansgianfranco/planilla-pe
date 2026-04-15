import { ESSALUD } from "../constants/rates";

export function calculateEmployerContributions(salary: number) {
  const essalud = salary * ESSALUD;

  return {
    essalud,
    total: essalud,
  };
}