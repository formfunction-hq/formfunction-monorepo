import BidderClaimPnftNotificationData from "src/types/notifications/BidderClaimPnftNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createBidderClaimPnftNotifications(
  data: Array<{
    data: BidderClaimPnftNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.BidderClaimPnft,
    }))
  );
}
