import {
  paginationFragment,
  query,
} from "hooks/spotlights/useRecentSpotlights";
import {
  PreloadedQuery,
  usePaginationFragment,
  usePreloadedQuery,
} from "react-relay";
import SpotlightsGridForSpotlights from "components/spotlights/SpotlightsGridForSpotlights";
import { RecentSpotlightsPaginationQuery } from "hooks/spotlights/__generated__/RecentSpotlightsPaginationQuery.graphql";
import { useRecentSpotlights_Query$key } from "hooks/spotlights/__generated__/useRecentSpotlights_Query.graphql";
import { useRecentSpotlightsQuery } from "hooks/spotlights/__generated__/useRecentSpotlightsQuery.graphql";
import { RECENT_SPOTLIGHTS_PAGE_SIZE } from "constants/PageSizes";
import useLoadNextOnBottomScroll from "hooks/useLoadNextOnBottomScroll";

export default function SpotlightsPageRecentSpotlights({
  queryRef,
  shouldPaginate,
}: {
  queryRef: PreloadedQuery<useRecentSpotlightsQuery>;
  shouldPaginate: boolean;
}) {
  const queryData = usePreloadedQuery<useRecentSpotlightsQuery>(
    query,
    queryRef
  );

  const { data, hasNext, loadNext, isLoadingNext } = usePaginationFragment<
    RecentSpotlightsPaginationQuery,
    useRecentSpotlights_Query$key
  >(paginationFragment, queryData);

  useLoadNextOnBottomScroll(
    hasNext && !isLoadingNext && shouldPaginate,
    loadNext,
    RECENT_SPOTLIGHTS_PAGE_SIZE
  );

  return (
    <SpotlightsGridForSpotlights
      isLoadingNext={isLoadingNext}
      spotlights={data.SpotlightNamespace.recentSpotlights.edges.map(
        ({ node }) => node
      )}
    />
  );
}
