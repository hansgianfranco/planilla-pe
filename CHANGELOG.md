# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-05-01

### Added
- **Real AFP Rates & Breakdown:** Implemented real SBS rates (fondo 10% + comision + seguro) for Integra, Prima, Profuturo, and Habitat.
- **Detailed Pension Display:** `calculateAFP` now returns a breakdown object, and `generateBoletaText` displays fondo, comision, and seguro separately.

### Fixed
- **Income Tax Logic:** Fixed taxable base calculation to exclude the gratification bonus (Essalud/EPS) per SUNAT rules.
- **Family Allowance Bug:** Resolved double-counting of family allowance in payroll deductions when overtime was present.
- **Termination Formulas:** Corrected truncated gratification and CTS calculation (switched from 12 to 6 months divisor for semestral benefits).
- **Historical Accuracy:** `calculateGrossSalary` now correctly uses the historical RMV for family allowance based on the `year` parameter.
- **Micro-regime contributions:** Removed hardcoded SIS fee for MICRO regime, setting it to 0 to reflect that it's an optional employer cost.
- **Documentation:** Added essential disclaimers regarding technical limitations (5ta category approximation, flow commission only, and rounding precision).

### Changed
- **API Breaking Change:** `calculateAFP` now returns an object `{ fondo, comision, seguro, total }` instead of a flat number.
- **Clean Code:** Removed unused imports and variables across the library (lint fix).


## [1.1.0] - 2026-05-01

### Added
- **Income Tax (5ta Categoría):** Automatic calculation based on annual projection and legal brackets.
- **Work Regimes:** Support for **GENERAL**, **PEQUENA**, and **MICRO** regimes (REMYPE).
- **Termination Calculator:** Function to calculate truncated benefits (CTS, Gratification, Vacations) upon contract termination.
- **Overtime & Night Shift:** New calculators for 25%/35% surcharges and night shift bonuses.
- **Vacation Calculator:** Support for 30-day and 15-day vacation periods based on regime.
- **Historical Support:** Capability to perform calculations using 2024 and 2025 values.
- **Formatter Utility:** `generateBoletaText` for structured pay slip summaries.

### Changed
- Refactored `calculatePayroll` to handle regimes, overtime, and income tax in a single call.
- Updated `calculateCTS`, `calculateGratification`, and `calculateEmployerContributions` to respect work regimes.
- Updated `LIMITS_BY_YEAR` to support multiple years of UIT and RMV.

### Fixed
- Improved backward compatibility for payroll result properties.
- Enhanced precision in complex annual projections.

## [1.0.1] - 2026-05-01

### Added
- Support for **EPS** (Entidades Prestadoras de Salud) in `EmployeeInput`.
- Bonus rate logic for gratification when EPS is enabled (6.75% instead of 9%).
- Financial rounding utility to ensure 2 decimal places in all results.
- Enhanced `README.md` with 2026 examples and detailed usage instructions.

### Changed
- **Legal Updates (2026):**
  - Updated `UIT` to **S/ 5,500**.
  - Updated `RMV` to **S/ 1,130**.
  - Updated `FAMILY_ALLOWANCE` to **S/ 113**.
- **CTS Formula:** Now correctly includes 1/6 of the gratification in the computable remuneration.
- **Deduction Logic:** AFP and ONP deductions are now calculated over the **Gross Salary** (base + family allowance) instead of just the base salary.

### Fixed
- Precision issues with floating point calculations in pension and contribution results.
- Logic bug where family allowance was ignored for pension deductions.
- Incorrect CTS calculation that was underestimating the legal amount.

## [1.0.0] - 2026-04-20

### Added
- Initial release.
- Core calculators for Payroll, Net Salary, CTS, and Gratification.
- Basic support for AFP and ONP.
- Family allowance support.
- TypeScript definitions.
