# planilla-pe

> Utilidades de planilla laboral para Perú en **TypeScript**. Cálculos de sueldo neto, AFP/ONP, Impuesto de Quinta Categoría, CTS, gratificaciones, vacaciones, horas extras y liquidaciones. Actualizado a valores **2026**.

[![npm version](https://img.shields.io/npm/v/planilla-pe)](https://www.npmjs.com/package/planilla-pe)
[![license](https://img.shields.io/npm/l/planilla-pe)](LICENSE)
[![tests](https://img.shields.io/badge/tests-31%20unitarios-brightgreen)](#testing)

---

## Instalación

```bash
npm install planilla-pe
```

**Requiere Node.js >= 18**. Sin dependencias externas.

---

## Tabla de Contenidos

- [Uso Rápido](#uso-rápido)
- [Funciones](#funciones)
  - [calculatePayroll](#calculatepayroll)
  - [calculateNetSalary](#calcnetSalary)
  - [calculateIncomeTax](#calculateincometax)
  - [calculateCTS](#calculatects)
  - [calculateGratification](#calculategratification)
  - [calculateVacations](#calculatevacations)
  - [calculateTermination](#calculatetermination)
  - [calculateOvertime](#calculateovertime)
  - [calculateNightSurcharge](#calculatenightsurcharge)
  - [calculateAFP / calculateONP](#calculateafp--calculateonp)
  - [generateBoletaText](#generatebolatext)
- [Tipos](#tipos)
- [Constantes](#constantes)
- [Regímenes Laborales](#regímenes-laborales)
- [Cálculos Históricos](#cálculos-históricos)
- [Testing](#testing)
- [Contribución](#contribución)
- [Licencia](#licencia)

---

## Uso Rápido

```ts
import { calculatePayroll, generateBoletaText } from "planilla-pe";

const result = calculatePayroll({
  salary: 3500,
  pensionSystem: "AFP",
  afpType: "integra",
  familyAllowance: true,
  regime: "GENERAL",
});

console.log(generateBoletaText(result, "Franco Caballero"));
```

Salida:
```
=========================================
        BOLETA DE PAGO (SIMULACIÓN)
=========================================
TRABAJADOR: Franco Caballero
RÉGIMEN:    GENERAL
-----------------------------------------
INGRESOS
  Sueldo Bruto:     S/ 3,613.00
  Horas Extras:     S/ 0.00
  TOTAL BRUTO:      S/ 3,613.00

DESCUENTOS
  AFP - Fondo:        S/ 361.30
  AFP - Comisión:     S/ 56.00
  AFP - Seguro:       S/ 62.87
  TOTAL PENSIÓN:      S/ 480.17
  Impuesto 5ta:     S/ 0.00
  TOTAL DESCUENTOS: S/ 480.17
-----------------------------------------
NETO A PAGAR:       S/ 3,132.83
-----------------------------------------
APORTES EMPLEADOR
  Essalud/Salud:    S/ 325.17
=========================================
```

---

## Funciones

### `calculatePayroll`

Calcula la planilla mensual completa de un trabajador: sueldo bruto, descuentos (pensión + Quinta Categoría), aportes del empleador y horas extras.

```ts
import { calculatePayroll } from "planilla-pe";

const result = calculatePayroll(
  {
    salary: 2000,
    pensionSystem: "ONP",
    familyAllowance: true,
    regime: "GENERAL",
  },
  {
    overtime25: 4, // horas al 25%
    overtime35: 2, // horas al 35%
  }
);

// result.baseGross                    => sueldo bruto base
// result.overtime.total               => total por horas extras
// result.gross                        => sueldo bruto total (base + extras)
// result.deductions.pension           => total pensión
// result.deductions.afpBreakdown      => { fondo, comision, seguro, total } (solo AFP)
// result.deductions.incomeTax         => retención 5ta categoría
// result.deductions.total             => total descuentos
// result.contributions.essalud        => aporte Essalud del empleador
// result.net                          => neto a pagar
// result.regime                       => "GENERAL" | "PEQUENA" | "MICRO"
```

---

### `calculateNetSalary`

Cálculo simplificado de sueldo neto (solo descuento de pensiones, sin Quinta Categoría).

> ⚠️ **Atención:** No incluye retención del Impuesto a la Renta de 5ta Categoría. Úsalo solo para estimaciones rápidas. Para planilla real usa `calculatePayroll`.

```ts
import { calculateNetSalary } from "planilla-pe";

const result = calculateNetSalary({
  salary: 2000,
  pensionSystem: "AFP",
  afpType: "prima",
});

// salary       => sueldo básico (sin asignación familiar)
// result.gross  => 2000  (sin familyAllowance en este ejemplo)
// result.pension => 270.6  (prima: 10%+1.69%+1.84% = 13.53%)
// result.net     => 1729.4
```

---

### `calculateIncomeTax`

Calcula la retención mensual del **Impuesto a la Renta de 5ta Categoría**, proyectando los ingresos anuales (12 sueldos + 2 gratificaciones) y aplicando los tramos vigentes de SUNAT con una deducción de **7 UITs**.

| Tramo (en UITs) | Tasa |
| :--- | :--- |
| Hasta 5 UIT | 8% |
| De 5 a 20 UIT | 14% |
| De 20 a 35 UIT | 17% |
| De 35 a 45 UIT | 20% |
| Más de 45 UIT | 30% |

```ts
import { calculateIncomeTax } from "planilla-pe";

const result = calculateIncomeTax({
  salary: 10000,
  pensionSystem: "AFP",
  afpType: "integra",
});

// result.annualGross  => ingreso anual proyectado
// result.deduction    => deducción de 7 UITs (S/ 38,500 en 2026)
// result.taxableBase  => base imponible
// result.annualTax    => impuesto anual
// result.monthlyTax   => retención mensual
```

> ⚠️ **Aproximación:** Esta función estima la retención mensual dividiendo el impuesto anual entre 12. No replica el algoritmo acumulativo mensual de SUNAT (que ajusta mes a mes según lo ya retenido). Úsala para cálculos orientativos.

---

### `calculateCTS`

Calcula la **Compensación por Tiempo de Servicios** semestral. Incluye el 1/6 de la gratificación en la remuneración computable, según el art. 9 del D.S. 001-97-TR.

```ts
import { calculateCTS } from "planilla-pe";

calculateCTS(2000);              // Régimen General => S/ 1,166.67
calculateCTS(2000, "PEQUENA");  // Pequeña empresa => S/ 583.33
calculateCTS(2000, "MICRO");    // Microempresa    => 0
```

> **Nota:** Asume que el trabajador complotó el semestre completo (6 meses). Para cálculos proporcionales usa `calculateTermination` con `monthsWorked`.

---

### `calculateGratification`

Calcula la **Gratificación de Fiestas Patrias o Navidad** más la **Bonificación Extraordinaria** (Essalud 9% o EPS 6.75%).

```ts
import { calculateGratification } from "planilla-pe";

calculateGratification(3000);             // S/ 3,270  (con Essalud 9%)
calculateGratification(3000, true);       // S/ 3,202.50 (con EPS 6.75%)
calculateGratification(3000, false, "PEQUENA"); // S/ 1,635  (50%)
calculateGratification(3000, false, "MICRO");   // 0
```

---

### `calculateVacations`

Calcula el **pago vacacional** según el régimen. El Régimen General tiene 30 días; Pequeña Empresa y Micro Empresa tienen 15 días.

```ts
import { calculateVacations, calculateTruncatedVacations } from "planilla-pe";

// Vacaciones completas
calculateVacations(3000);             // { days: 30, total: 3000 }
calculateVacations(3000, "PEQUENA"); // { days: 15, total: 1500 }

// Vacaciones truncas (proporcional a meses trabajados)
calculateTruncatedVacations(3000, 5);  // 5 meses trabajados => S/ 1,250
```

---

### `calculateTermination`

Calcula la **liquidación completa** de un trabajador al cese, incluyendo beneficios truncos de CTS, gratificación y vacaciones.

```ts
import { calculateTermination } from "planilla-pe";

const result = calculateTermination({
  salary: 2500,
  pensionSystem: "ONP",
  regime: "GENERAL",
  monthsWorked: 4, // meses trabajados en el periodo
});

// result.gross                 => sueldo bruto computable
// result.truncatedGratification => gratificación proporcional
// result.truncatedCTS          => CTS proporcional
// result.truncatedVacations    => vacaciones proporcionales
// result.total                 => total a liquidar
```

---

### `calculateOvertime`

Calcula el pago por **horas extras** según el Decreto Legislativo 854. Las primeras 2 horas tienen sobretasa del 25%; las siguientes del 35%.

```ts
import { calculateOvertime } from "planilla-pe";

const result = calculateOvertime(3000, 2, 3);
// Tasa horaria: 3000 / 30 / 8 = 12.5
// result.hourRate  => 12.5
// result.total25   => 31.25   (2h × 12.5 × 1.25)
// result.total35   => 50.63   (3h × 12.5 × 1.35)
// result.total     => 81.88
```

---

### `calculateNightSurcharge`

Calcula el **recargo nocturno**. Por ley, el sueldo mínimo para turno nocturno (10 PM – 6 AM) es la RMV + 35%.

```ts
import { calculateNightSurcharge } from "planilla-pe";

const result = calculateNightSurcharge(1200);
// result.nightMinimum => S/ 1,525.50  (1130 × 1.35)
// result.surcharge    => S/ 325.50    (diferencia a cubrir)
```

---

### `calculateAFP` / `calculateONP`

Funciones base de pensiones. `calculateAFP` devuelve un **desglose completo** con fondo, comisión y seguro. `calculateONP` devuelve el total (13% fijo).

```ts
import { calculateAFP, calculateONP } from "planilla-pe";

const afp = calculateAFP(2000, "prima");
// afp.fondo    => 200   (10.00% — aporte al fondo)
// afp.comision => 33.8  (1.69%  — comisión AFP Prima)
// afp.seguro   => 36.8  (1.84%  — prima de seguro)
// afp.total    => 270.6 (13.53% total)

const afpH = calculateAFP(2000, "habitat");
// afpH.total   => 261   (13.05%: 10% + 1.47% + 1.58%)

calculateONP(2000); // 260 (13% fijo)
```

**Tasas AFP vigentes (comisión flujo, referencia SBS 2026):**

| AFP | Fondo | Comisión | Seguro | Total |
| :--- | :---: | :---: | :---: | :---: |
| **Integra** | 10.00% | 1.55% | 1.74% | 13.29% |
| **Prima** | 10.00% | 1.69% | 1.84% | 13.53% |
| **Profuturo** | 10.00% | 1.69% | 1.84% | 13.53% |
| **Habitat** | 10.00% | 1.47% | 1.58% | 13.05% |

> Las tasas varían mensualmente según publicación de la SBS. ONP es 13% fijo por ley.

> ⚠️ **Limitación:** Esta librería solo implementa la **comisión por flujo**. No soporta la comisión mixta (saldo + flujo), que aplica a trabajadores afiliados bajo ese esquema. Soporte para comisión mixta está planificado para una versión futura.

---

### `generateBoletaText`

Genera un **resumen de boleta de pago** en texto plano formateado, listo para mostrar o imprimir.

```ts
import { calculatePayroll, generateBoletaText } from "planilla-pe";

const payroll = calculatePayroll({ salary: 2000, pensionSystem: "ONP" });
const boleta = generateBoletaText(payroll, "Ana García");
console.log(boleta);
```

---

## Tipos

```ts
import type { EmployeeInput, PensionSystem, WorkRegime } from "planilla-pe";

const employee: EmployeeInput = {
  salary: 3500,              // Sueldo básico mensual (S/) — sin asignación familiar
                             //   result.gross incluirá la asig. familiar si se activa
  pensionSystem: "AFP",      // "AFP" | "ONP"
  afpType: "integra",        // "integra" | "prima" | "profuturo" | "habitat" (solo si AFP)
  familyAllowance: true,     // Asignación familiar (10% RMV) — se suma al bruto
  hasEPS: false,             // Seguro de salud privado (EPS) — cambia tasa de gratificación
  regime: "GENERAL",         // "GENERAL" | "PEQUENA" | "MICRO"
  year: 2026,                // Año para cálculos históricos (opcional, por defecto 2026)
};
```

---

## Constantes

Todas las constantes están tipadas y exportadas para que puedas usarlas en tus propios cálculos.

```ts
import {
  UIT,              // S/ 5,500  (2026)
  RMV,              // S/ 1,130  (2026)
  FAMILY_ALLOWANCE, // S/ 113    (10% de RMV)
  IGV,              // 0.18      (18%)
  ESSALUD,          // 0.09      (9%)
  ONP_RATE,         // 0.13      (13%)
  AFP_RATES,        // { integra, prima, profuturo, habitat }
  LIMITS_BY_YEAR,   // Valores históricos por año
  getLimits,        // getLimits(year) => { UIT, RMV }
} from "planilla-pe";

// Consultar valores de otro año
const limits2024 = getLimits(2024);
// => { UIT: 5150, RMV: 1025 }
```

---

## Regímenes Laborales

| Régimen | Gratificación | CTS | Vacaciones | Aporte Salud |
| :--- | :---: | :---: | :---: | :---: |
| **GENERAL** | 1 sueldo | ~1 sueldo | 30 días | Essalud 9% |
| **PEQUENA** | 0.5 sueldos | 0.5 sueldos | 15 días | Essalud 9% |
| **MICRO** | Sin derecho | Sin derecho | 15 días | Sin Essalud (puede afiliar SIS) |

> Fuente: Ley 28015 (Micro Empresa) y Ley 30056 (Pequeña Empresa).

---

## Cálculos Históricos

La librería permite usar los valores de UIT y RMV de años anteriores pasando el campo `year` en el input.

```ts
import { calculatePayroll, getLimits } from "planilla-pe";

// Con valores de 2024
const result = calculatePayroll({
  salary: 1500,
  pensionSystem: "ONP",
  familyAllowance: true,
  year: 2024, // UIT: 5150, RMV: 1025
});

// Consultar valores directamente
const { UIT, RMV } = getLimits(2025);
// => { UIT: 5350, RMV: 1130 }
```

| Año | UIT | RMV |
| :---: | :---: | :---: |
| 2024 | S/ 5,150 | S/ 1,025 |
| 2025 | S/ 5,350 | S/ 1,130 |
| 2026 | S/ 5,500 | S/ 1,130 |

---

## Testing

La librería cuenta con 31 tests unitarios cubriendo todos los calculadores y casos borde.

```bash
npm run test        # ejecutar tests
npm run test:watch  # modo observador
npm run lint        # verificar código
npm run build       # compilar para producción
```

**Sobre el redondeo:** La librería usa redondeo matemático estándar (`Math.round`) a 2 decimales en todos los cálculos. AFP y SUNAT pueden aplicar reglas de redondeo específicas que pueden generar diferencias de ±0.01 en escenarios reales.

---

## Contribución

Revisa [CONTRIBUTING.md](CONTRIBUTING.md) y [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) antes de enviar un PR.

---

## Licencia

MIT © [Franco Caballero](https://francocaballero.dev)