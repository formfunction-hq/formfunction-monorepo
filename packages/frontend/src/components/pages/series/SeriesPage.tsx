import { useParams } from "react-router-dom";
import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { Suspense } from "react";
import useSetPageTitle from "hooks/useSetPageTitle";
import useLogPageView from "hooks/useLogPageView";
import Page404 from "components/pages/errors/Page404";
import SeriesPageContents from "components/pages/series/SeriesPageContents";
import useSeriesPageMetadataAccounts from "hooks/series-page/useSeriesPageMetadataAccounts";
import useSeriesPageSeriesInfo, {
  seriesInfoQuery,
} from "hooks/series-page/useSeriesPageSeriesInfo";
import useUserContext from "hooks/useUserContext";
import { useSeriesPageSeriesInfoQuery } from "hooks/series-page/__generated__/useSeriesPageSeriesInfoQuery.graphql";
import { useSeriesPageMetadataAccountsQuery } from "hooks/series-page/__generated__/useSeriesPageMetadataAccountsQuery.graphql";
import useSeriesPageSeriesStats from "hooks/series-page/useSeriesPageSeriesStats";
import { useSeriesPageSeriesStatsQuery } from "hooks/series-page/__generated__/useSeriesPageSeriesStatsQuery.graphql";
import SeriesPageContentsSkeleton from "components/pages/series/SeriesPageContentsSkeleton";

type InnerProps = {
  nftQueryRef: PreloadedQuery<useSeriesPageMetadataAccountsQuery>;
  seriesInfoQueryRef: PreloadedQuery<useSeriesPageSeriesInfoQuery>;
  seriesStatsQueryRef: PreloadedQuery<useSeriesPageSeriesStatsQuery>;
};

function Inner({
  nftQueryRef,
  seriesInfoQueryRef,
  seriesStatsQueryRef,
}: InnerProps): Maybe<JSX.Element> {
  const data = usePreloadedQuery<useSeriesPageSeriesInfoQuery>(
    seriesInfoQuery,
    seriesInfoQueryRef
  );
  useSetPageTitle(data.Series[0]?.name ?? "Series Not Found");
  useLogPageView();

  if (data.User == null || data.User.length === 0 || data.Series.length === 0) {
    return <Page404 />;
  }

  return (
    <SeriesPageContents
      nftQueryRef={nftQueryRef}
      series={data.Series[0]}
      seriesStatsQueryRef={seriesStatsQueryRef}
      user={data.User[0]}
    />
  );
}

export default function SeriesPage(): Maybe<JSX.Element> {
  const params = useParams();
  const { userId } = useUserContext();
  const { seriesSlug, username } = params;
  const seriesInfoQueryRef = useSeriesPageSeriesInfo(
    seriesSlug!,
    username,
    userId
  );
  const seriesStatsQueryRef = useSeriesPageSeriesStats(
    seriesSlug!,
    username,
    userId
  );
  const nftQueryRef = useSeriesPageMetadataAccounts(
    userId,
    username,
    seriesSlug!
  );

  return (
    <Suspense fallback={<SeriesPageContentsSkeleton />}>
      {seriesInfoQueryRef != null &&
        nftQueryRef != null &&
        seriesStatsQueryRef != null && (
          <Inner
            nftQueryRef={nftQueryRef}
            seriesInfoQueryRef={seriesInfoQueryRef}
            seriesStatsQueryRef={seriesStatsQueryRef}
          />
        )}
    </Suspense>
  );
}
