import { describe, it, expect } from "vitest";
import { calculateNetSalary } from "../src";

describe("calculateNetSalary", () => {
  it("should calculate ONP correctly", () => {
    const result = calculateNetSalary({
      salary: 1000,
      pensionSystem: "ONP",
    });

    expect(result.pension).toBe(130);  // 1000 * 13% = 130
    expect(result.net).toBe(870);
  });

  it("should calculate AFP prima correctly", () => {
    const result = calculateNetSalary({
      salary: 1000,
      pensionSystem: "AFP",
      afpType: "prima",
    });

    // prima: 10% + 1.69% + 1.84% = 13.53%
    expect(result.pension).toBe(135.3);
    expect(result.net).toBe(864.7);
  });

  it("should calculate AFP integra correctly", () => {
    const result = calculateNetSalary({
      salary: 1000,
      pensionSystem: "AFP",
      afpType: "integra",
    });

    // integra: 10% + 1.55% + 1.74% = 13.29%
    expect(result.pension).toBe(132.9);
    expect(result.net).toBe(867.1);
  });

  it("should return 0 pension if AFP type is missing", () => {
    const result = calculateNetSalary({
      salary: 1000,
      pensionSystem: "AFP",
    });

    expect(result.pension).toBe(0);
    expect(result.net).toBe(1000);
  });
});