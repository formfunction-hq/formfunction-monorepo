import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import getNotificationNftInfoFromNft from "src/utils/notifications/getNotificationNftInfoFromNft";
import { ActivityNotificationBidderAuctionAlmostOver } from "src/__generated__/generated";

export default function convertBidderAuctionAlmostOverNotification(
  notification: ConvertActivityNotificationType
): ActivityNotificationBidderAuctionAlmostOver {
  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationBidderAuctionAlmostOver,
    nftInfo: getNotificationNftInfoFromNft(notification.Nft!),
  };
}
