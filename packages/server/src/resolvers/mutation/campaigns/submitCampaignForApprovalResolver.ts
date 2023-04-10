import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import {
  CampaignStatusExpress_Enum,
  CampaignV2,
  SubmitCampaignForApprovalInput,
  SubmitCampaignForApprovalResponse,
} from "src/__generated__/generated";
import getPrisma from "src/utils/prisma/getPrisma";
import CONVERT_CAMPAIGN_INCLUDE from "src/constants/include/ConvertCampaignInclude";
import convertCampaign from "src/utils/convert/convertCampaign";
import assertCanUpdateCampaign from "src/utils/campaigns/assertCanUpdateCampaign";
import assertCampaignHasGalleryAsset from "src/utils/campaigns/validation/assertCampaignHasGalleryAsset";
import assertCampaignHasAbout from "src/utils/campaigns/validation/assertCampaignHasAbout";
import assertCampaignHasFundingTier from "src/utils/campaigns/validation/assertCampaignHasFundingTier";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import CampaignAction from "src/types/enums/CampaignAction";
import getCampaignLinkRelative from "formfn-shared/dist/utils/links/getCampaignLinkRelative";
import sendSlackNotification from "src/utils/tooling/sendSlackNotification";
import SlackWebhook from "src/types/enums/SlackWebhook";
import isProd from "src/utils/isProd";

function assertCanCampaignBeSubmittedForApproval(campaign: CampaignV2) {
  if (campaign.status !== CampaignStatusExpress_Enum.Draft) {
    throw new Error("Only campaigns in draft can be submitted for approval.");
  }

  assertCampaignHasGalleryAsset(campaign);
  assertCampaignHasAbout(campaign);
  assertCampaignHasFundingTier(campaign);
}

export default async function submitCampaignForApprovalResolver(
  context: MyContext,
  input: SubmitCampaignForApprovalInput
): Promise<SubmitCampaignForApprovalResponse> {
  const prisma = getPrisma();
  const verifiedPublicKey = assertUserSignedRequest(context);
  const campaignBeforeUpdate = await assertCanUpdateCampaign(
    verifiedPublicKey,
    { id: input.campaignId },
    CampaignAction.SubmitForApproval
  );
  assertCanCampaignBeSubmittedForApproval(
    await convertCampaign(campaignBeforeUpdate)
  );

  const campaign = await prisma.campaign.update({
    data: {
      status: CampaignStatusExpress_Enum.Pending,
    },
    include: CONVERT_CAMPAIGN_INCLUDE,
    where: {
      id: input.campaignId,
    },
  });

  if (isProd()) {
    const {
      Creator: { username },
      slug,
      title,
    } = campaign;
    const content = `New campaign, *${title}*, submitted for approval by @${username}! Review the submission at https://formfunction.xyz${getCampaignLinkRelative(
      username,
      slug
    )}/admin`;

    await sendSlackNotification(SlackWebhook.CampaignAlertChannel, content);
  }

  return {
    __typename: Typename.SubmitCampaignForApprovalResponse,
    campaign: await convertCampaign(campaign),
  };
}
