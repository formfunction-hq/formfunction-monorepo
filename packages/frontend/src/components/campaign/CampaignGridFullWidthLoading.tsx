import { range } from "formfn-shared/dist/utils/range";
import useCampaignGridFullWidthColumnCount from "hooks/grids/useCampaignGridFullWidthColumnCount";
import CampaignGridFullWidth from "components/campaign/CampaignGridFullWidth";
import ExploreCampaignCardSkeleton from "components/pages/explore/skeletons/ExploreCampaignCardSkeleton";

export default function CampaignGridFullWidthLoading({
  count,
  multiple,
  showNftAssets,
}: {
  count?: number;
  multiple?: number;
  showNftAssets?: boolean;
}): JSX.Element {
  const skeletonCount = useCampaignGridFullWidthColumnCount(multiple);
  return (
    <CampaignGridFullWidth>
      {range(count ?? skeletonCount).map((i) => (
        <ExploreCampaignCardSkeleton key={i} showNftAssets={showNftAssets} />
      ))}
    </CampaignGridFullWidth>
  );
}
