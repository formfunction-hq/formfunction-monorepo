import {
  paginationFragment,
  query,
} from "hooks/spotlights/useUpcomingSpotlights";
import {
  PreloadedQuery,
  usePaginationFragment,
  usePreloadedQuery,
} from "react-relay";
import SpotlightsGridForSpotlights from "components/spotlights/SpotlightsGridForSpotlights";
import { useUpcomingSpotlightsQuery } from "hooks/spotlights/__generated__/useUpcomingSpotlightsQuery.graphql";
import { UpcomingSpotlightsPaginationQuery } from "hooks/spotlights/__generated__/UpcomingSpotlightsPaginationQuery.graphql";
import { useUpcomingSpotlights_Query$key } from "hooks/spotlights/__generated__/useUpcomingSpotlights_Query.graphql";

export default function SpotlightsPageUpcomingSpotlights({
  queryRef,
}: {
  queryRef: PreloadedQuery<useUpcomingSpotlightsQuery>;
}) {
  const queryData = usePreloadedQuery<useUpcomingSpotlightsQuery>(
    query,
    queryRef
  );

  const { data } = usePaginationFragment<
    UpcomingSpotlightsPaginationQuery,
    useUpcomingSpotlights_Query$key
  >(paginationFragment, queryData);

  return (
    <SpotlightsGridForSpotlights
      isLoadingNext={false}
      spotlights={data.SpotlightNamespace.upcomingSpotlights.edges.map(
        ({ node }) => node
      )}
    />
  );
}
