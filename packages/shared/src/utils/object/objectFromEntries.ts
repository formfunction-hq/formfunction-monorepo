/**
 * Object.fromEntries is not supported on all browsers, so implement it ourselves.
 *
 * See https://github.com/feross/fromentries for more info.
 */
export default function objectFromEntries<K extends PropertyKey, T = any>(
  entries: Iterable<readonly [K, T]>
): Record<K, T> {
  return [...entries].reduce((obj: Record<K, T>, [key, val]) => {
    obj[key] = val;
    return obj;
  }, {} as Record<K, T>);
}
