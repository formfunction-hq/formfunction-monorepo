import OwnerAuctionSettledNotificationData from "src/types/notifications/OwnerAuctionSettledNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createOwnerAuctionSettledNotifications(
  data: Array<{
    data: OwnerAuctionSettledNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.OwnerAuctionSettled,
    }))
  );
}
