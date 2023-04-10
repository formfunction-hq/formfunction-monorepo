import BuyerOfferExpiredNotificationData from "src/types/notifications/BuyerOfferExpiredNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createBuyerOfferExpiredNotifications(
  data: Array<{
    data: BuyerOfferExpiredNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.BuyerOfferExpired,
    }))
  );
}
