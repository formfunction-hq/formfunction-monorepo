import UnlockableDeclinedToSharedInfoNotificationData from "src/types/notifications/UnlockableDeclinedToSharedInfoNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createUnlockableDeclinedToSharedInfoNotifications(
  data: Array<{
    data: UnlockableDeclinedToSharedInfoNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.UnlockableDeclinedToSharedInfo,
    }))
  );
}
