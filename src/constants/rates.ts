// Impuesto General a las Ventas (IGV)
// Tasa estándar en Perú: 18%
export const IGV = 0.18;

// Aporte a Essalud (seguro de salud)
// Lo paga el empleador sobre el sueldo bruto del trabajador (9%)
export const ESSALUD = 0.09;

// Aporte al sistema público de pensiones (ONP)
// Descuento obligatorio para trabajadores afiliados a ONP (13%)
export const ONP_RATE = 0.13;

// Tasas del sistema privado de pensiones (AFP) - Comisión Flujo
// Vigentes aproximado 2026 (varían mensualmente por SBS)
// Fuente: SBS - https://www.sbs.gob.pe
export interface AFPRates {
  fondo: number;    // Aporte obligatorio al fondo (siempre 10%)
  comision: number; // Comisión AFP sobre remuneración (varía por AFP)
  seguro: number;   // Prima de seguro de invalidez/sobrevivencia (varía por AFP)
}

export const AFP_RATES: Record<string, AFPRates> = {
  integra:   { fondo: 0.10, comision: 0.0155, seguro: 0.0174 }, // total ~13.29%
  prima:     { fondo: 0.10, comision: 0.0169, seguro: 0.0184 }, // total ~13.53%
  profuturo: { fondo: 0.10, comision: 0.0169, seguro: 0.0184 }, // total ~13.53%
  habitat:   { fondo: 0.10, comision: 0.0147, seguro: 0.0158 }, // total ~13.05%
};