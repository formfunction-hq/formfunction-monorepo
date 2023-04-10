import graphql from "babel-plugin-relay/macro";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import { LandingTrendingSeriesQuery } from "components/pages/landing/__generated__/LandingTrendingSeriesQuery.graphql";
import { Suspense } from "react";
import { useLazyLoadQuery } from "react-relay";
import SeriesCard from "components/series/SeriesCard";
import useFlagsTyped from "hooks/useFlagsTyped";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import LandingSectionHeader from "components/pages/landing/LandingSectionHeader";
import LandingSeriesGrid from "components/pages/landing/LandingSeriesGrid";
import LandingSeriesGridItem from "components/pages/landing/LandingSeriesGridItem";
import LandingSeriesGridLoading from "components/pages/landing/LandingSeriesGridLoading";

export const TRENDING_SERIES_COUNT = 4;

const query = graphql`
  query LandingTrendingSeriesQuery($where: Series_bool_exp!) {
    Series(where: $where) {
      id

      ...SeriesCard_Series
    }
  }
`;

function Inner({ seriesIds }: { seriesIds: Array<string> }): JSX.Element {
  const data = useLazyLoadQuery<LandingTrendingSeriesQuery>(query, {
    where: {
      id: { _in: seriesIds },
    },
  });

  return (
    <LandingSeriesGrid>
      {data.Series.slice(0, TRENDING_SERIES_COUNT).map((series) => (
        <LandingSeriesGridItem key={series.id}>
          <SeriesCard series={series} />
        </LandingSeriesGridItem>
      ))}
    </LandingSeriesGrid>
  );
}

export default function LandingTrendingSeries(): Maybe<JSX.Element> {
  const flags = useFlagsTyped();
  const seriesIds = flags.trendingSeriesMints;
  if (seriesIds == null || seriesIds.length === 0) {
    return null;
  }

  return (
    <ResponsiveContainer>
      <LandingSectionHeader>Featured Series</LandingSectionHeader>
      <Suspense fallback={<LandingSeriesGridLoading />}>
        <Inner seriesIds={seriesIds} />
      </Suspense>
    </ResponsiveContainer>
  );
}
