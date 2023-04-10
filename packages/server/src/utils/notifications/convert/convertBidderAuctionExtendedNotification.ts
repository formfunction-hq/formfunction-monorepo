import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import getNotificationNftInfoFromNft from "src/utils/notifications/getNotificationNftInfoFromNft";
import { ActivityNotificationBidderAuctionExtended } from "src/__generated__/generated";

export default function convertBidderAuctionAlmostOverNotification(
  notification: ConvertActivityNotificationType
): ActivityNotificationBidderAuctionExtended {
  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationBidderAuctionExtended,
    nftInfo: getNotificationNftInfoFromNft(notification.Nft!),
  };
}
