import BidderOutbidNotificationData from "src/types/notifications/BidderOutbidNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createBidderOutbidNotifications(
  data: Array<{
    data: BidderOutbidNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.BidderOutbid,
    }))
  );
}
