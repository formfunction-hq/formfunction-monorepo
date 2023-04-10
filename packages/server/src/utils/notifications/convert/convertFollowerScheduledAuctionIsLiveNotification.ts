import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import getNotificationNftInfoFromNft from "src/utils/notifications/getNotificationNftInfoFromNft";
import { ActivityNotificationFollowerScheduledAuctionIsLive } from "src/__generated__/generated";

export default function convertFollowerScheduledAuctionIsLiveNotification(
  notification: ConvertActivityNotificationType
): ActivityNotificationFollowerScheduledAuctionIsLive {
  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationFollowerScheduledAuctionIsLive,
    nftInfo: getNotificationNftInfoFromNft(notification.Nft!),
  };
}
