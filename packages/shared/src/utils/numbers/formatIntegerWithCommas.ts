// E.g. 10000 -> 10,000
export default function formatIntegerWithCommas(int: number): string {
  return int.toLocaleString();
}
