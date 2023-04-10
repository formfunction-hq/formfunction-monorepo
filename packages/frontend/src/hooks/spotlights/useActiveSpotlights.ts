import graphql from "babel-plugin-relay/macro";
import { useActiveSpotlightsQuery } from "hooks/spotlights/__generated__/useActiveSpotlightsQuery.graphql";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";

export const query = graphql`
  query useActiveSpotlightsQuery($after: String, $first: Int!) {
    ...useActiveSpotlights_Query
  }
`;

export const paginationFragment = graphql`
  fragment useActiveSpotlights_Query on query_root
  @refetchable(queryName: "ActiveSpotlightsPaginationQuery") {
    # eslint-disable-next-line relay/unused-fields
    SpotlightNamespace {
      activeSpotlights(after: $after, first: $first)
        @connection(key: "ActiveSpotlights_Query_activeSpotlights") {
        edges {
          node {
            ...ActiveSpotlightHero_SpotlightExpress
          }
        }
      }
    }
  }
`;

export default function useActiveSpotlights() {
  const initialQueryRef = useMemo(
    () =>
      loadQuery<useActiveSpotlightsQuery>(RelayEnvironment, query, {
        after: null,
        first: 1,
      }),
    []
  );

  const [spotlightQueryRef, loadSpotlightQuery] =
    useQueryLoader<useActiveSpotlightsQuery>(query, initialQueryRef);

  useEffect(() => {
    loadSpotlightQuery({ after: null, first: 1 });
  }, [loadSpotlightQuery]);

  return { loadSpotlightQuery, spotlightQueryRef };
}
