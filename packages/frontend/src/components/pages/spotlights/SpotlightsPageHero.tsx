import useFlagsTyped from "hooks/useFlagsTyped";
import {
  paginationFragment,
  query,
} from "hooks/spotlights/useActiveSpotlights";
import {
  PreloadedQuery,
  usePaginationFragment,
  usePreloadedQuery,
} from "react-relay";
import { useActiveSpotlightsQuery } from "hooks/spotlights/__generated__/useActiveSpotlightsQuery.graphql";
import { ActiveSpotlightsPaginationQuery } from "hooks/spotlights/__generated__/ActiveSpotlightsPaginationQuery.graphql";
import { useActiveSpotlights_Query$key } from "hooks/spotlights/__generated__/useActiveSpotlights_Query.graphql";
import ActiveSpotlightHero from "components/spotlights/ActiveSpotlightHero";

type Props = {
  className?: string;
  queryRef: PreloadedQuery<useActiveSpotlightsQuery>;
};

export default function SpotlightsPageHero({ className, queryRef }: Props) {
  const { featuredSpotlightConfig } = useFlagsTyped();
  const queryData = usePreloadedQuery<useActiveSpotlightsQuery>(
    query,
    queryRef
  );

  const { data } = usePaginationFragment<
    ActiveSpotlightsPaginationQuery,
    useActiveSpotlights_Query$key
  >(paginationFragment, queryData);

  const { edges } = data.SpotlightNamespace.activeSpotlights;
  if (featuredSpotlightConfig.length === 0 && edges.length === 0) {
    // No active spotlights
    return null;
  }

  return (
    <ActiveSpotlightHero
      className={className}
      showOverlay
      spotlight={edges.length === 0 ? null : edges[0].node}
    />
  );
}
