import CONVERT_CAMPAIGN_NOTIFICATION_INFO_INCLUDE from "src/constants/include/ConvertCampaignNotificationInclude";
import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import convertCampaignApprovedNotification from "src/utils/notifications/convert/convertCampaignApprovedNotification";
import getPrisma from "src/utils/prisma/getPrisma";
import { ActivityNotificationCampaignApproved } from "src/__generated__/generated";

export default async function getConvertedCampaignApprovedNotificationFromCampaignId(
  notification: ConvertActivityNotificationType,
  campaignId: string
): Promise<ActivityNotificationCampaignApproved> {
  const campaign = await getPrisma().campaign.findUnique({
    include: CONVERT_CAMPAIGN_NOTIFICATION_INFO_INCLUDE,
    where: {
      id: campaignId,
    },
  });

  return convertCampaignApprovedNotification(notification, campaign!);
}
