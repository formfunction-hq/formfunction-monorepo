import FollowerNewEditionsListedNotificationData from "src/types/notifications/FollowerNewEditionsListedNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createFollowerNewEditionsListedNotifications(
  data: Array<{
    data: FollowerNewEditionsListedNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.FollowerNewEditionsListed,
    }))
  );
}
