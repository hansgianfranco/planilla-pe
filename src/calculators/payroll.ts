import type { EmployeeInput } from "../types/employee";
import { calculateGrossSalary } from "../core/salary";
import { calculateDeductions } from "../core/deductions";
import { calculateEmployerContributions } from "../core/contributions";
import { round } from "../utils/rounding";

export function calculatePayroll(input: EmployeeInput) {
  const gross = calculateGrossSalary(input);
  const deductions = calculateDeductions(input);
  const contributions = calculateEmployerContributions(gross, input.hasEPS);

  const net = round(gross - deductions.total);

  return {
    gross,
    net,
    deductions,
    contributions,
  };
}