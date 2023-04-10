import CollabRequestNotificationData from "src/types/notifications/CollabRequestNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createCollabRequestNotifications(
  data: Array<{
    data: CollabRequestNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.CollabRequest,
    }))
  );
}
