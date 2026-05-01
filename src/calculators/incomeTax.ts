import { getLimits } from "../constants/limits";
import { round } from "../utils/rounding";
import { EmployeeInput } from "../types/employee";
import { calculateGrossSalary } from "../core/salary";

export function calculateIncomeTax(input: EmployeeInput) {
  const { year } = input;
  const limits = getLimits(year);
  const gross = calculateGrossSalary(input);

  // Gratificaciones proyectadas: 2 al año (Julio y Diciembre)
  // La Bonificación Extraordinaria NO forma parte de la base imponible anual
  // según SUNAT — solo se incluye la gratificación sin bonus para 5ta cat.
  const annualGross = gross * 12 + gross * 2; // sueldos + gratificaciones base

  // Deducción de 7 UITs
  const deduction = limits.UIT * 7;
  const taxableBase = Math.max(0, annualGross - deduction);

  // Tramos del Impuesto a la Renta de 5ta Categoría
  const brackets = [
    { limit: 5 * limits.UIT,  rate: 0.08 },
    { limit: 15 * limits.UIT, rate: 0.14 }, // hasta 20 UIT
    { limit: 15 * limits.UIT, rate: 0.17 }, // hasta 35 UIT
    { limit: 10 * limits.UIT, rate: 0.20 }, // hasta 45 UIT
    { limit: Infinity,        rate: 0.30 }, // más de 45 UIT
  ];

  let annualTax = 0;
  let remaining = taxableBase;

  for (const bracket of brackets) {
    if (remaining <= 0) break;
    const amountInBracket = Math.min(remaining, bracket.limit);
    annualTax += amountInBracket * bracket.rate;
    remaining -= amountInBracket;
  }

  const monthlyTax = round(annualTax / 12);

  return {
    annualGross,
    deduction,
    taxableBase,
    annualTax: round(annualTax),
    monthlyTax,
  };
}
