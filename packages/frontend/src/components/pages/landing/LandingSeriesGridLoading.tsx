import { range } from "formfn-shared/dist/utils/range";
import SeriesCardLoadingSkeleton from "components/series/SeriesCardLoadingSkeleton";
import LandingSeriesGrid from "components/pages/landing/LandingSeriesGrid";
import LandingSeriesGridItem from "components/pages/landing/LandingSeriesGridItem";
import { TRENDING_SERIES_COUNT } from "components/pages/landing/LandingTrendingSeries";

export default function LandingSeriesGridLoading(): JSX.Element {
  return (
    <LandingSeriesGrid>
      {range(TRENDING_SERIES_COUNT).map((i) => (
        <LandingSeriesGridItem key={i}>
          <SeriesCardLoadingSkeleton />
        </LandingSeriesGridItem>
      ))}
    </LandingSeriesGrid>
  );
}
