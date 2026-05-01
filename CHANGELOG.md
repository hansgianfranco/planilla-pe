# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
