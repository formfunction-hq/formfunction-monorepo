import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import CampaignCommunityNewUpdateSharedNotificationData from "src/types/notifications/CampaignCommunityNewUpdateSharedNotificationData";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createCampaignCommunityNewUpdateSharedNotifications(
  data: Array<{
    data: CampaignCommunityNewUpdateSharedNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.CampaignCommunityNewUpdateShared,
    }))
  );
}
