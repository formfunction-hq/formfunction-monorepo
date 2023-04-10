import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import ConvertCampaignFundingTierType from "src/types/convert/ConvertCampaignFundingTierType";
import Typename from "src/types/enums/Typename";
import { CampaignFundingTierExpress } from "src/__generated__/generated";

// TODO: support gacha campaign funding tiers
export default function convertCampaignFundingTier(
  campaignFundingTier: ConvertCampaignFundingTierType
): CampaignFundingTierExpress {
  return {
    __typename: Typename.CampaignFundingTierStandard,
    benefits: (campaignFundingTier.CampaignBenefit ?? []).map((benefit) => ({
      __typename: Typename.CampaignBenefit,
      description: benefit.description,
      id: benefit.id,
    })),
    description: campaignFundingTier.description,
    id: campaignFundingTier.id,
    nftOrder: campaignFundingTier.nftOrder as MaybeUndef<Array<string>>,
    title: campaignFundingTier.title,
  };
}
