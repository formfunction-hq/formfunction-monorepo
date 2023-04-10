import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";
import CampaignFollowersCampaignPublishedNotificationData from "src/types/notifications/CampaignFollowersCampaignPublishedNotificationData";

export default async function createCampaignFollowersCampaignPublishedNotifications(
  data: Array<{
    data: CampaignFollowersCampaignPublishedNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.CampaignFollowersCampaignPublished,
    }))
  );
}
