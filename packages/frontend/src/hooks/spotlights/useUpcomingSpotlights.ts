import graphql from "babel-plugin-relay/macro";
import { UPCOMING_SPOTLIGHTS_PAGE_SIZE } from "constants/PageSizes";
import { useUpcomingSpotlightsQuery } from "hooks/spotlights/__generated__/useUpcomingSpotlightsQuery.graphql";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";

export const query = graphql`
  query useUpcomingSpotlightsQuery($after: String, $first: Int!) {
    ...useUpcomingSpotlights_Query
  }
`;

export const paginationFragment = graphql`
  fragment useUpcomingSpotlights_Query on query_root
  @refetchable(queryName: "UpcomingSpotlightsPaginationQuery") {
    # eslint-disable-next-line relay/unused-fields
    SpotlightNamespace {
      upcomingSpotlights(after: $after, first: $first)
        @connection(key: "UpcomingSpotlights_Query_upcomingSpotlights") {
        edges {
          node {
            ...SpotlightsGridForSpotlights_SpotlightExpress
          }
        }
      }
    }
  }
`;

export default function useUpcomingSpotlights() {
  const initialQueryRef = useMemo(
    () =>
      loadQuery<useUpcomingSpotlightsQuery>(RelayEnvironment, query, {
        after: null,
        first: UPCOMING_SPOTLIGHTS_PAGE_SIZE,
      }),
    []
  );

  const [spotlightQueryRef, loadSpotlightQuery] =
    useQueryLoader<useUpcomingSpotlightsQuery>(query, initialQueryRef);

  useEffect(() => {
    loadSpotlightQuery({ after: null, first: UPCOMING_SPOTLIGHTS_PAGE_SIZE });
  }, [loadSpotlightQuery]);

  return { loadSpotlightQuery, spotlightQueryRef };
}
