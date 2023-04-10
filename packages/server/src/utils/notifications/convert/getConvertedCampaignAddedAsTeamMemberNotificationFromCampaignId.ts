import CONVERT_CAMPAIGN_NOTIFICATION_INFO_INCLUDE from "src/constants/include/ConvertCampaignNotificationInclude";
import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import convertCampaignAddedAsTeamMemberNotification from "src/utils/notifications/convert/convertCampaignAddedAsTeamMemberNotification";
import getPrisma from "src/utils/prisma/getPrisma";
import { ActivityNotificationCampaignAddedAsTeamMember } from "src/__generated__/generated";

export default async function getConvertedCampaignAddedAsTeamMemberNotificationFromCampaignId(
  notification: ConvertActivityNotificationType,
  campaignId: string
): Promise<ActivityNotificationCampaignAddedAsTeamMember> {
  const campaign = await getPrisma().campaign.findUnique({
    include: CONVERT_CAMPAIGN_NOTIFICATION_INFO_INCLUDE,
    where: {
      id: campaignId,
    },
  });

  return convertCampaignAddedAsTeamMemberNotification(notification, campaign!);
}
