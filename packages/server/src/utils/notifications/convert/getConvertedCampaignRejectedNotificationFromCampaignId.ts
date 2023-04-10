import CONVERT_CAMPAIGN_NOTIFICATION_INFO_INCLUDE from "src/constants/include/ConvertCampaignNotificationInclude";
import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import convertCampaignRejectedNotification from "src/utils/notifications/convert/convertCampaignRejectedNotification";
import getPrisma from "src/utils/prisma/getPrisma";
import { ActivityNotificationCampaignRejected } from "src/__generated__/generated";

export default async function getConvertedCampaignRejectedNotificationFromCampaignId(
  notification: ConvertActivityNotificationType,
  campaignId: string
): Promise<ActivityNotificationCampaignRejected> {
  const campaign = await getPrisma().campaign.findUnique({
    include: CONVERT_CAMPAIGN_NOTIFICATION_INFO_INCLUDE,
    where: {
      id: campaignId,
    },
  });

  return convertCampaignRejectedNotification(notification, campaign!);
}
