import InviteReceivedNotificationData from "src/types/notifications/InviteReceivedNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createInviteReceivedNotifications(
  data: Array<{
    data: InviteReceivedNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.InviteReceived,
    }))
  );
}
