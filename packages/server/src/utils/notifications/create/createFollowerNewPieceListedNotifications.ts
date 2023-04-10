import FollowerNewPieceListedNotificationData from "src/types/notifications/FollowerNewPieceListedNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createFollowerNewPieceListedNotifications(
  data: Array<{
    data: FollowerNewPieceListedNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.FollowerNewPieceListed,
    }))
  );
}
