import BidderAuctionExtendedNotificationData from "src/types/notifications/BidderAuctionExtendedNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createBidderAuctionExtendedNotifications(
  data: Array<{
    data: BidderAuctionExtendedNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.BidderAuctionExtended,
    }))
  );
}
