import OwnerAuctionEndedNoBidsNotificationData from "src/types/notifications/OwnerAuctionEndedNoBidsNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createOwnerAuctionEndedNoBidsNotifications(
  data: Array<{
    data: OwnerAuctionEndedNoBidsNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.OwnerAuctionEndedNoBids,
    }))
  );
}
