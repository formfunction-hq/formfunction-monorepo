import InvitesInviteeAcceptedInviteNotificationData from "src/types/notifications/InvitesInviteeAcceptedInviteNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createInvitesInviteeAcceptedInviteNotifications(
  data: Array<{
    data: InvitesInviteeAcceptedInviteNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.InvitesInviteeAcceptedInvite,
    }))
  );
}
