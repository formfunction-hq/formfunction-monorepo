import CampaignTop from "components/pages/campaign/campaign-generic/CampaignTop";
import CampaignFundingTierPreviewsSkeleton from "components/pages/campaign/campaign-generic/funding-tiers/skeletons/CampaignFundingTierPreviewsSkeleton";
import CampaignHeroSkeleton from "components/pages/campaign/campaign-generic/hero/skeletons/CampaignHeroSkeleton";

export default function CampaignPageContentSkeleton() {
  return (
    <CampaignTop>
      <CampaignHeroSkeleton />
      <CampaignFundingTierPreviewsSkeleton />
    </CampaignTop>
  );
}
