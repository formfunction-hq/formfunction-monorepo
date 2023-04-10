import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import getNotificationNftInfoFromNft from "src/utils/notifications/getNotificationNftInfoFromNft";
import { ActivityNotificationBidderLostAuction } from "src/__generated__/generated";

export default function convertBidderLostAuctionNotification(
  notification: ConvertActivityNotificationType
): ActivityNotificationBidderLostAuction {
  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationBidderLostAuction,
    nftInfo: getNotificationNftInfoFromNft(notification.Nft!),
  };
}
