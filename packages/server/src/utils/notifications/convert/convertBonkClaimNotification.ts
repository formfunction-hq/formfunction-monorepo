import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import getActivityNotificationLinkAction from "src/utils/notifications/actions/getActivityNotificationLinkAction";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import getPrisma from "src/utils/prisma/getPrisma";
import { ActivityNotificationBonkClaim } from "src/__generated__/generated";

export default async function convertBonkClaimNotification(
  notification: ConvertActivityNotificationType
): Promise<ActivityNotificationBonkClaim> {
  const { receiver } = notification.Notification;
  const claim = await getPrisma().bonkClaim.findUnique({
    where: {
      userId: receiver!,
    },
  });

  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationBonkClaim,
    action:
      claim?.claimed !== true
        ? getActivityNotificationLinkAction("/claim-bonk", "Claim")
        : null,
  };
}
