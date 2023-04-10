import { AtLeastOne } from "types/UtilityTypes";

// From https://stackoverflow.com/a/55266531
export default function exhaustiveStringArray<T extends string>() {
  return <L extends AtLeastOne<T>>(
    ...x: L extends any
      ? Exclude<T, L[number]> extends never
        ? L
        : Array<Exclude<T, L[number]>>
      : never
  ) => x;
}
