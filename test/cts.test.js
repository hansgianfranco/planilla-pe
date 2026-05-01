import { describe, it, expect } from "vitest";
import { calculateCTS } from "../src";

describe("calculateCTS", () => {
  it("should calculate CTS correctly", () => {
    expect(calculateCTS(2000)).toBeCloseTo(1166.67, 2);
  });

  it("should handle zero salary", () => {
    expect(calculateCTS(0)).toBe(0);
  });
});