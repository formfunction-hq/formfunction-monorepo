import objectEntries from "utils/object/objectEntries";
import objectFromEntries from "utils/object/objectFromEntries";

// NOTE: values should be unique, otherwise some key/value pairs
// will be lost
export default function objectSwapKeysAndValues<
  K extends PropertyKey,
  V extends PropertyKey
>(obj: Record<K, V>): Record<V, K> {
  const swapped: Array<[V, K]> = objectEntries(obj).map(([key, value]) => [
    value,
    key,
  ]);

  return objectFromEntries<V, K>(swapped);
}
