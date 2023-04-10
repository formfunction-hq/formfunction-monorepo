import invariant from "tiny-invariant";

export default function batchArray<T>(
  arr: ReadonlyArray<T>,
  batchSize: number
): Array<Array<T>> {
  invariant(batchSize > 0);

  const result = [];
  for (let i = 0; i < arr.length; i += batchSize) {
    result.push(arr.slice(i, i + batchSize));
  }

  return result;
}
