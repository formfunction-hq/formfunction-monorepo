import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import getNotificationNftInfoFromNftTransaction from "src/utils/notifications/getNotificationNftInfoFromNftTransaction";
import { ActivityNotificationBuyerOfferAccepted } from "src/__generated__/generated";
import invariant from "tiny-invariant";

export default function convertBuyerOfferAcceptedNotification(
  notification: ConvertActivityNotificationType
): ActivityNotificationBuyerOfferAccepted {
  invariant(notification.NftTransaction != null);
  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationBuyerOfferAccepted,
    nftInfo: getNotificationNftInfoFromNftTransaction(
      notification.NftTransaction
    ),
    txid: notification.NftTransaction.txid!,
  };
}
