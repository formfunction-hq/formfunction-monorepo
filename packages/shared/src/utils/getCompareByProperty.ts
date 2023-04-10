import SortOrder from "types/enums/SortOrder";

export function getCompareByProperty<
  T extends { [key: string]: any },
  K extends keyof T
>(
  key: K,
  order: SortOrder = SortOrder.Asc
): (firstEl: T, secondEl: T) => number {
  return (firstEl: T, secondEl: T) => {
    if (firstEl[key] == null) {
      return 1;
    }
    if (secondEl[key] == null) {
      return -1;
    }

    if (firstEl[key] < secondEl[key]) {
      return order === SortOrder.Asc ? -1 : 1;
    }
    if (firstEl[key] > secondEl[key]) {
      return order === SortOrder.Asc ? 1 : -1;
    }
    return 0;
  };
}
