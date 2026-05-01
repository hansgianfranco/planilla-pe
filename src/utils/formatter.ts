export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(value);
}

export function generateBoletaText(payroll: {
  baseGross: number;
  overtime: { total: number };
  gross: number;
  net: number;
  deductions: {
    pension: number;
    afpBreakdown?: { fondo: number; comision: number; seguro: number; total: number };
    incomeTax: number;
    total: number;
  };
  contributions: { total: number };
  regime: string;
}, employeeName: string = "Trabajador"): string {
  const overtimeTotal = payroll.overtime?.total ?? 0;
  const { afpBreakdown } = payroll.deductions;

  const pensionLines = afpBreakdown
    ? [
        `  AFP - Fondo:        ${formatCurrency(afpBreakdown.fondo)}`,
        `  AFP - Comisión:     ${formatCurrency(afpBreakdown.comision)}`,
        `  AFP - Seguro:       ${formatCurrency(afpBreakdown.seguro)}`,
      ].join("\n")
    : `  ONP (13%):          ${formatCurrency(payroll.deductions.pension)}`;

  return `
=========================================
        BOLETA DE PAGO (SIMULACIÓN)
=========================================
TRABAJADOR: ${employeeName}
RÉGIMEN:    ${payroll.regime}
-----------------------------------------
INGRESOS
  Sueldo Bruto:     ${formatCurrency(payroll.baseGross)}
  Horas Extras:     ${formatCurrency(overtimeTotal)}
  TOTAL BRUTO:      ${formatCurrency(payroll.gross)}

DESCUENTOS
${pensionLines}
  TOTAL PENSIÓN:    ${formatCurrency(payroll.deductions.pension)}
  Impuesto 5ta:     ${formatCurrency(payroll.deductions.incomeTax)}
  TOTAL DESCUENTOS: ${formatCurrency(payroll.deductions.total)}

-----------------------------------------
NETO A PAGAR:       ${formatCurrency(payroll.net)}
-----------------------------------------

APORTES EMPLEADOR
  Essalud/Salud:    ${formatCurrency(payroll.contributions.total)}
=========================================
  `.trim();
}
