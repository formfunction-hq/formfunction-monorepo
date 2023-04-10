import {
  NotificationChannelExpress_Enum,
  NotificationTypeExpress_Enum,
} from "src/__generated__/generated";
import getPrisma from "src/utils/prisma/getPrisma";

export default async function getFilteredRecipients(
  notificationType: NotificationTypeExpress_Enum,
  notificationChannel: NotificationChannelExpress_Enum,
  recipients: Array<string>
): Promise<Array<string>> {
  const users = await getPrisma().user.findMany({
    include: {
      NotificationUserPreference: true,
    },
    where: {
      OR: [{ email: { in: recipients } }, { id: { in: recipients } }],
    },
  });

  return recipients.filter((recipient) => {
    const user = users.find((u) => u.email === recipient || u.id === recipient);
    const userPreference = user?.NotificationUserPreference.find(
      (preference) =>
        preference.notificationType === notificationType &&
        preference.notificationChannel === notificationChannel
    );

    return (
      // If the user does not exist on our platform, there do not exist
      // email preferences to respect
      //
      // Also note that if there is no row in NotificationUserPreference for a
      // userId/notificationType/notificationChannel combo, it means the notification is enabled
      // for that user and channel
      user == null || userPreference == null || userPreference.enabled
    );
  });
}
