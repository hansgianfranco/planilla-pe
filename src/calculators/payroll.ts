import type { EmployeeInput } from "../types/employee";
import { calculateGrossSalary } from "../core/salary";
import { calculateDeductions } from "../core/deductions";
import { calculateEmployerContributions } from "../core/contributions";
import { calculateOvertime } from "./overtime";
import { round } from "../utils/rounding";

export interface PayrollExtraInput {
  overtime25?: number;
  overtime35?: number;
}

export function calculatePayroll(input: EmployeeInput, extras?: PayrollExtraInput) {
  const { regime = "GENERAL", hasEPS = false } = input;

  const baseGross = calculateGrossSalary(input);

  // Calcular horas extras sobre el sueldo base (sin asig. familiar)
  const overtime = calculateOvertime(
    baseGross,
    extras?.overtime25 || 0,
    extras?.overtime35 || 0
  );

  const gross = round(baseGross + overtime.total);

  // BUG FIX: Antes se pasaba salary + overtime.total/1 que duplicaba la asig. familiar.
  // Ahora se pasa el gross total como salary para que calculateDeductions trabaje
  // sobre la remuneración bruta real (incluyendo horas extras).
  const adjustedInput: EmployeeInput = {
    ...input,
    salary: gross,
    familyAllowance: false, // Ya incluida en gross, evitar doble conteo
  };
  const deductions = calculateDeductions(adjustedInput);

  const contributions = calculateEmployerContributions(gross, hasEPS, regime);

  const net = round(gross - deductions.total);

  return {
    baseGross,
    overtime,
    gross,
    net,
    deductions,
    contributions,
    regime,
  };
}