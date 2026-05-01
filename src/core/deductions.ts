import type { EmployeeInput } from "../types/employee";
import { calculateAFP, AFPBreakdown } from "../calculators/afp";
import { calculateONP } from "../calculators/onp";
import { calculateIncomeTax } from "../calculators/incomeTax";
import { calculateGrossSalary } from "./salary";
import { round } from "../utils/rounding";

export function calculateDeductions(input: EmployeeInput) {
  const { pensionSystem, afpType } = input;
  const gross = calculateGrossSalary(input);

  let pension = 0;
  let afpBreakdown: AFPBreakdown | undefined;

  if (pensionSystem === "ONP") {
    pension = round(calculateONP(gross));
  }

  if (pensionSystem === "AFP" && afpType) {
    afpBreakdown = calculateAFP(gross, afpType);
    pension = afpBreakdown.total;
  }

  const incomeTax = calculateIncomeTax(input).monthlyTax;

  return {
    pension,
    ...(afpBreakdown ? { afpBreakdown } : {}),
    incomeTax,
    total: round(pension + incomeTax),
  };
}