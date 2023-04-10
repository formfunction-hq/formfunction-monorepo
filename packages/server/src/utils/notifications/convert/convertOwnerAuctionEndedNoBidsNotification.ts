import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import getNotificationNftInfoFromNft from "src/utils/notifications/getNotificationNftInfoFromNft";
import { ActivityNotificationOwnerAuctionEndedNoBids } from "src/__generated__/generated";

export default function convertOwnerAuctionEndedNoBidsNotification(
  notification: ConvertActivityNotificationType
): ActivityNotificationOwnerAuctionEndedNoBids {
  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationOwnerAuctionEndedNoBids,
    nftInfo: getNotificationNftInfoFromNft(notification.Nft!),
  };
}
