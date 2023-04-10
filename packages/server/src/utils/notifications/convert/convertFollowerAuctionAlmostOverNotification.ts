import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import getNotificationNftInfoFromNft from "src/utils/notifications/getNotificationNftInfoFromNft";
import { ActivityNotificationFollowerAuctionAlmostOver } from "src/__generated__/generated";

export default function convertFollowerAuctionAlmostOverNotification(
  notification: ConvertActivityNotificationType
): ActivityNotificationFollowerAuctionAlmostOver {
  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationFollowerAuctionAlmostOver,
    nftInfo: getNotificationNftInfoFromNft(notification.Nft!),
  };
}
