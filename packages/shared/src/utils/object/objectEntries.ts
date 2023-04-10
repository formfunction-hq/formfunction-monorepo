/**
 * This module is adapted from https://github.com/m59peacemaker/js-object.entries
 */

function has<K extends PropertyKey, V>(obj: Record<K, V>, prop: any) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function isEnumerable<K extends PropertyKey, V>(obj: Record<K, V>, prop: any) {
  return Object.prototype.propertyIsEnumerable.call(obj, prop);
}

export default function objectEntries<K extends PropertyKey, V = any>(
  obj: Record<K, V>
): Array<[K, V]> {
  const pairs: Array<[K, V]> = [];
  for (const key in obj) {
    if (has(obj, key) && isEnumerable(obj, key)) {
      pairs.push([key, obj[key]]);
    }
  }

  return pairs;
}
