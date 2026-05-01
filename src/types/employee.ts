export type PensionSystem = "AFP" | "ONP";
export type WorkRegime = "GENERAL" | "PEQUENA" | "MICRO";

export interface EmployeeInput {
  salary: number;
  pensionSystem: PensionSystem;
  regime?: WorkRegime;

  afpType?: "integra" | "prima" | "profuturo" | "habitat";

  familyAllowance?: boolean;
  hasEPS?: boolean;
  
  // Para cálculos históricos (opcional)
  year?: number;
}