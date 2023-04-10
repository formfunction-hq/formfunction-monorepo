import { Notification } from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotification from "src/utils/notifications/create/createNotification";
import CampaignRejectedNotificationData from "src/types/notifications/CampaignRejectedNotificationData";

export default async function createCampaignRejectedNotification(
  data: CampaignRejectedNotificationData,
  receiverId: string
): Promise<Maybe<Notification>> {
  return createNotification(
    data,
    receiverId,
    null,
    NotificationTypeExpress_Enum.CampaignRejected
  );
}
