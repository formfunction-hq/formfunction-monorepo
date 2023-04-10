import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import {
  DeleteCampaignFundingTierInput,
  DeleteCampaignFundingTierResponse,
} from "src/__generated__/generated";
import getPrisma from "src/utils/prisma/getPrisma";
import CONVERT_CAMPAIGN_INCLUDE from "src/constants/include/ConvertCampaignInclude";
import convertCampaign from "src/utils/convert/convertCampaign";
import assertCanUpdateCampaign from "src/utils/campaigns/assertCanUpdateCampaign";
import invariant from "tiny-invariant";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import CampaignAction from "src/types/enums/CampaignAction";

export default async function deleteCampaignFundingTierResolver(
  context: MyContext,
  input: DeleteCampaignFundingTierInput
): Promise<DeleteCampaignFundingTierResponse> {
  const prisma = getPrisma();
  const verifiedPublicKey = assertUserSignedRequest(context);
  const campaignFundingTier = await prisma.campaignFundingTier.findUnique({
    where: {
      id: input.campaignFundingTierId,
    },
  });
  invariant(campaignFundingTier != null);
  await assertCanUpdateCampaign(
    verifiedPublicKey,
    {
      id: campaignFundingTier.campaignId,
    },
    CampaignAction.DeleteFundingTier
  );

  await prisma.campaignFundingTier.delete({
    where: {
      id: input.campaignFundingTierId,
    },
  });

  const campaign = await prisma.campaign.findUnique({
    include: CONVERT_CAMPAIGN_INCLUDE,
    where: {
      id: campaignFundingTier.campaignId,
    },
  });

  return {
    __typename: Typename.DeleteCampaignFundingTierResponse,
    campaign: await convertCampaign(campaign!),
  };
}
