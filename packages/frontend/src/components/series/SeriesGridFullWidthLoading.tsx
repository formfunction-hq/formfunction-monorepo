import { range } from "formfn-shared/dist/utils/range";
import SeriesCardLoadingSkeleton from "components/series/SeriesCardLoadingSkeleton";
import SeriesGridFullWidth from "components/series/SeriesGridFullWidth";
import useSeriesGridFullWidthColumnCount from "hooks/grids/useSeriesGridFullWidthColumnCount";

export default function SeriesGridFullWidthLoading({
  count,
  multiple,
}: {
  count?: number;
  multiple?: number;
}): JSX.Element {
  const skeletonCount = useSeriesGridFullWidthColumnCount(multiple);
  return (
    <SeriesGridFullWidth>
      {range(count ?? skeletonCount).map((i) => (
        <SeriesCardLoadingSkeleton key={i} />
      ))}
    </SeriesGridFullWidth>
  );
}
