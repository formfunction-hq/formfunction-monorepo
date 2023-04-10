import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import { ActivityNotificationInvitesInviteeAcceptedInvite } from "src/__generated__/generated";

export default function convertInvitesInviteeAcceptedInviteNotification(
  notification: ConvertActivityNotificationType
): ActivityNotificationInvitesInviteeAcceptedInvite {
  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationInvitesInviteeAcceptedInvite,
  };
}
