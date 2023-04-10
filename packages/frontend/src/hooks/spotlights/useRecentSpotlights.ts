import graphql from "babel-plugin-relay/macro";
import { RECENT_SPOTLIGHTS_PAGE_SIZE } from "constants/PageSizes";
import { useRecentSpotlightsQuery } from "hooks/spotlights/__generated__/useRecentSpotlightsQuery.graphql";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";

export const query = graphql`
  query useRecentSpotlightsQuery($after: String, $first: Int!) {
    ...useRecentSpotlights_Query
  }
`;

export const paginationFragment = graphql`
  fragment useRecentSpotlights_Query on query_root
  @refetchable(queryName: "RecentSpotlightsPaginationQuery") {
    # eslint-disable-next-line relay/unused-fields
    SpotlightNamespace {
      recentSpotlights(after: $after, first: $first)
        @connection(key: "RecentSpotlights_Query_recentSpotlights") {
        edges {
          node {
            ...SpotlightsGridForSpotlights_SpotlightExpress
          }
        }
      }
    }
  }
`;

export default function useRecentSpotlights() {
  const initialQueryRef = useMemo(
    () =>
      loadQuery<useRecentSpotlightsQuery>(RelayEnvironment, query, {
        after: null,
        first: RECENT_SPOTLIGHTS_PAGE_SIZE,
      }),
    []
  );

  const [spotlightQueryRef, loadSpotlightQuery] =
    useQueryLoader<useRecentSpotlightsQuery>(query, initialQueryRef);

  useEffect(() => {
    loadSpotlightQuery({ after: null, first: RECENT_SPOTLIGHTS_PAGE_SIZE });
  }, [loadSpotlightQuery]);

  return { loadSpotlightQuery, spotlightQueryRef };
}
