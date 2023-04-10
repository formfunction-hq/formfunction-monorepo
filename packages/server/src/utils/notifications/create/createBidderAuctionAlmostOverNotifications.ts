import BidderAuctionAlmostOverNotificationData from "src/types/notifications/BidderAuctionAlmostOverNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createBidderAuctionAlmostOverNotifications(
  data: Array<{
    data: BidderAuctionAlmostOverNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.BidderAuctionAlmostOver,
    }))
  );
}
