import BidderLostAuctionNotificationData from "src/types/notifications/BidderLostAuctionNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createBidderLostAuctionNotifications(
  data: Array<{
    data: BidderLostAuctionNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.BidderLostAuction,
    }))
  );
}
