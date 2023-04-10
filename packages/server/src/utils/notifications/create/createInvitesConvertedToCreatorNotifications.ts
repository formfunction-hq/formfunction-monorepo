import InvitesConvertedToCreatorNotificationData from "src/types/notifications/InvitesConvertedToCreatorNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createInvitesConvertedToCreatorNotifications(
  data: Array<{
    data: InvitesConvertedToCreatorNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.InvitesConvertedToCreator,
    }))
  );
}
