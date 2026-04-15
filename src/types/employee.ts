export type PensionSystem = "AFP" | "ONP";

export interface EmployeeInput {
  salary: number;
  pensionSystem: PensionSystem;

  afpType?: "integra" | "prima" | "profuturo" | "habitat";

  familyAllowance?: boolean;
}