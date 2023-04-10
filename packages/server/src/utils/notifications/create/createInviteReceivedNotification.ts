import InviteReceivedNotificationData from "src/types/notifications/InviteReceivedNotificationData";
import { Notification } from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotification from "src/utils/notifications/create/createNotification";

export default async function createInviteReceivedNotification(
  data: InviteReceivedNotificationData,
  senderId: string
): Promise<Maybe<Notification>> {
  return createNotification(
    data,
    null,
    senderId,
    NotificationTypeExpress_Enum.InviteReceived
  );
}
