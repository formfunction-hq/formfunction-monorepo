import produce from "immer";

// eslint-disable-next-line @typescript-eslint/ban-types
export default function deleteProperties<T extends Object, K extends keyof T>(
  obj: T,
  keys: Array<K>
) {
  return produce(obj, (draft) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const key of keys) {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      delete draft[key];
    }
  });
}
