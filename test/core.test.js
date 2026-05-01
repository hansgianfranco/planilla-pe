import { describe, it, expect } from "vitest";
import {
  calculateGrossSalary,
  calculateDeductions,
  calculateEmployerContributions
} from "../src";

describe("core functions", () => {
  it("should calculate gross salary with family allowance", () => {
    const result = calculateGrossSalary({
      salary: 1000,
      pensionSystem: "ONP",
      familyAllowance: true,
    });

    expect(result).toBe(1113);
  });

  it("should calculate deductions", () => {
    const result = calculateDeductions({
      salary: 1000,
      pensionSystem: "ONP",
    });

    expect(result.total).toBe(130);
  });

  it("should calculate employer contributions", () => {
    const result = calculateEmployerContributions(1000);

    expect(result.essalud).toBe(90);
  });
});