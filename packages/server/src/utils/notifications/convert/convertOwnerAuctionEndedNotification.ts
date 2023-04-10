import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import bigintToNumber from "src/utils/bigintToNumber";
import convertPrice from "src/utils/convert/convertPrice";
import getActivityNotificationLinkActionForNft from "src/utils/notifications/actions/getActivityNotificationLinkActionForNft";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import getNotificationNftInfoFromNftTransaction from "src/utils/notifications/getNotificationNftInfoFromNftTransaction";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  ActivityNotificationOwnerAuctionEnded,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import invariant from "tiny-invariant";

export default async function convertOwnerAuctionEndedNotification(
  notification: ConvertActivityNotificationType
): Promise<ActivityNotificationOwnerAuctionEnded> {
  invariant(notification.NftTransaction != null);
  const nft = notification.NftTransaction.Nft;

  const prisma = getPrisma();
  const settleTx = await prisma.nftTransaction.findFirst({
    where: {
      auctionCount: notification.NftTransaction.auctionCount,
      mint: nft.mint,
      type: NftTransactionTypeExpress_Enum.Sold,
    },
  });

  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationOwnerAuctionEnded,
    action:
      settleTx != null
        ? null
        : getActivityNotificationLinkActionForNft(
            nft,
            "Settle auction",
            notification.Notification.Receiver!.username
          ),
    nftInfo: getNotificationNftInfoFromNftTransaction(
      notification.NftTransaction
    ),
    winningPrice: convertPrice(
      bigintToNumber(notification.NftTransaction.price)!,
      notification.NftTransaction.Currency
    )!,
  };
}
