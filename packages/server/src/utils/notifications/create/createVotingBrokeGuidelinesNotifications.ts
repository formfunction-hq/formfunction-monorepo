import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";
import VotingBrokeGuidelinesNotificationData from "src/types/notifications/VotingBrokeGuidelinesNotificationData";

export default async function createVotingBrokeGuidelinesNotification(
  data: Array<{
    data: VotingBrokeGuidelinesNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.VotingBrokeGuidelines,
    }))
  );
}
