import LandingSection from "components/pages/landing/LandingSection";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import useFlagsTyped from "hooks/useFlagsTyped";
import {
  query,
  paginationFragment,
} from "hooks/spotlights/useActiveSpotlights";
import {
  PreloadedQuery,
  usePaginationFragment,
  usePreloadedQuery,
} from "react-relay";
import { useActiveSpotlightsQuery } from "hooks/spotlights/__generated__/useActiveSpotlightsQuery.graphql";
import ActiveSpotlightHero from "components/spotlights/ActiveSpotlightHero";
import { ActiveSpotlightsPaginationQuery } from "hooks/spotlights/__generated__/ActiveSpotlightsPaginationQuery.graphql";
import { useActiveSpotlights_Query$key } from "hooks/spotlights/__generated__/useActiveSpotlights_Query.graphql";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import SpotlightHeroLoadingSkeleton from "components/spotlights/skeletons/SpotlightHeroLoadingSkeleton";
import { Suspense } from "react";

type Props = {
  queryRef: PreloadedQuery<useActiveSpotlightsQuery>;
};

function Inner({ queryRef }: Props) {
  const { featuredSpotlightConfig } = useFlagsTyped();
  const queryData = usePreloadedQuery<useActiveSpotlightsQuery>(
    query,
    queryRef
  );

  const { data } = usePaginationFragment<
    ActiveSpotlightsPaginationQuery,
    useActiveSpotlights_Query$key
  >(paginationFragment, queryData);

  const spotlightEdges = data.SpotlightNamespace.activeSpotlights.edges;
  if (featuredSpotlightConfig.length === 0 && spotlightEdges.length === 0) {
    // No active spotlights
    return null;
  }

  return (
    <ActiveSpotlightHero
      spotlight={spotlightEdges.length === 0 ? null : spotlightEdges[0].node}
    />
  );
}

export default function LandingFeaturedSpotlight({
  queryRef,
}: Props): Maybe<JSX.Element> {
  return (
    <LandingSection>
      <ResponsiveContainer>
        <Suspense fallback={<SpotlightHeroLoadingSkeleton />}>
          <Inner queryRef={queryRef} />
        </Suspense>
      </ResponsiveContainer>
    </LandingSection>
  );
}
