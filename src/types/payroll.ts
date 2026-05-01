export interface PayrollResult {
  gross: number;
  net: number;
  deductions: {
    pension: number;
    afpBreakdown?: {
      fondo: number;
      comision: number;
      seguro: number;
      total: number;
    };
    incomeTax: number;
    total: number;
  };
  contributions: {
    essalud: number;
    total: number;
  };
  regime: string;
}