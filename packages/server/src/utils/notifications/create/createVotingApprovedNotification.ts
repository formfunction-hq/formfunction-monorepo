import VotingApprovedNotificationData from "src/types/notifications/VotingApprovedNotificationData";
import { Notification } from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotification from "src/utils/notifications/create/createNotification";

export default async function createVotingApprovedNotification(
  data: VotingApprovedNotificationData,
  receiverId: string
): Promise<Maybe<Notification>> {
  return createNotification(
    data,
    receiverId,
    null,
    NotificationTypeExpress_Enum.VotingApproved
  );
}
