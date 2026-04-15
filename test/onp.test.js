import { describe, it, expect } from "vitest";
import { calculateONP } from "../src";

describe("calculateONP", () => {
  it("should calculate ONP correctly", () => {
    expect(calculateONP(1000)).toBe(130);
  });
});