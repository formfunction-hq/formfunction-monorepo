export default function isPositiveNumber(val: string): boolean {
  return !Number.isNaN(Number(val)) && Number(val) > 0;
}
