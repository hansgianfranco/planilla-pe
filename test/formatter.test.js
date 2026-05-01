import { describe, it, expect } from "vitest";
import { generateBoletaText, calculatePayroll } from "../src";

describe("Formatter", () => {
  it("should generate boleta text", () => {
    const payroll = calculatePayroll({
      salary: 1500,
      pensionSystem: "ONP"
    });
    const text = generateBoletaText(payroll, "Juan Perez");
    expect(text).toContain("Juan Perez");
    expect(text).toContain("NETO A PAGAR");
  });
});
