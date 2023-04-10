import CONVERT_CAMPAIGN_NOTIFICATION_INFO_INCLUDE from "src/constants/include/ConvertCampaignNotificationInclude";
import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import convertCampaignCommunityNewUpdateSharedNotification from "src/utils/notifications/convert/convertCampaignCommunityNewUpdateSharedNotification";
import getPrisma from "src/utils/prisma/getPrisma";
import { ActivityNotificationCampaignCommunityNewUpdateShared } from "src/__generated__/generated";
import invariant from "tiny-invariant";

export default async function getConvertedCampaignCommunityNewUpdateSharedNotificationFromPostId(
  notification: ConvertActivityNotificationType,
  postId: string
): Promise<ActivityNotificationCampaignCommunityNewUpdateShared> {
  const post = await getPrisma().post.findUnique({
    include: {
      Campaign: { include: CONVERT_CAMPAIGN_NOTIFICATION_INFO_INCLUDE },
    },
    where: {
      id: postId,
    },
  });
  invariant(
    post != null && post.Campaign != null,
    `Post and Campaign must not be null for postId = ${postId} and notificationId = ${notification.id}`
  );

  return convertCampaignCommunityNewUpdateSharedNotification(
    notification,
    post.Campaign
  );
}
