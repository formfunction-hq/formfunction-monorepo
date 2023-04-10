export default function isNumber(
  val: string | number,
  convertFn?: (val: string) => number
): boolean {
  return !Number.isNaN(
    convertFn == null || typeof val === "number" ? Number(val) : convertFn(val)
  );
}
