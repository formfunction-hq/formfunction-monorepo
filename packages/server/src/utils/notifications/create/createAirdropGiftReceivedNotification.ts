import { Notification } from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotification from "src/utils/notifications/create/createNotification";
import AirdropGiftReceivedNotificationData from "src/types/notifications/AirdropGiftReceivedNotificationData";

export default async function createAirdropGiftReceivedNotification(
  data: AirdropGiftReceivedNotificationData,
  receiverId: string,
  senderId: string
): Promise<Maybe<Notification>> {
  return createNotification(
    data,
    receiverId,
    senderId,
    NotificationTypeExpress_Enum.AirdropGiftReceived
  );
}
