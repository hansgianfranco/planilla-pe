import { describe, it, expect } from "vitest";
import {
  IGV,
  ESSALUD,
  ONP_RATE,
  UIT,
  RMV,
  FAMILY_ALLOWANCE
} from "../src";

describe("constants", () => {
  it("should have correct IGV", () => {
    expect(IGV).toBe(0.18);
  });

  it("should have correct ESSALUD", () => {
    expect(ESSALUD).toBe(0.09);
  });

  it("should have correct ONP rate", () => {
    expect(ONP_RATE).toBe(0.13);
  });

  it("should calculate family allowance from RMV", () => {
    expect(FAMILY_ALLOWANCE).toBe(RMV * 0.1);
  });

  it("should have UIT defined", () => {
    expect(UIT).toBeGreaterThan(0);
  });
});