import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import {
  ApproveCampaignInput,
  ApproveCampaignResponse,
  CampaignStatusExpress_Enum,
} from "src/__generated__/generated";
import getPrisma from "src/utils/prisma/getPrisma";
import CONVERT_CAMPAIGN_INCLUDE from "src/constants/include/ConvertCampaignInclude";
import convertCampaign from "src/utils/convert/convertCampaign";
import assertCampaignHasGalleryAsset from "src/utils/campaigns/validation/assertCampaignHasGalleryAsset";
import assertCampaignHasAbout from "src/utils/campaigns/validation/assertCampaignHasAbout";
import assertCampaignHasFundingTier from "src/utils/campaigns/validation/assertCampaignHasFundingTier";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import { Prisma } from "@prisma/client";
import { PublicKey } from "@solana/web3.js";
import ConvertCampaignType from "src/types/convert/ConvertCampaignType";
import invariant from "tiny-invariant";
import isEmployee from "src/utils/auth/isEmployee";
import convertUserToCreator from "src/utils/convertUserToCreator";
import PrismaTransactionClient from "src/types/PrismaTransactionClient";

export async function assertCanCampaignBeApprovedOrRejected(
  verifiedPublicKey: PublicKey,
  campaignWhere: Prisma.CampaignWhereUniqueInput
): Promise<ConvertCampaignType> {
  const campaign = await getPrisma().campaign.findUnique({
    include: CONVERT_CAMPAIGN_INCLUDE,
    where: campaignWhere,
  });
  invariant(campaign != null, "Campaign does not exist");

  const convertedCampaign = await convertCampaign(campaign);

  assertCampaignHasGalleryAsset(convertedCampaign);
  assertCampaignHasAbout(convertedCampaign);
  assertCampaignHasFundingTier(convertedCampaign);

  if (!isEmployee(verifiedPublicKey.toString())) {
    throw new Error("Only employees can approve or reject a campaign.");
  }

  return campaign!;
}

export default async function approveCampaignResolver(
  context: MyContext,
  input: ApproveCampaignInput
): Promise<ApproveCampaignResponse> {
  const prisma = getPrisma();
  const verifiedPublicKey = assertUserSignedRequest(context);
  const campaignBeforeUpdate = await assertCanCampaignBeApprovedOrRejected(
    verifiedPublicKey,
    { id: input.campaignId }
  );

  const updatedCampaign = await prisma.$transaction(
    async (prismaClient: PrismaTransactionClient) => {
      const campaign = await prismaClient.campaign.update({
        data: {
          status: CampaignStatusExpress_Enum.Approved,
        },
        include: CONVERT_CAMPAIGN_INCLUDE,
        where: {
          id: input.campaignId,
        },
      });

      await convertUserToCreator(campaignBeforeUpdate.Creator.id, prismaClient);

      return campaign;
    }
  );

  return {
    __typename: Typename.ApproveCampaignResponse,
    campaign: await convertCampaign(updatedCampaign as ConvertCampaignType),
  };
}
