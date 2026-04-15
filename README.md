# 📦 planilla-pe

Utilidades de planilla para Perú en **TypeScript**.
Calcula sueldo neto, AFP/ONP, CTS, gratificaciones y aportes de forma simple y tipada.

---

## 🚀 Instalación

```bash
npm install planilla-pe
```

---

## ✨ Características

* Enfocado en normativa peruana
* Cálculo de sueldo neto (AFP / ONP)
* CTS (Compensación por Tiempo de Servicios)
* Gratificaciones con Essalud
* Asignación familiar
* Tipado fuerte con TypeScript
* Sin dependencias
* Modular y extensible

---

## 📌 Uso básico

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

### Resultado

```ts
{
  gross: 2102.5,
  net: 1832.175,
  deductions: {
    pension: 270.325,
    total: 270.325
  },
  contributions: {
    essalud: 189.225,
    total: 189.225
  }
}
```

---

## 🧮 Funciones disponibles

### 🔹 `calculatePayroll`

Cálculo completo de planilla.

```ts
calculatePayroll(input: EmployeeInput)
```

---

### 🔹 `calculateNetSalary`

Calcula sueldo neto directamente.

```ts
import { calculateNetSalary } from "planilla-pe";

calculateNetSalary({
  salary: 1500,
  pensionSystem: "ONP",
});
```

---

### 🔹 `calculateCTS`

```ts
import { calculateCTS } from "planilla-pe";

calculateCTS(2000); // 1000
```

---

### 🔹 `calculateGratification`

```ts
import { calculateGratification } from "planilla-pe";

calculateGratification(1000); // 1090
```

---

### 🔹 AFP / ONP

```ts
import { calculateAFP, calculateONP } from "planilla-pe";

calculateAFP(1000, "prima");
calculateONP(1000);
```

---

## 🧠 Tipos

```ts
import type { EmployeeInput } from "planilla-pe";

const employee: EmployeeInput = {
  salary: 2000,
  pensionSystem: "AFP",
  afpType: "habitat",
  familyAllowance: true,
};
```

---

## 📊 Constantes

```ts
import {
  UIT,
  RMV,
  FAMILY_ALLOWANCE,
  IGV,
  ESSALUD
} from "planilla-pe";
```

---

## 📁 Estructura

```bash
src/
  core/
  calculators/
  constants/
  types/
```

---

## 📊 Constantes

```ts
UIT = 5150;              // Unidad Impositiva Tributaria (base para impuestos)
RMV = 1025;              // Remuneración Mínima Vital (sueldo mínimo)
FAMILY_ALLOWANCE = 102.5; // Asignación familiar (10% de la RMV)

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

## ⚠️ Notas

* Las tasas de AFP son **referenciales** y pueden variar.
* La RMV y UIT pueden cambiar según normativa vigente.
* Esta librería es ideal para cálculos y simulaciones, no reemplaza asesoría contable.

---

## 🧪 Testing

```bash
npm run test
```

---

## 📦 Build

```bash
npm run build
```

---

## 🤝 Contribución

Damos la bienvenida a contribuciones de la comunidad 🙌

Antes de contribuir, por favor revisa:

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

Todas las contribuciones deben seguir las guías del proyecto y mantener la calidad y consistencia del código.

---

## 🔐 Seguridad

Si encuentras una vulnerabilidad de seguridad, por favor NO abras un issue público.

Lee la política de seguridad aquí:

- [SECURITY.md](SECURITY.md)

Reporta las vulnerabilidades de forma responsable siguiendo las instrucciones del archivo.

---

## 💬 Soporte

¿Necesitas ayuda o tienes dudas?

- Abre un issue: https://github.com/hansgianfranco/sunat-utils/issues
- Revisa la documentación en el README
- Consulta los ejemplos del repositorio

## 📄 Licencia

MIT © Franco Caballero

---