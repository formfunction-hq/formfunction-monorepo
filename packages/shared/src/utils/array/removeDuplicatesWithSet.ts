type Input = string | number | boolean | null | undefined;

export default function removeDuplicatesWithSet<T extends Input>(
  arr: Array<T>
): Array<T> {
  return [...new Set(arr)];
}
