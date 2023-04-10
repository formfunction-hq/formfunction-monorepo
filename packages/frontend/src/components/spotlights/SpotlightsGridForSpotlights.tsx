import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { SpotlightsGridForSpotlights_SpotlightExpress$key } from "components/spotlights/__generated__/SpotlightsGridForSpotlights_SpotlightExpress.graphql";
import SpotlightCard from "components/spotlights/SpotlightCard";
import SpotlightsGridFullWidth from "components/spotlights/SpotlightsGridFullWidth";
import useSpotlightsGridFullWidthColumnCount from "hooks/grids/useSpotlightsGridFullWidthColumnCount";
import { range } from "formfn-shared/dist/utils/range";
import SpotlightCardLoadingSkeleton from "components/spotlights/skeletons/SpotlightCardLoadingSkeleton";

const fragment = graphql`
  fragment SpotlightsGridForSpotlights_SpotlightExpress on SpotlightExpress
  @relay(plural: true) {
    id
    ...SpotlightCard_SpotlightExpress
  }
`;

type Props = {
  isLoadingNext: boolean;
  spotlights: SpotlightsGridForSpotlights_SpotlightExpress$key;
};

export default function SpotlightsGridForSpotlights({
  isLoadingNext,
  spotlights,
}: Props) {
  const data = useFragment(fragment, spotlights);
  const numSkeletons = useSpotlightsGridFullWidthColumnCount(3);
  if (data == null) {
    return null;
  }

  return (
    <SpotlightsGridFullWidth>
      {data.map((spotlight) => (
        <SpotlightCard key={spotlight.id} spotlight={spotlight} />
      ))}
      {isLoadingNext &&
        range(numSkeletons).map((val) => (
          <SpotlightCardLoadingSkeleton key={val} />
        ))}
    </SpotlightsGridFullWidth>
  );
}
