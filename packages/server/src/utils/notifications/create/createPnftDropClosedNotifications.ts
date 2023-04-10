import PnftDropClosedNotificationData from "src/types/notifications/PnftDropClosedNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createPnftDropClosedNotifications(
  data: Array<{
    data: PnftDropClosedNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.PnftDropClosed,
    }))
  );
}
