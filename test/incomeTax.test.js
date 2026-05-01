import { describe, it, expect } from "vitest";
import { calculateIncomeTax } from "../src";

function round(value, decimals = 2) {
  return Number(Math.round(Number(value + "e" + decimals)) + "e-" + decimals);
}

describe("calculateIncomeTax", () => {
  it("should return 0 tax for salary below deduction threshold", () => {
    const result = calculateIncomeTax({
      salary: 1000,
      pensionSystem: "ONP",
    });
    expect(result.monthlyTax).toBe(0);
    expect(result.taxableBase).toBe(0);
  });

  it("should calculate tax for high salary (2026 values)", () => {
    // Salary 10,000 (no family allowance)
    // Annual Gross = 10,000 * 12 + 10,000 * 2 = 140,000
    // Deduction = 7 * 5500 = 38,500
    // Taxable Base = 101,500
    // Bracket 1: 8% of 5*5500=27,500 => 2,200
    // Bracket 2: 14% of (101,500-27,500)=74,000 (< 15*5500=82,500) => 10,360
    // Total annual tax = 12,560
    const result = calculateIncomeTax({
      salary: 10000,
      pensionSystem: "AFP",
      afpType: "integra",
    });

    expect(result.annualGross).toBe(140000);
    expect(result.deduction).toBe(38500);
    expect(result.taxableBase).toBe(101500);
    expect(result.annualTax).toBe(12560);
    expect(result.monthlyTax).toBe(round(12560 / 12));
  });
});
