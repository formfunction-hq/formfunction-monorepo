export default function flattenArrayOfObjectsToObject<K extends PropertyKey, V>(
  arr: Array<Record<K, V>>
): Record<K, V> {
  return Object.assign({}, ...arr);
}
