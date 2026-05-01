import { round } from "../utils/rounding";
import { WorkRegime } from "../types/employee";

export function calculateVacations(monthlyGross: number, regime: WorkRegime = "GENERAL") {
  let days = 30;
  if (regime === "PEQUENA" || regime === "MICRO") {
    days = 15;
  }
  
  const dayRate = monthlyGross / 30;
  const total = round(dayRate * days);
  
  return {
    days,
    total,
  };
}

export function calculateTruncatedVacations(monthlyGross: number, monthsWorked: number, regime: WorkRegime = "GENERAL") {
  const annualVacation = calculateVacations(monthlyGross, regime).total;
  const total = round((annualVacation / 12) * monthsWorked);
  
  return {
    monthsWorked,
    total,
  };
}
