export function round(value: number, decimals = 2): number {
  return Number(Math.round(Number(value + "e" + decimals)) + "e-" + decimals);
}