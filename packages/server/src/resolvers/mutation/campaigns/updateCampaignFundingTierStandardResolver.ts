import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import {
  CampaignFundingTierTypeExpress_Enum,
  UpdateCampaignFundingTierStandardInput,
  UpdateCampaignFundingTierStandardResponse,
} from "src/__generated__/generated";
import getPrisma from "src/utils/prisma/getPrisma";
import CONVERT_CAMPAIGN_INCLUDE from "src/constants/include/ConvertCampaignInclude";
import convertCampaign from "src/utils/convert/convertCampaign";
import assertCanUpdateCampaign from "src/utils/campaigns/assertCanUpdateCampaign";
import invariant from "tiny-invariant";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import CampaignAction from "src/types/enums/CampaignAction";

export default async function updateCampaignFundingTierStandardResolver(
  context: MyContext,
  input: UpdateCampaignFundingTierStandardInput
): Promise<UpdateCampaignFundingTierStandardResponse> {
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
    CampaignAction.UpdateFundingTierInfo
  );

  // Delete all benefits attached to the tier, they will be recreated in the update
  await prisma.campaignBenefit.deleteMany({
    where: {
      campaignFundingTierId: input.campaignFundingTierId,
    },
  });

  await prisma.campaignFundingTier.update({
    data: {
      CampaignBenefit: {
        createMany: {
          data: input.benefits.map((benefit) => ({
            description: benefit,
          })),
        },
      },
      CampaignFundingTierType: {
        connect: {
          // TODO: support Gacha later
          value: CampaignFundingTierTypeExpress_Enum.Standard,
        },
      },
      description: input.description,
      title: input.title,
    },
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
    __typename: Typename.UpdateCampaignFundingTierStandardResponse,
    campaign: await convertCampaign(campaign!),
  };
}
