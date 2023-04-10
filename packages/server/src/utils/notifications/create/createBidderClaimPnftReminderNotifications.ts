import BidderClaimPnftReminderNotificationData from "src/types/notifications/BidderClaimPnftReminderNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createBidderClaimPnftReminderNotifications(
  data: Array<{
    data: BidderClaimPnftReminderNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.BidderClaimPnftReminder,
    }))
  );
}
