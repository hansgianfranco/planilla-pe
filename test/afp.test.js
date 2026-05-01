import { describe, it, expect } from "vitest";
import { calculateAFP } from "../src";

describe("calculateAFP", () => {
  it("should return a breakdown object for prima", () => {
    const result = calculateAFP(1000, "prima");
    // prima: fondo 10% + comision 1.69% + seguro 1.84%
    expect(result.fondo).toBe(100);
    expect(result.comision).toBe(16.9);
    expect(result.seguro).toBe(18.4);
    expect(result.total).toBe(135.3);
  });

  it("should calculate correct total for habitat", () => {
    const result = calculateAFP(2000, "habitat");
    // habitat: fondo 10% + comision 1.47% + seguro 1.58%
    expect(result.fondo).toBe(200);
    expect(result.comision).toBe(29.4);
    expect(result.seguro).toBe(31.6);
    expect(result.total).toBe(261);
  });

  it("should calculate correct total for integra", () => {
    const result = calculateAFP(1000, "integra");
    // integra: fondo 10% + comision 1.55% + seguro 1.74%
    expect(result.fondo).toBe(100);
    expect(result.comision).toBe(15.5);
    expect(result.seguro).toBe(17.4);
    expect(result.total).toBe(132.9);
  });

  it("should calculate correct total for profuturo", () => {
    const result = calculateAFP(1000, "profuturo");
    // profuturo: same as prima
    expect(result.total).toBe(135.3);
  });
});