import { getLimits } from "../constants/limits";
import type { EmployeeInput } from "../types/employee";

export function calculateGrossSalary(input: EmployeeInput) {
  // La asignación familiar respeta el año para usar el valor de RMV correcto
  const limits = getLimits(input.year);
  const familyAllowance = limits.RMV * 0.1;

  let gross = input.salary;

  if (input.familyAllowance) {
    gross += familyAllowance;
  }

  return gross;
}