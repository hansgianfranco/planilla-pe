import { describe, it, expect } from "vitest";
import { calculateGratification } from "../src";

describe("calculateGratification", () => {
  it("should include Essalud bonus", () => {
    const result = calculateGratification(1000);

    expect(result).toBe(1090);
  });
});