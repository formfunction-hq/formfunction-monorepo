import FollowerNewPieceScheduledNotificationData from "src/types/notifications/FollowerNewPieceScheduledNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createFollowerNewPieceScheduledNotifications(
  data: Array<{
    data: FollowerNewPieceScheduledNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.FollowerNewPieceScheduled,
    }))
  );
}
