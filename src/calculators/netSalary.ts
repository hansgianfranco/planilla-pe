import { EmployeeInput } from "../types/employee";
import { ONP_RATE, AFP_RATES } from "../constants/rates";
import { calculateGrossSalary } from "../core/salary";
import { round } from "../utils/rounding";

export function calculateNetSalary(input: EmployeeInput) {
  const { pensionSystem, afpType } = input;
  const gross = calculateGrossSalary(input);

  let pension = 0;

  if (pensionSystem === "ONP") {
    pension = round(gross * ONP_RATE);
  }

  if (pensionSystem === "AFP" && afpType) {
    pension = round(gross * AFP_RATES[afpType]);
  }

  const net = round(gross - pension);

  return {
    gross,
    pension,
    net,
  };
}