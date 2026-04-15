import type { EmployeeInput } from "../types/employee";
import { calculateAFP } from "../calculators/afp";
import { calculateONP } from "../calculators/onp";

export function calculateDeductions(input: EmployeeInput) {
  const { salary, pensionSystem, afpType } = input;

  let pension = 0;

  if (pensionSystem === "ONP") {
    pension = calculateONP(salary);
  }

  if (pensionSystem === "AFP" && afpType) {
    pension = calculateAFP(salary, afpType);
  }

  return {
    pension,
    total: pension, // luego agregas más descuentos aquí
  };
}