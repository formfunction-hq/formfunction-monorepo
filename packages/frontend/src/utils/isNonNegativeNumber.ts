export default function isNonNegativeNumber(val: string): boolean {
  return !Number.isNaN(Number(val)) && Number(val) >= 0;
}
