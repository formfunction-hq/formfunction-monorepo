import OwnerEditionsSoldOutNotificationData from "src/types/notifications/OwnerEditionsSoldOutNotificationData";
import { Notification } from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotification from "src/utils/notifications/create/createNotification";

export default async function createOwnerEditionsSoldOutNotification(
  data: OwnerEditionsSoldOutNotificationData,
  receiverId: string,
  senderId: string
): Promise<Maybe<Notification>> {
  return createNotification(
    data,
    receiverId,
    senderId,
    NotificationTypeExpress_Enum.OwnerEditionsSoldOut
  );
}
