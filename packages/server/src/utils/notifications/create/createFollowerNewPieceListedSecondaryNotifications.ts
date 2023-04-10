import FollowerNewPieceListedSecondaryNotificationData from "src/types/notifications/FollowerNewPieceListedSecondaryNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createFollowerNewPieceListedSecondaryNotifications(
  data: Array<{
    data: FollowerNewPieceListedSecondaryNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.FollowerNewPieceListedSecondary,
    }))
  );
}
