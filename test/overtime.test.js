import { describe, it, expect } from "vitest";
import { calculateOvertime, calculateNightSurcharge } from "../src";

describe("Overtime and Night Surcharge", () => {
  it("should calculate overtime correctly", () => {
    const result = calculateOvertime(3000, 2, 2);
    // Hour rate: 3000 / 30 / 8 = 12.5
    // 25%: 12.5 * 1.25 * 2 = 31.25
    // 35%: 12.5 * 1.35 * 2 = 33.75
    // Total: 65
    expect(result.total).toBe(65);
  });

  it("should calculate night surcharge correctly (2026)", () => {
    const result = calculateNightSurcharge(1200);
    // RMV 1130 * 1.35 = 1525.5
    // Surcharge = 1525.5 - 1200 = 325.5
    expect(result.surcharge).toBe(325.5);
  });
});
