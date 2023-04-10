import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import convertUser from "src/utils/convert/convertUser";
import { IActivityNotification } from "src/__generated__/generated";

export default function getIActivityNotificationFields(
  notification: ConvertActivityNotificationType
): IActivityNotification {
  return {
    id: notification.id,
    receiver: convertUser(notification.Notification.Receiver),
    sender:
      notification.Notification.Sender == null
        ? null
        : convertUser(notification.Notification.Sender),
    timeCreated: notification.timeCreated,
    timeSeen: notification.timeSeen,
  };
}
