import { EmployeeInput } from "../types/employee";
import { ONP_RATE, AFP_RATES } from "../constants/rates";

export function calculateNetSalary(input: EmployeeInput) {
  const { salary, pensionSystem, afpType } = input;

  let pension = 0;

  if (pensionSystem === "ONP") {
    pension = salary * ONP_RATE;
  }

  if (pensionSystem === "AFP" && afpType) {
    pension = salary * AFP_RATES[afpType];
  }

  const net = salary - pension;

  return {
    gross: salary,
    pension,
    net,
  };
}