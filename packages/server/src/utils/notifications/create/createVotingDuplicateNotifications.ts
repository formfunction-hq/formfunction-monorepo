import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";
import VotingDuplicateNotificationData from "src/types/notifications/VotingDuplicateNotificationData";

export default async function createVotingDuplicateNotifications(
  data: Array<{
    data: VotingDuplicateNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.VotingDuplicate,
    }))
  );
}
