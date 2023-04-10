import { Maybe } from "types/UtilityTypes";

/**
 * Takes an array and groups its values by a key derived using `fn`
 *
 * e.g., groupBy(
 *   [
 *     {type: "1", name: "orange"},
 *     {type: "1", name: "apple"},
 *     {type: "2", name: "cake"}
 *   ],
 *   (o) => o.type
 * )
 *   => {"1": [{type: "1", name: "orange"}, {type: "1", name: "apple"}], "2": [{type:"2", name: "cake"}]}
 */
export default function groupBy<T>(
  arr: ReadonlyArray<T>,
  fn: (val: T) => Maybe<string>
): { [key: string]: Array<T> } {
  return arr.reduce((acc: { [key: string]: Array<T> }, curr) => {
    const keyVal = fn(curr);
    if (typeof keyVal !== "string") {
      return acc;
    }

    if (!(keyVal in acc)) {
      acc[keyVal] = [curr];
      return acc;
    }

    acc[keyVal].push(curr);
    return acc;
  }, {});
}
