import { Maybe } from "types/UtilityTypes";

export default async function findAsync<T>(
  array: Array<T>,
  predicate: (t: T) => Promise<boolean>
): Promise<Maybe<T>> {
  for (const element of array) {
    if (await predicate(element)) {
      return element;
    }
  }

  return null;
}
