import OwnerAuctionExtendedNotificationData from "src/types/notifications/OwnerAuctionExtendedNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createOwnerAuctionExtendedNotifications(
  data: Array<{
    data: OwnerAuctionExtendedNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.OwnerAuctionExtended,
    }))
  );
}
