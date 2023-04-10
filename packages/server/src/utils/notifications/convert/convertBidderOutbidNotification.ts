import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import bigintToNumber from "src/utils/bigintToNumber";
import convertPrice from "src/utils/convert/convertPrice";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import getNotificationNftInfoFromNftTransaction from "src/utils/notifications/getNotificationNftInfoFromNftTransaction";
import { ActivityNotificationBidderOutbid } from "src/__generated__/generated";
import invariant from "tiny-invariant";

export default function convertBidderOutbidNotification(
  notification: ConvertActivityNotificationType
): ActivityNotificationBidderOutbid {
  invariant(notification.NftTransaction != null);
  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationBidderOutbid,
    nftInfo: getNotificationNftInfoFromNftTransaction(
      notification.NftTransaction
    ),
    refundAmount: convertPrice(
      bigintToNumber(notification.NftTransaction.price)!,
      notification.NftTransaction.Currency
    )!,
    txid: notification.NftTransaction.txid!,
  };
}
