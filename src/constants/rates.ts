// Impuesto General a las Ventas (IGV)
// Tasa estándar en Perú: 18%
export const IGV = 0.18;

// Aporte a Essalud (seguro de salud)
// Lo paga el empleador sobre el sueldo bruto del trabajador (9%)
export const ESSALUD = 0.09;

// Aporte al sistema público de pensiones (ONP)
// Descuento obligatorio para trabajadores afiliados a ONP (13%)
export const ONP_RATE = 0.13;

// Tasas referenciales del sistema privado de pensiones (AFP)
// Incluye comisión + prima de seguro + aporte al fondo (aproximado)
export const AFP_RATES = {
  integra: 0.13,
  prima: 0.13,
  profuturo: 0.13,
  habitat: 0.13,
};