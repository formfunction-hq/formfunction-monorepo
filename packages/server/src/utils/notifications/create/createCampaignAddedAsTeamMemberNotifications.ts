import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";
import CampaignAddedAsTeamMemberNotificationData from "src/types/notifications/CampaignAddedAsTeamMemberNotificationData";

export default async function createCampaignAddedAsTeamMemberNotifications(
  data: Array<{
    data: CampaignAddedAsTeamMemberNotificationData;
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      type: NotificationTypeExpress_Enum.CampaignAddedAsTeamMember,
    }))
  );
}
