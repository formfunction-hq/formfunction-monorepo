import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import getNotificationNftInfoFromNft from "src/utils/notifications/getNotificationNftInfoFromNft";
import { ActivityNotificationUnlockableDeclinedToSharedInfo } from "src/__generated__/generated";

export default function convertUnlockableDeclinedToSharedInfoNotification(
  notification: ConvertActivityNotificationType
): ActivityNotificationUnlockableDeclinedToSharedInfo {
  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationUnlockableDeclinedToSharedInfo,
    nftInfo: getNotificationNftInfoFromNft(notification.Nft!),
  };
}
