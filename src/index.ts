export { calculatePayroll } from "./calculators/payroll";

export { calculateNetSalary } from "./calculators/netSalary";
export { calculateCTS } from "./calculators/cts";
export { calculateGratification } from "./calculators/gratification";

export { calculateAFP } from "./calculators/afp";
export { calculateONP } from "./calculators/onp";

export { calculateGrossSalary } from "./core/salary";
export { calculateDeductions } from "./core/deductions";
export { calculateEmployerContributions } from "./core/contributions";

export {
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

export type {
  EmployeeInput,
  PensionSystem
} from "./types/employee";

export type {
  PayrollResult
} from "./types/payroll";