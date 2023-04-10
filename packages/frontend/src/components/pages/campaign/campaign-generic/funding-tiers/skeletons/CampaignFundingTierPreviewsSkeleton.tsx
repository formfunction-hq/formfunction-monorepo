import CampaignFundingTierPreviews from "components/pages/campaign/campaign-generic/funding-tiers/CampaignFundingTierPreviews";
import CampaignFundingTierPreviewSkeleton from "components/pages/campaign/campaign-generic/funding-tiers/skeletons/CampaignFundingTierPreviewSkeleton";
import { range } from "formfn-shared/dist/utils/range";
import useCampaignFundingTierPreviewGridFullWidthColumnCount from "hooks/grids/useCampaignFundingTierPreviewGridFullWidthColumnCount";

export default function CampaignFundingTierPreviewsSkeleton(): JSX.Element {
  const numPreviews = useCampaignFundingTierPreviewGridFullWidthColumnCount();
  return (
    <CampaignFundingTierPreviews>
      {range(numPreviews).map((i) => (
        <CampaignFundingTierPreviewSkeleton key={i} />
      ))}
    </CampaignFundingTierPreviews>
  );
}
