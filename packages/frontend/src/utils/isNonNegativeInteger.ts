export default function isNonNegativeInteger(val: string): boolean {
  return Number.isInteger(Number(val)) && Number(val) >= 0;
}
