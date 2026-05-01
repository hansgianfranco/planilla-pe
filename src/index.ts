// Calculadores principales
export { calculatePayroll } from "./calculators/payroll";
export { calculateNetSalary } from "./calculators/netSalary";
export { calculateCTS } from "./calculators/cts";
export { calculateGratification } from "./calculators/gratification";
export { calculateIncomeTax } from "./calculators/incomeTax";
export { calculateVacations, calculateTruncatedVacations } from "./calculators/vacations";
export { calculateOvertime, calculateNightSurcharge } from "./calculators/overtime";
export { calculateTermination } from "./calculators/termination";

// Calculadores base
export { calculateAFP } from "./calculators/afp";
export { calculateONP } from "./calculators/onp";
export { calculateGrossSalary } from "./core/salary";
export { calculateDeductions } from "./core/deductions";
export { calculateEmployerContributions } from "./core/contributions";

// Constantes y Límites
export {
  LIMITS_BY_YEAR,
  DEFAULT_YEAR,
  getLimits,
  UIT,
  RMV,
  FAMILY_ALLOWANCE
} from "./constants/limits";

export {
  IGV,
  ESSALUD,
  ONP_RATE,
  AFP_RATES
} from "./constants/rates";

// Tipos
export type {
  EmployeeInput,
  PensionSystem,
  WorkRegime
} from "./types/employee";

export type {
  PayrollResult
} from "./types/payroll";

// Utilidades
export { round } from "./utils/rounding";
export { formatCurrency, generateBoletaText } from "./utils/formatter";