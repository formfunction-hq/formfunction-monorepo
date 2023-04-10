export default function arrayIntersect<T>(
  arr1: Array<T>,
  arr2: Array<T>
): Array<T> {
  return arr1.filter((item) => arr2.includes(item));
}
