import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import {
  UpdateCampaignFundingTierOrderInput,
  UpdateCampaignFundingTierOrderResponse,
} from "src/__generated__/generated";
import getPrisma from "src/utils/prisma/getPrisma";
import assertCanUpdateCampaign from "src/utils/campaigns/assertCanUpdateCampaign";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import convertCampaign from "src/utils/convert/convertCampaign";
import CONVERT_CAMPAIGN_INCLUDE from "src/constants/include/ConvertCampaignInclude";
import CampaignAction from "src/types/enums/CampaignAction";

export default async function updateCampaignFundingTierOrderResolver(
  context: MyContext,
  input: UpdateCampaignFundingTierOrderInput
): Promise<UpdateCampaignFundingTierOrderResponse> {
  const prisma = getPrisma();
  const verifiedPublicKey = assertUserSignedRequest(context);
  await assertCanUpdateCampaign(
    verifiedPublicKey,
    { id: input.campaignId },
    CampaignAction.UpdateFundingTierOrder
  );

  const campaign = await prisma.campaign.update({
    data: {
      fundingTierOrder: input.fundingTierOrder,
    },
    include: CONVERT_CAMPAIGN_INCLUDE,
    where: {
      id: input.campaignId,
    },
  });

  return {
    __typename: Typename.UpdateCampaignFundingTierOrderResponse,
    campaign: await convertCampaign(campaign),
  };
}
