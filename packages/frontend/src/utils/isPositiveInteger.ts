export default function isPositiveInteger(val: string): boolean {
  return Number.isInteger(Number(val)) && Number(val) > 0;
}
