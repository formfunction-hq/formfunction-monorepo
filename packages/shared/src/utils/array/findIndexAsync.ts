export default async function findIndexAsync<T>(
  array: Array<T>,
  predicate: (t: T) => Promise<boolean>
): Promise<number> {
  for (const [index, element] of array.entries()) {
    if (await predicate(element)) {
      return index;
    }
  }

  return -1;
}
