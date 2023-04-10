import { Undef } from "formfn-shared/dist/types/UtilityTypes";

export default function getSortSeriesBySeriesOrderCompareFn<T>(
  orderFunction: (i: T) => Undef<number>,
  nameFunction: (i: T) => string
) {
  return (a: T, b: T) => {
    const aOrder = orderFunction(a);
    const bOrder = orderFunction(b);
    if (aOrder != null && bOrder != null) {
      return aOrder - bOrder;
    }

    // Fallback to status quo if explicit order has not been set by user
    const aName = nameFunction(a).toLocaleUpperCase();
    const bName = nameFunction(b).toLocaleUpperCase();
    return aName.localeCompare(bName);
  };
}
