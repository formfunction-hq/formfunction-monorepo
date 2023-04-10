export default async function asyncFilter<T>(
  arr: Array<T>,
  fn: (val: T) => Promise<boolean>
): Promise<Array<T>> {
  const mapped = await Promise.all(arr.map((val) => fn(val)));
  return arr.filter((_, index) => mapped[index]);
}
