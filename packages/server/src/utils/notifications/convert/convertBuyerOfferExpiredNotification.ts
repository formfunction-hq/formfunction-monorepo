import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import getNotificationNftInfoFromNft from "src/utils/notifications/getNotificationNftInfoFromNft";
import { ActivityNotificationBuyerOfferExpired } from "src/__generated__/generated";

export default function convertBuyerOfferExpiredNotification(
  notification: ConvertActivityNotificationType
): ActivityNotificationBuyerOfferExpired {
  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationBuyerOfferExpired,
    nftInfo: getNotificationNftInfoFromNft(notification.Nft!),
  };
}
