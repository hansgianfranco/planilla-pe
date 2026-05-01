# planilla-pe

Utilidades de planilla para Perú en **TypeScript**.
Calcula sueldo neto, AFP/ONP, CTS, gratificaciones y aportes de forma simple y tipada.
Actualizado a valores **2026**.

---

## Instalación

```bash
npm install planilla-pe
```

---

## Características

* Enfocado en normativa peruana (Actualizado 2026)
* Cálculo de sueldo neto (AFP / ONP)
* CTS (Compensación por Tiempo de Servicios) corregido con 1/6 de gratificación
* Gratificaciones con Bonificación Extraordinaria (Essalud / EPS)
* Asignación familiar dinámica (10% de la RMV)
* Soporte para EPS (Entidades Prestadoras de Salud)
* Redondeo financiero de 2 decimales integrado
* Tipado fuerte con TypeScript
* Sin dependencias
* Modular y extensible

---

## Uso básico

```ts
import { calculatePayroll } from "planilla-pe";

const result = calculatePayroll({
  salary: 2000,
  pensionSystem: "AFP",
  afpType: "prima",
  familyAllowance: true,
});

console.log(result);
```

### Resultado (Valores 2026)

```ts
{
  gross: 2113,
  net: 1838.31,
  deductions: {
    pension: 274.69,
    total: 274.69
  },
  contributions: {
    essalud: 190.17,
    total: 190.17
  }
}
```

---

## Funciones disponibles

### `calculatePayroll`

Cálculo completo de planilla.

```ts
calculatePayroll(input: EmployeeInput)
```

---

### `calculateNetSalary`

Calcula sueldo neto directamente.

```ts
import { calculateNetSalary } from "planilla-pe";

calculateNetSalary({
  salary: 1500,
  pensionSystem: "ONP",
});
```

---

### `calculateCTS`

Calcula la CTS semestral incluyendo el 1/6 de la gratificación proyectada.

```ts
import { calculateCTS } from "planilla-pe";

calculateCTS(2000); // 1166.67
```

---

### `calculateGratification`

Calcula gratificación más bonificación extraordinaria (9% Essalud o 6.75% EPS).

```ts
import { calculateGratification } from "planilla-pe";

calculateGratification(1000); // 1090
calculateGratification(1000, true); // 1067.5 (con EPS)
```

---

### AFP / ONP

```ts
import { calculateAFP, calculateONP } from "planilla-pe";

calculateAFP(1000, "prima");
calculateONP(1000);
```

---

## Tipos

```ts
import type { EmployeeInput } from "planilla-pe";

const employee: EmployeeInput = {
  salary: 2000,
  pensionSystem: "AFP",
  afpType: "habitat",
  familyAllowance: true,
  hasEPS: false,
};
```

---

## Constantes (2026)

```ts
import {
  UIT,
  RMV,
  FAMILY_ALLOWANCE,
  IGV,
  ESSALUD
} from "planilla-pe";

// Valores 2026
// UIT = 5500
// RMV = 1130
// FAMILY_ALLOWANCE = 113
```

---

## Estructura

```bash
src/
  core/
  calculators/
  constants/
  types/
  utils/
```

---

## Valores por defecto (2026)

```ts
UIT = 5500;              // Unidad Impositiva Tributaria (base para impuestos)
RMV = 1130;              // Remuneración Mínima Vital (sueldo mínimo)
FAMILY_ALLOWANCE = 113;  // Asignación familiar (10% de la RMV)

IGV = 0.18;              // Impuesto General a las Ventas (18%)
ESSALUD = 0.09;          // Aporte del empleador a salud (9%)
ONP_RATE = 0.13;         // Aporte al sistema público de pensiones (13%)

AFP_RATES = {
  integra: 0.13,        // Tasa referencial AFP Integra
  prima: 0.13,          // Tasa referencial AFP Prima
  profuturo: 0.13,      // Tasa referencial AFP Profuturo
  habitat: 0.13,        // Tasa referencial AFP Habitat
};
```

---

## Notas

* Las tasas de AFP son **referenciales** (promedio 13%) y pueden variar mensualmente.
* La RMV y UIT están actualizadas al periodo fiscal **2026**.
* Esta librería es ideal para cálculos y simulaciones, no reemplaza asesoría contable profesional.

---

## Testing

```bash
npm run test
```

---

## Build

```bash
npm run build
```

---

## Contribución

Damos la bienvenida a contribuciones de la comunidad 🙌

Antes de contribuir, por favor revisa:

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

---

## Licencia

MIT © Franco Caballero