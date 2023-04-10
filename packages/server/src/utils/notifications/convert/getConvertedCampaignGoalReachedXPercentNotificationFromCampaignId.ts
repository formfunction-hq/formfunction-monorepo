import CONVERT_CAMPAIGN_NOTIFICATION_INFO_INCLUDE from "src/constants/include/ConvertCampaignNotificationInclude";
import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import convertCampaignGoalReachedXPercentNotification from "src/utils/notifications/convert/convertCampaignGoalReachedXPercentNotification";
import getPrisma from "src/utils/prisma/getPrisma";
import { ActivityNotificationCampaignGoalReachedXPercent } from "src/__generated__/generated";

export default async function getConvertedCampaignGoalReachedXPercentNotificationFromCampaignId(
  notification: ConvertActivityNotificationType,
  campaignId: string,
  percentAsNumber: 50 | 100
): Promise<ActivityNotificationCampaignGoalReachedXPercent> {
  const campaign = await getPrisma().campaign.findUnique({
    include: CONVERT_CAMPAIGN_NOTIFICATION_INFO_INCLUDE,
    where: {
      id: campaignId,
    },
  });

  return convertCampaignGoalReachedXPercentNotification(
    notification,
    campaign!,
    percentAsNumber
  );
}
