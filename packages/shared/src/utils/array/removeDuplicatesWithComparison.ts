export default function removeDuplicatesWithComparison<T>(
  arr: Array<T>,
  compare: (val1: T, val2: T) => boolean
) {
  return arr.filter(
    (item1, pos) => arr.findIndex((item2) => compare(item1, item2)) === pos
  );
}
