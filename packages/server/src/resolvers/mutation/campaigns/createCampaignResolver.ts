import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import {
  CampaignStatusExpress_Enum,
  CampaignTeamMemberRoleExpress_Enum,
  CreateCampaignInput,
  CreateCampaignResponse,
} from "src/__generated__/generated";
import getPrisma from "src/utils/prisma/getPrisma";
import CONVERT_CAMPAIGN_INCLUDE from "src/constants/include/ConvertCampaignInclude";
import convertCampaign from "src/utils/convert/convertCampaign";
import getCampaignBasicInfoCreateOrUpdateData from "src/utils/campaigns/getCampaignBasicInfoCreateOrUpdateData";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import updateCampaignTeamMembers from "src/utils/campaigns/updateCampaignTeamMembers";
import ACTIVE_CAMPAIGN_STATUSES from "src/constants/ActiveCampaignStatuses";
import getDashCasedString from "formfn-shared/dist/utils/string/getDashCasedString";

async function assertCanUserCreateCampaign(userId: string, title: string) {
  const prisma = getPrisma();

  const existingActiveCampaignCountPromise = prisma.campaign.count({
    where: {
      creatorId: userId,
      status: {
        in: ACTIVE_CAMPAIGN_STATUSES,
      },
    },
  });

  const findExistingCampaignPromise = prisma.campaign.findUnique({
    select: { title: true },
    where: {
      creatorId_slug: { creatorId: userId, slug: getDashCasedString(title) },
    },
  });
  const [existingActiveCampaignsCount, existingCampaign] = await Promise.all([
    existingActiveCampaignCountPromise,
    findExistingCampaignPromise,
  ]);

  if (existingActiveCampaignsCount > 0) {
    throw new Error(
      "Campaign creation failed, users can only have one active campaign at a time."
    );
  }

  if (existingCampaign != null) {
    throw new Error("You already have a campaign with the same name");
  }
}

export default async function createCampaignResolver(
  context: MyContext,
  input: CreateCampaignInput
): Promise<CreateCampaignResponse> {
  const prisma = getPrisma();
  const verifiedPublicKey = assertUserSignedRequest(context);
  await assertCanUserCreateCampaign(verifiedPublicKey.toString(), input.title);

  const campaign = await prisma.campaign.create({
    data: getCampaignBasicInfoCreateOrUpdateData(
      input,
      null,
      verifiedPublicKey.toString(),
      CampaignStatusExpress_Enum.Draft
    ),
    include: CONVERT_CAMPAIGN_INCLUDE,
  });

  await updateCampaignTeamMembers(campaign, [
    ...input.teamMembers,
    // As a one-time thing, we want the creator to also be added
    // as a team member for the campaign with the Creator role
    {
      role: CampaignTeamMemberRoleExpress_Enum.Creator,
      userId: campaign.creatorId,
    },
  ]);

  return {
    __typename: Typename.CreateCampaignResponse,
    campaign: await convertCampaign(campaign),
  };
}
