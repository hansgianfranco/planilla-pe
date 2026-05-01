import type { EmployeeInput } from "../types/employee";
import { calculateAFP } from "../calculators/afp";
import { calculateONP } from "../calculators/onp";
import { calculateGrossSalary } from "./salary";
import { round } from "../utils/rounding";

export function calculateDeductions(input: EmployeeInput) {
  const { pensionSystem, afpType } = input;
  const gross = calculateGrossSalary(input);

  let pension = 0;

  if (pensionSystem === "ONP") {
    pension = round(calculateONP(gross));
  }

  if (pensionSystem === "AFP" && afpType) {
    pension = round(calculateAFP(gross, afpType));
  }

  return {
    pension,
    total: pension,
  };
}