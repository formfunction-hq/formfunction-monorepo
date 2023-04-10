import NewFollowerNotificationData from "src/types/notifications/NewFollowerNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createNewFollowerNotifications(
  data: Array<{
    data: NewFollowerNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.NewFollower,
    }))
  );
}
