import { AFP_RATES } from "../constants/rates";
import { round } from "../utils/rounding";

export interface AFPBreakdown {
  fondo: number;    // 10% aporte al fondo
  comision: number; // comisión AFP sobre remuneración
  seguro: number;   // prima de seguro de invalidez y sobrevivencia
  total: number;    // fondo + comision + seguro
}

export function calculateAFP(salary: number, type: keyof typeof AFP_RATES): AFPBreakdown {
  const rates = AFP_RATES[type];
  const fondo    = round(salary * rates.fondo);
  const comision = round(salary * rates.comision);
  const seguro   = round(salary * rates.seguro);
  const total    = round(fondo + comision + seguro);
  return { fondo, comision, seguro, total };
}