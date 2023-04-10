import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import { ActivityNotificationInvitesConvertedToCreator } from "src/__generated__/generated";

export default function convertInvitesConvertedToCreatorNotification(
  notification: ConvertActivityNotificationType
): ActivityNotificationInvitesConvertedToCreator {
  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationInvitesConvertedToCreator,
  };
}
