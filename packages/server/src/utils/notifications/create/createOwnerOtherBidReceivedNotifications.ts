import OwnerOtherBidReceivedNotificationData from "src/types/notifications/OwnerOtherBidReceivedNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createOwnerOtherBidReceivedNotifications(
  data: Array<{
    data: OwnerOtherBidReceivedNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.OwnerOtherBidReceived,
    }))
  );
}
