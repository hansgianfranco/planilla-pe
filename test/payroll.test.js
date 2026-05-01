import { describe, it, expect } from "vitest";
import { calculatePayroll } from "../src";

describe("calculatePayroll", () => {
  it("should calculate payroll with ONP", () => {
    const result = calculatePayroll({
      salary: 1000,
      pensionSystem: "ONP",
    });

    expect(result.gross).toBe(1000);
    expect(result.deductions.pension).toBe(130);   // 1000 * 13% ONP
    expect(result.net).toBe(870);
    expect(result.deductions.afpBreakdown).toBeUndefined();
  });

  it("should calculate payroll with AFP habitat and return breakdown", () => {
    const result = calculatePayroll({
      salary: 2000,
      pensionSystem: "AFP",
      afpType: "habitat",
    });

    // habitat: 10% + 1.47% + 1.58% = 13.05%  => 261 sobre 2000
    expect(result.deductions.pension).toBe(261);
    expect(result.deductions.afpBreakdown?.fondo).toBe(200);
    expect(result.deductions.afpBreakdown?.comision).toBe(29.4);
    expect(result.deductions.afpBreakdown?.seguro).toBe(31.6);
    expect(result.net).toBe(1739);
  });

  it("should include employer contributions (Essalud)", () => {
    const result = calculatePayroll({
      salary: 1000,
      pensionSystem: "ONP",
    });

    expect(result.contributions.essalud).toBe(90);
  });

  it("should include family allowance in gross", () => {
    const result = calculatePayroll({
      salary: 1000,
      pensionSystem: "ONP",
      familyAllowance: true,
    });

    expect(result.gross).toBe(1113);  // 1000 + 113 (10% RMV 1130)
    expect(result.deductions.pension).toBe(144.69); // 1113 * 13%
    expect(result.net).toBe(968.31);
  });
});