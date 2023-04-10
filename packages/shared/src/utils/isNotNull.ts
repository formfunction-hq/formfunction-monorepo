import { MaybeUndef } from "types/UtilityTypes";

/**
 * Mainly meant to be passed to Array.filter, because TypeScript isn't
 * smart enough to figure things out when you just do something like
 * filter((val) => val != null).
 *
 * Gotten from https://stackoverflow.com/questions/43118692/typescript-filter-out-nulls-from-an-array.
 */
export default function isNotNull<TValue>(
  value: MaybeUndef<TValue>
): value is TValue {
  return value != null;
}
