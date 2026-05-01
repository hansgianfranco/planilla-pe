import { describe, it, expect } from "vitest";
import { calculatePayroll } from "../src";

describe("Work Regimes", () => {
  it("should calculate correctly for MICRO regime", () => {
    const result = calculatePayroll({
      salary: 2000,
      pensionSystem: "ONP",
      regime: "MICRO"
    });
    
    // En MICRO no hay Essalud obligatorio
    expect(result.contributions.essalud).toBe(0);
    expect(result.contributions.total).toBe(0);
  });

  it("should calculate correctly for PEQUENA regime", () => {
    const result = calculatePayroll({
      salary: 2000,
      pensionSystem: "ONP",
      regime: "PEQUENA"
    });
    
    // Essalud es el mismo (9%)
    expect(result.contributions.essalud).toBe(180);
  });
});
