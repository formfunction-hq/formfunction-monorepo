import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createNotifications from "src/utils/notifications/create/createNotifications";

export default async function createBonkClaimNotifications(
  data: Array<{
    receiverId: string;
    senderId: string;
  }>
): Promise<void> {
  await createNotifications(
    data.map((datum) => ({
      ...datum,
      data: {},
      type: NotificationTypeExpress_Enum.BonkClaim,
    }))
  );
}
