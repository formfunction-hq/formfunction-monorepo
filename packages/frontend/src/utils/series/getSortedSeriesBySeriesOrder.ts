import objectFromEntries from "formfn-shared/dist/utils/object/objectFromEntries";
import getSortSeriesBySeriesOrderCompareFn from "utils/series/getSortSeriesBySeriesOrderCompareFn";

type SeriesWithMintAndName = {
  mint: string;
  name: string;
};

export default function getSortedSeriesBySeriesOrder<
  T extends SeriesWithMintAndName
>(seriesOrder: Array<string>, seriesToSort: ReadonlyArray<T>) {
  const orderAsObject = objectFromEntries(
    (seriesOrder as Array<string>).map((mint, i) => [mint, i])
  );
  return [...seriesToSort].sort(
    getSortSeriesBySeriesOrderCompareFn(
      (i: T) => orderAsObject[i.mint],
      (i: T) => i.name
    )
  );
}
