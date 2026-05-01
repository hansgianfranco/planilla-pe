import { EmployeeInput } from "../types/employee";
import { calculateGrossSalary } from "../core/salary";
import { calculateCTS } from "./cts";
import { calculateTruncatedVacations } from "./vacations";
import { round } from "../utils/rounding";

export interface TerminationInput extends EmployeeInput {
  monthsWorked: number;
}

export function calculateTermination(input: TerminationInput) {
  const { regime = "GENERAL", monthsWorked } = input;
  const gross = calculateGrossSalary(input);

  // Gratificación trunca: (Sueldo / 6) * meses trabajados en el semestre
  // Se calcula sobre la remuneración base sin incluir el bonus de Essalud
  const gratificationBase = regime === "PEQUENA" ? gross / 2 : gross;
  const truncatedGratification = regime === "MICRO"
    ? 0
    : round((gratificationBase / 6) * monthsWorked);

  // CTS trunca: calculateCTS devuelve el semestral (6 meses), dividimos entre 6
  const semestralCTS = calculateCTS(gross, regime);
  const truncatedCTS = round((semestralCTS / 6) * monthsWorked);

  // Vacaciones truncas
  const truncatedVacations = calculateTruncatedVacations(gross, monthsWorked, regime).total;

  const total = round(truncatedGratification + truncatedCTS + truncatedVacations);

  return {
    gross,
    truncatedGratification,
    truncatedCTS,
    truncatedVacations,
    total,
  };
}
