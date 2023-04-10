import UnlockableInfoSharedNotificationData from "src/types/notifications/UnlockableInfoSharedNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createUnlockableInfoSharedNotifications(
  data: Array<{
    data: UnlockableInfoSharedNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.UnlockableInfoShared,
    }))
  );
}
