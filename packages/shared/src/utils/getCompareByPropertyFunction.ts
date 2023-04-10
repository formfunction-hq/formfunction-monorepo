import SortOrder from "types/enums/SortOrder";

type Comparable = string | number;

export default function getCompareByPropertyFunction<
  T extends { [key: string]: any },
  K extends keyof T
>(
  key: K,
  fn: (val: T[K]) => Comparable,
  order: SortOrder = SortOrder.Asc
): (firstEl: T, secondEl: T) => number {
  return (firstEl: T, secondEl: T) => {
    if (firstEl[key] == null) {
      return 1;
    }
    if (secondEl[key] == null) {
      return -1;
    }

    const firstVal = fn(firstEl[key]);
    const secondVal = fn(secondEl[key]);
    if (firstVal < secondVal) {
      return order === SortOrder.Asc ? -1 : 1;
    }
    if (firstVal > secondVal) {
      return order === SortOrder.Asc ? 1 : -1;
    }
    return 0;
  };
}
