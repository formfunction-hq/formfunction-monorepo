import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import getNotificationNftInfoFromNft from "src/utils/notifications/getNotificationNftInfoFromNft";
import { ActivityNotificationBidderWonAuction } from "src/__generated__/generated";

export default function convertBidderWonAuctionNotification(
  notification: ConvertActivityNotificationType
): ActivityNotificationBidderWonAuction {
  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationBidderWonAuction,
    nftInfo: getNotificationNftInfoFromNft(notification.Nft!),
  };
}
