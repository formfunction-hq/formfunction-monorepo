import {
  CampaignFundingTiersForSlugInput,
  CampaignFundingTiersForSlugResponse,
  CampaignStatusExpress_Enum,
} from "src/__generated__/generated";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import getCampaignForCampaignForSlugInput from "src/utils/campaigns/getCampaignForCampaignForSlugInput";
import isCampaignVisible from "src/utils/campaigns/permissions/isCampaignVisible";
import getOrderedCampaignFundingTiersFromCampaign from "src/utils/campaigns/getOrderedCampaignFundingTiersFromCampaign";

export default async function campaignFundingTiersForSlugResolver(
  context: MyContext,
  input: CampaignFundingTiersForSlugInput
): Promise<CampaignFundingTiersForSlugResponse> {
  const { verifiedPublicKey } = context;
  const { campaign } = await getCampaignForCampaignForSlugInput(
    input,
    verifiedPublicKey?.toString()
  );

  if (
    campaign == null ||
    !(await isCampaignVisible(
      campaign.creatorId,
      campaign.status as CampaignStatusExpress_Enum,
      verifiedPublicKey?.toString()
    ))
  ) {
    return {
      __typename: Typename.CampaignFundingTiersForSlugResponse,
      campaignFundingTiers: null,
    };
  }

  return {
    __typename: Typename.CampaignFundingTiersForSlugResponse,
    campaignFundingTiers: getOrderedCampaignFundingTiersFromCampaign(campaign),
  };
}
