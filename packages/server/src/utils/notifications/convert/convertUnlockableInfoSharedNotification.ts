import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import getNotificationNftInfoFromNft from "src/utils/notifications/getNotificationNftInfoFromNft";
import { ActivityNotificationUnlockableInfoShared } from "src/__generated__/generated";

export default function convertUnlockableInfoSharedNotification(
  notification: ConvertActivityNotificationType
): ActivityNotificationUnlockableInfoShared {
  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationUnlockableInfoShared,
    nftInfo: getNotificationNftInfoFromNft(notification.Nft!),
  };
}
