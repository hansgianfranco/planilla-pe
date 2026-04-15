import { describe, it, expect } from "vitest";
import { calculateNetSalary } from "../src";

describe("calculateNetSalary", () => {
  it("should calculate ONP correctly", () => {
    const result = calculateNetSalary({
      salary: 1000,
      pensionSystem: "ONP",
    });

    expect(result.pension).toBe(130);
    expect(result.net).toBe(870);
  });

  it("should calculate AFP correctly", () => {
    const result = calculateNetSalary({
      salary: 1000,
      pensionSystem: "AFP",
      afpType: "prima",
    });

    expect(result.pension).toBe(130);
    expect(result.net).toBe(870);
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