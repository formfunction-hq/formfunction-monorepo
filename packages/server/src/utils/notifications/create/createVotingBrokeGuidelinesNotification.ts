import { Notification } from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotification from "src/utils/notifications/create/createNotification";
import VotingBrokeGuidelinesNotificationData from "src/types/notifications/VotingBrokeGuidelinesNotificationData";

export default async function createVotingBrokeGuidelinesNotification(
  data: VotingBrokeGuidelinesNotificationData,
  receiverId: string
): Promise<Maybe<Notification>> {
  return createNotification(
    data,
    receiverId,
    null,
    NotificationTypeExpress_Enum.VotingBrokeGuidelines
  );
}
