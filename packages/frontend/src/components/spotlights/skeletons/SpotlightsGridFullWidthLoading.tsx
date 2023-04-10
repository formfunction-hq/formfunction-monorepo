import { range } from "formfn-shared/dist/utils/range";
import SpotlightsGridFullWidth from "components/spotlights/SpotlightsGridFullWidth";
import SpotlightCardLoadingSkeleton from "components/spotlights/skeletons/SpotlightCardLoadingSkeleton";
import useSpotlightsGridFullWidthColumnCount from "hooks/grids/useSpotlightsGridFullWidthColumnCount";

export default function SpotlightsGridFullWidthLoading({
  multiple,
}: {
  multiple?: number;
}): JSX.Element {
  const skeletonCount = useSpotlightsGridFullWidthColumnCount(multiple);
  return (
    <SpotlightsGridFullWidth>
      {range(skeletonCount).map((val) => (
        <SpotlightCardLoadingSkeleton key={val} />
      ))}
    </SpotlightsGridFullWidth>
  );
}
