import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";
import OwnerGenerativeMintSoldOutNotificationData from "src/types/notifications/OwnerGenerativeMintSoldOutNotificationData";

export default async function createOwnerGenerativeMintSoldOutNotifications(
  data: Array<{
    data: OwnerGenerativeMintSoldOutNotificationData;
    receiverId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      senderId: null,
      type: NotificationTypeExpress_Enum.OwnerGenerativeMintSoldOut,
    }))
  );
}
