import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import {
  CampaignStatusExpress_Enum,
  ConcludeCampaignInput,
  ConcludeCampaignResponse,
} from "src/__generated__/generated";
import getPrisma from "src/utils/prisma/getPrisma";
import CONVERT_CAMPAIGN_INCLUDE from "src/constants/include/ConvertCampaignInclude";
import convertCampaign from "src/utils/convert/convertCampaign";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import invariant from "tiny-invariant";

export default async function concludeCampaignResolver(
  context: MyContext,
  input: ConcludeCampaignInput
): Promise<ConcludeCampaignResponse> {
  const prisma = getPrisma();
  const verifiedPublicKey = assertUserSignedRequest(context);
  const campaign = await prisma.campaign.findUnique({
    include: CONVERT_CAMPAIGN_INCLUDE,
    where: { id: input.campaignId },
  });
  invariant(
    campaign != null && campaign.Creator != null,
    "Campaign and Creator cannot be null"
  );
  if (campaign.Creator.id !== verifiedPublicKey.toString()) {
    throw new Error("You do not have permissions to end the campaign.");
  }

  const updatedCampaign = await prisma.campaign.update({
    data: {
      status: CampaignStatusExpress_Enum.Concluded,
    },
    include: CONVERT_CAMPAIGN_INCLUDE,
    where: { id: campaign.id },
  });

  return {
    __typename: Typename.ConcludeCampaignResponse,
    campaign: await convertCampaign(updatedCampaign),
  };
}
