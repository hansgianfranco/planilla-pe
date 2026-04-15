import type { EmployeeInput } from "../types/employee";
import { calculateGrossSalary } from "../core/salary";
import { calculateDeductions } from "../core/deductions";
import { calculateEmployerContributions } from "../core/contributions";

export function calculatePayroll(input: EmployeeInput) {
  const gross = calculateGrossSalary(input);
  const deductions = calculateDeductions(input);
  const contributions = calculateEmployerContributions(gross);

  const net = gross - deductions.total;

  return {
    gross,
    net,
    deductions,
    contributions,
  };
}