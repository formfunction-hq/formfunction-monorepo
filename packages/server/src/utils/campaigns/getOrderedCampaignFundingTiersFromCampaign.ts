import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ConvertCampaignType from "src/types/convert/ConvertCampaignType";
import convertCampaignFundingTier from "src/utils/convert/convertCampaignFundingTier";

export default function getOrderedCampaignFundingTiersFromCampaign(
  campaign: ConvertCampaignType
) {
  const fundingTierOrder = campaign.fundingTierOrder as Maybe<Array<string>>;
  const fundingTiers = campaign.CampaignFundingTier.map((tier) =>
    convertCampaignFundingTier(tier)
  );

  if (fundingTierOrder != null) {
    fundingTiers.sort(
      (a, b) => fundingTierOrder.indexOf(a.id) - fundingTierOrder.indexOf(b.id)
    );
  }

  return fundingTiers;
}
