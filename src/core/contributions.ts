import { ESSALUD } from "../constants/rates";
import { round } from "../utils/rounding";
import { WorkRegime } from "../types/employee";

export function calculateEmployerContributions(salary: number, hasEPS = false, regime: WorkRegime = "GENERAL") {
  if (regime === "MICRO") {
    // Las microempresas NO están obligadas a aportar Essalud (9%).
    // El trabajador puede afiliarse al SIS de forma independiente.
    // Esta función devuelve 0 para reflejar que no hay descuento obligatorio al empleador.
    return {
      essalud: 0,
      total: 0,
    };
  }

  const rate = hasEPS ? 0.0675 : ESSALUD;
  const essalud = round(salary * rate);

  return {
    essalud,
    total: essalud,
  };
}