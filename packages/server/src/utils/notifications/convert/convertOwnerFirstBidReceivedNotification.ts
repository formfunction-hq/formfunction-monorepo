import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import bigintToNumber from "src/utils/bigintToNumber";
import convertPrice from "src/utils/convert/convertPrice";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import getNotificationNftInfoFromNftTransaction from "src/utils/notifications/getNotificationNftInfoFromNftTransaction";
import { ActivityNotificationOwnerFirstBidReceived } from "src/__generated__/generated";
import invariant from "tiny-invariant";

export default function convertOwnerFirstBidReceivedNotification(
  notification: ConvertActivityNotificationType
): ActivityNotificationOwnerFirstBidReceived {
  invariant(notification.NftTransaction != null);
  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationOwnerFirstBidReceived,
    bidPrice: convertPrice(
      bigintToNumber(notification.NftTransaction.price)!,
      notification.NftTransaction.Currency
    )!,
    nftInfo: getNotificationNftInfoFromNftTransaction(
      notification.NftTransaction
    ),
    txid: notification.NftTransaction.txid!,
  };
}
