import { Notification } from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotification from "src/utils/notifications/create/createNotification";
import VotingDuplicateNotificationData from "src/types/notifications/VotingDuplicateNotificationData";

export default async function createVotingDuplicateNotification(
  data: VotingDuplicateNotificationData,
  receiverId: string
): Promise<Maybe<Notification>> {
  return createNotification(
    data,
    receiverId,
    null,
    NotificationTypeExpress_Enum.VotingDuplicate
  );
}
