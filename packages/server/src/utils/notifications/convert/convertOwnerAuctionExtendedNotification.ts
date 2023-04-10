import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import getNotificationNftInfoFromNft from "src/utils/notifications/getNotificationNftInfoFromNft";
import { ActivityNotificationOwnerAuctionExtended } from "src/__generated__/generated";

export default function convertOwnerAuctionExtendedNotification(
  notification: ConvertActivityNotificationType
): ActivityNotificationOwnerAuctionExtended {
  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationOwnerAuctionExtended,
    nftInfo: getNotificationNftInfoFromNft(notification.Nft!),
  };
}
