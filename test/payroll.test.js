import { describe, it, expect } from "vitest";
import { calculatePayroll } from "../src";

describe("calculatePayroll", () => {
  it("should calculate payroll with ONP", () => {
    const result = calculatePayroll({
      salary: 1000,
      pensionSystem: "ONP",
    });

    expect(result.gross).toBe(1000);
    expect(result.deductions.pension).toBe(130);
    expect(result.net).toBe(870);
  });

  it("should calculate payroll with AFP", () => {
    const result = calculatePayroll({
      salary: 2000,
      pensionSystem: "AFP",
      afpType: "habitat",
    });

    expect(result.deductions.pension).toBe(260);
    expect(result.net).toBe(1740);
  });

  it("should include employer contributions", () => {
    const result = calculatePayroll({
      salary: 1000,
      pensionSystem: "ONP",
    });

    expect(result.contributions.essalud).toBe(90);
  });

  it("should include family allowance", () => {
    const result = calculatePayroll({
      salary: 1000,
      pensionSystem: "ONP",
      familyAllowance: true,
    });

    expect(result.gross).toBe(1113);
    expect(result.deductions.pension).toBe(144.69);
    expect(result.net).toBe(968.31);
  });
});