import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import {
  UpdateCampaignAboutInput,
  UpdateCampaignAboutResponse,
} from "src/__generated__/generated";
import getPrisma from "src/utils/prisma/getPrisma";
import CONVERT_CAMPAIGN_INCLUDE from "src/constants/include/ConvertCampaignInclude";
import convertCampaign from "src/utils/convert/convertCampaign";
import assertCanUpdateCampaign from "src/utils/campaigns/assertCanUpdateCampaign";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import CampaignAction from "src/types/enums/CampaignAction";

export default async function updateCampaignAboutResolver(
  context: MyContext,
  input: UpdateCampaignAboutInput
): Promise<UpdateCampaignAboutResponse> {
  const prisma = getPrisma();
  const verifiedPublicKey = assertUserSignedRequest(context);
  await assertCanUpdateCampaign(
    verifiedPublicKey,
    { id: input.campaignId },
    CampaignAction.EditAboutSection
  );

  const campaign = await prisma.campaign.update({
    data: {
      aboutContactInfo: input.about.contactInfo,
      aboutRisksAndChallenges: input.about.risksAndChallenges,
      aboutTheCampaign: input.about.campaign,
      aboutTheCreator: input.about.creator,
      aboutTimeline: input.about.timeline,
    },
    include: CONVERT_CAMPAIGN_INCLUDE,
    where: {
      id: input.campaignId,
    },
  });

  return {
    __typename: Typename.UpdateCampaignAboutResponse,
    campaign: await convertCampaign(campaign),
  };
}
