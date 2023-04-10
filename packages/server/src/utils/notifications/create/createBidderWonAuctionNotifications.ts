import BidderWonAuctionNotificationData from "src/types/notifications/BidderWonAuctionNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createBidderWonAuctionNotifications(
  data: Array<{
    data: BidderWonAuctionNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.BidderWonAuction,
    }))
  );
}
