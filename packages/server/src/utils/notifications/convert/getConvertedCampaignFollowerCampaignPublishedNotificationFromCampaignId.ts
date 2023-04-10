import CONVERT_CAMPAIGN_NOTIFICATION_INFO_INCLUDE from "src/constants/include/ConvertCampaignNotificationInclude";
import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import convertCampaignFollowerCampaignPublishedNotification from "src/utils/notifications/convert/convertCampaignFollowerCampaignPublishedNotification";
import getPrisma from "src/utils/prisma/getPrisma";
import { ActivityNotificationCampaignFollowersCampaignPublished } from "src/__generated__/generated";

export default async function getConvertedCampaignFollowerCampaignPublishedNotificationFromCampaignId(
  notification: ConvertActivityNotificationType,
  campaignId: string
): Promise<ActivityNotificationCampaignFollowersCampaignPublished> {
  const campaign = await getPrisma().campaign.findUnique({
    include: CONVERT_CAMPAIGN_NOTIFICATION_INFO_INCLUDE,
    where: {
      id: campaignId,
    },
  });

  return convertCampaignFollowerCampaignPublishedNotification(
    notification,
    campaign!
  );
}
