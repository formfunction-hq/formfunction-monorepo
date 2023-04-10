import VotingRejectedNotificationData from "src/types/notifications/VotingRejectedNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createVotingRejectedNotifications(
  data: Array<{
    data: VotingRejectedNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.VotingRejected,
    }))
  );
}
