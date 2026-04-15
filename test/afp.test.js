import { describe, it, expect } from "vitest";
import { calculateAFP } from "../src";

describe("calculateAFP", () => {
  it("should calculate AFP for prima", () => {
    expect(calculateAFP(1000, "prima")).toBe(130);
  });

  it("should calculate AFP for habitat", () => {
    expect(calculateAFP(2000, "habitat")).toBe(260);
  });
});