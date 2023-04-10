import { CampaignFundingTierStandard } from "src/__generated__/generated";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import CONVERT_CAMPAIGN_FUNDING_TIER_INCLUDE from "src/constants/include/ConvertCampaignFundingTierInclude";
import getPrisma from "src/utils/prisma/getPrisma";
import convertCampaignFundingTier from "src/utils/convert/convertCampaignFundingTier";
import NftSourceType from "src/types/graphql-source/NftSourceType";

export default async function campaignFundingTierForNftResolver(
  nft: NftSourceType
): Promise<Maybe<CampaignFundingTierStandard>> {
  const prisma = getPrisma();
  if (nft._campaignFundingTierId == null) {
    return null;
  }

  const campaignFundingTier = await prisma.campaignFundingTier.findUnique({
    include: CONVERT_CAMPAIGN_FUNDING_TIER_INCLUDE,
    where: { id: nft._campaignFundingTierId },
  });

  return campaignFundingTier == null
    ? null
    : convertCampaignFundingTier(campaignFundingTier);
}
