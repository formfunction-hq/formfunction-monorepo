import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import {
  CampaignFundingTierTypeExpress_Enum,
  CreateCampaignFundingTierStandardInput,
  CreateCampaignFundingTierStandardResponse,
} from "src/__generated__/generated";
import getPrisma from "src/utils/prisma/getPrisma";
import CONVERT_CAMPAIGN_INCLUDE from "src/constants/include/ConvertCampaignInclude";
import convertCampaign from "src/utils/convert/convertCampaign";
import assertCanUpdateCampaign from "src/utils/campaigns/assertCanUpdateCampaign";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import CampaignAction from "src/types/enums/CampaignAction";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";

function assertInputIsValid({
  benefits,
  description,
  title,
}: CreateCampaignFundingTierStandardInput) {
  if (
    isEmptyString(description) ||
    isEmptyString(title) ||
    benefits.length === 0 ||
    benefits.every((benefit) => isEmptyString(benefit))
  ) {
    throw new Error("Invalid input for creating a campaign funding tier.");
  }
}

export default async function createCampaignFundingTierStandardResolver(
  context: MyContext,
  input: CreateCampaignFundingTierStandardInput
): Promise<CreateCampaignFundingTierStandardResponse> {
  assertInputIsValid(input);
  const prisma = getPrisma();
  const verifiedPublicKey = assertUserSignedRequest(context);
  await assertCanUpdateCampaign(
    verifiedPublicKey,
    { id: input.campaignId },
    CampaignAction.AddFundingTier
  );

  const campaignFundingTier = await prisma.campaignFundingTier.create({
    data: {
      Campaign: {
        connect: {
          id: input.campaignId,
        },
      },
      CampaignBenefit: {
        createMany: {
          data: input.benefits
            .filter((benefit) => !isEmptyString(benefit))
            .map((benefit) => ({
              description: benefit,
            })),
        },
      },
      CampaignFundingTierType: {
        connect: {
          value: CampaignFundingTierTypeExpress_Enum.Standard,
        },
      },
      description: input.description,
      title: input.title,
    },
  });

  const campaign = await prisma.campaign.findUnique({
    where: {
      id: input.campaignId,
    },
  });
  const updatedCampaign = await prisma.campaign.update({
    data: {
      fundingTierOrder: [
        ...((campaign!.fundingTierOrder ?? []) as Array<string>),
        campaignFundingTier.id,
      ],
    },
    include: CONVERT_CAMPAIGN_INCLUDE,
    where: {
      id: campaign!.id,
    },
  });

  return {
    __typename: Typename.CreateCampaignFundingTierStandardResponse,
    campaign: await convertCampaign(updatedCampaign!),
  };
}
