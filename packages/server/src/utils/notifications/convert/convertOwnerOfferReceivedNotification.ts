import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import bigintToNumber from "src/utils/bigintToNumber";
import convertPrice from "src/utils/convert/convertPrice";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import getNotificationNftInfoFromNftTransaction from "src/utils/notifications/getNotificationNftInfoFromNftTransaction";
import getPrisma from "src/utils/prisma/getPrisma";
import { ActivityNotificationOwnerOfferReceived } from "src/__generated__/generated";
import invariant from "tiny-invariant";
import dayjs from "src/utils/dates/dayjsex";
import getMostRecentOfferInvalidatingTransaction from "src/utils/offers/getMostRecentOfferInvalidatingTransaction";
import getActivityNotificationLinkActionForNft from "src/utils/notifications/actions/getActivityNotificationLinkActionForNft";

export default async function convertOwnerOfferReceivedNotification(
  notification: ConvertActivityNotificationType
): Promise<ActivityNotificationOwnerOfferReceived> {
  invariant(notification.NftTransaction != null);
  const nft = notification.NftTransaction.Nft;

  const prisma = getPrisma();
  const mostRecentInvalidatingTx =
    await getMostRecentOfferInvalidatingTransaction(nft.mint);
  const offer = await prisma.offer.findFirst({
    where: {
      nftTransactionId: notification.nftTransactionId!,
      timeCreated:
        mostRecentInvalidatingTx != null
          ? {
              gte: mostRecentInvalidatingTx.timeCreated,
            }
          : undefined,
    },
  });
  const isOfferStillValid =
    offer != null &&
    dayjs(offer.expirationDate).isAfter(dayjs()) &&
    offer.refundTxid == null &&
    offer.saleTransactionId == null;

  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationOwnerOfferReceived,
    action: !isOfferStillValid
      ? null
      : getActivityNotificationLinkActionForNft(
          nft,
          "Accept offer",
          notification.Notification.Receiver!.username
        ),
    nftInfo: getNotificationNftInfoFromNftTransaction(
      notification.NftTransaction
    ),
    offerPrice: convertPrice(
      bigintToNumber(notification.NftTransaction.price)!,
      notification.NftTransaction.Currency
    )!,
    txid: notification.NftTransaction.txid!,
  };
}
