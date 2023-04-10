import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import { ActivityNotificationCampaignRejectedWithFeedback } from "src/__generated__/generated";
import convertCampaignNotificationInfo from "src/utils/notifications/convert/convertCampaignNotificationInfo";
import getActivityNotificationLinkAction from "src/utils/notifications/actions/getActivityNotificationLinkAction";
import CampaignRejectedWithFeedbackNotificationData from "src/types/notifications/CampaignRejectedWithFeedbackNotificationData";
import getPrisma from "src/utils/prisma/getPrisma";
import CONVERT_CAMPAIGN_NOTIFICATION_INFO_INCLUDE from "src/constants/include/ConvertCampaignNotificationInclude";
import getCampaignLinkRelative from "formfn-shared/dist/utils/links/getCampaignLinkRelative";
import invariant from "tiny-invariant";

export default async function convertCampaignRejectedWithFeedbackNotification(
  notification: ConvertActivityNotificationType,
  notificationData: CampaignRejectedWithFeedbackNotificationData
): Promise<ActivityNotificationCampaignRejectedWithFeedback> {
  const campaign = await getPrisma().campaign.findUnique({
    include: CONVERT_CAMPAIGN_NOTIFICATION_INFO_INCLUDE,
    where: {
      id: notificationData.campaignId,
    },
  });
  invariant(campaign != null);

  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationCampaignRejectedWithFeedback,
    action: getActivityNotificationLinkAction(
      getCampaignLinkRelative(campaign.Creator.username, campaign.slug),
      "Go to campaign"
    ),
    campaignInfo: convertCampaignNotificationInfo(campaign),
    feedback: notificationData.feedback,
  };
}
