import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import { ActivityNotificationNewFollower } from "src/__generated__/generated";

export default function convertNewFollowerNotification(
  notification: ConvertActivityNotificationType
): ActivityNotificationNewFollower {
  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationNewFollower,
  };
}
