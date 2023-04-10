import OwnerEditionSoldNotificationData from "src/types/notifications/OwnerEditionSoldNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createOwnerEditionSoldNotifications(
  data: Array<{
    data: OwnerEditionSoldNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.OwnerEditionSold,
    }))
  );
}
