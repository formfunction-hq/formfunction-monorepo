import FollowerScheduledAuctionIsLiveNotificationData from "src/types/notifications/FollowerScheduledAuctionIsLiveNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createFollowerScheduledAuctionIsLiveNotifications(
  data: Array<{
    data: FollowerScheduledAuctionIsLiveNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.FollowerScheduledAuctionIsLive,
    }))
  );
}
