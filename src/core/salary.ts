import { FAMILY_ALLOWANCE } from "../constants/limits";
import type { EmployeeInput } from "../types/employee";

export function calculateGrossSalary(input: EmployeeInput) {
  let gross = input.salary;

  if (input.familyAllowance) {
    gross += FAMILY_ALLOWANCE;
  }

  return gross;
}