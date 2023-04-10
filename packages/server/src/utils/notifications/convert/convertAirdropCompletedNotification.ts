import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import getNotificationNftInfoFromNft from "src/utils/notifications/getNotificationNftInfoFromNft";
import { ActivityNotificationAirdropCompleted } from "src/__generated__/generated";

export default function convertAirdropCompletedNotification(
  notification: ConvertActivityNotificationType
): ActivityNotificationAirdropCompleted {
  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationAirdropCompleted,
    nftInfo: getNotificationNftInfoFromNft(notification.Nft!),
  };
}
