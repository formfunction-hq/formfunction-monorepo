import CreatorSecondarySaleNotificationData from "src/types/notifications/CreatorSecondarySaleNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createCreatorSecondarySaleNotifications(
  data: Array<{
    data: CreatorSecondarySaleNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.CreatorSecondarySale,
    }))
  );
}
