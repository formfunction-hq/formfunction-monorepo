import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import {
  CampaignStatusExpress_Enum,
  RejectCampaignInput,
  RejectCampaignResponse,
} from "src/__generated__/generated";
import getPrisma from "src/utils/prisma/getPrisma";
import CONVERT_CAMPAIGN_INCLUDE from "src/constants/include/ConvertCampaignInclude";
import convertCampaign from "src/utils/convert/convertCampaign";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import { assertCanCampaignBeApprovedOrRejected } from "src/resolvers/mutation/campaigns/approveCampaignResolver";
import createCampaignRejectedWithFeedbackNotification from "src/utils/notifications/create/createCampaignRejectedWithFeedbackNotification";
import invariant from "tiny-invariant";

// NOTE: in this case, createCampaignNotificationsWebhook creates the notif
async function permaReject(campaignId: string) {
  const campaign = await getPrisma().campaign.update({
    data: {
      status: CampaignStatusExpress_Enum.Rejected,
    },
    include: CONVERT_CAMPAIGN_INCLUDE,
    where: {
      id: campaignId,
    },
  });

  return campaign;
}

export default async function rejectCampaignResolver(
  context: MyContext,
  input: RejectCampaignInput
): Promise<RejectCampaignResponse> {
  const verifiedPublicKey = assertUserSignedRequest(context);
  const { campaignId, feedback, isPermaReject } = input;
  const campaignBeforeUpdate = await assertCanCampaignBeApprovedOrRejected(
    verifiedPublicKey,
    { id: campaignId }
  );

  if (isPermaReject) {
    const campaign = await permaReject(campaignId);

    return {
      __typename: Typename.RejectCampaignResponse,
      campaign: await convertCampaign(campaign),
    };
  }

  invariant(
    feedback != null,
    "Feedback is required for rejecting a campaign with feedback"
  );
  await createCampaignRejectedWithFeedbackNotification(
    {
      campaignId,
      feedback,
    },
    campaignBeforeUpdate.creatorId
  );
  const campaign = await getPrisma().campaign.update({
    data: {
      status: CampaignStatusExpress_Enum.Draft,
    },
    include: CONVERT_CAMPAIGN_INCLUDE,
    where: {
      id: campaignId,
    },
  });

  return {
    __typename: Typename.RejectCampaignResponse,
    campaign: await convertCampaign(campaign),
  };
}
