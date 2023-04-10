import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import invariant from "tiny-invariant";
import getPrisma from "src/utils/prisma/getPrisma";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";
import createCreatorSecondarySaleNotification from "src/utils/notifications/create/createCreatorSecondarySaleNotification";

export default async function createNotificationForCreator({
  creatorId,
  fromUserId,
  mint,
  toUserId,
  nftTransactionId,
  type,
}: {
  creatorId: string;
  fromUserId: string;
  mint: string;
  nftTransactionId: string;
  toUserId: string;
  type: NftTransactionTypeExpress_Enum;
}): Promise<void> {
  const prisma = getPrisma();
  const [creator, nft, to] = await Promise.all([
    prisma.user.findUnique({ where: { id: creatorId } }),
    prisma.nft.findUnique({
      include: {
        NftMetadata: true,
      },
      where: { mint },
    }),
    prisma.user.findUnique({ where: { id: toUserId } }),
  ]);

  invariant(creator != null);
  invariant(to != null);
  invariant(nft != null);

  if (isEmptyString(creator.email)) {
    return;
  }

  switch (type) {
    case NftTransactionTypeExpress_Enum.AuctionWon:
    case NftTransactionTypeExpress_Enum.SoldAcceptedOffer:
    case NftTransactionTypeExpress_Enum.SoldInstantSale: {
      if (creatorId === fromUserId) {
        // We only want to send for secondary sales
        break;
      }

      await createCreatorSecondarySaleNotification(
        {
          nftTransactionId,
        },
        creator.id,
        to.id
      );
      break;
    }
    case NftTransactionTypeExpress_Enum.Bid:
    case NftTransactionTypeExpress_Enum.Burned:
    case NftTransactionTypeExpress_Enum.ChangePriceForEditions:
    case NftTransactionTypeExpress_Enum.ClaimedPnft:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemBid:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemFullRightsTransferBid:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemPrintingV2Bid:
    case NftTransactionTypeExpress_Enum.Imported:
    case NftTransactionTypeExpress_Enum.Listed:
    case NftTransactionTypeExpress_Enum.ListedEditions:
    case NftTransactionTypeExpress_Enum.ListedInstantSale:
    case NftTransactionTypeExpress_Enum.ListingCancelled:
    case NftTransactionTypeExpress_Enum.Minted:
    case NftTransactionTypeExpress_Enum.Offer:
    case NftTransactionTypeExpress_Enum.OfferCancelled:
    case NftTransactionTypeExpress_Enum.Refunded:
    case NftTransactionTypeExpress_Enum.Sold: // We send the email for "AuctionWon" instead
    case NftTransactionTypeExpress_Enum.SoldEditionPrimary:
    case NftTransactionTypeExpress_Enum.SoldGenerativeMint:
    case NftTransactionTypeExpress_Enum.StoppedMintingForEditions:
    case NftTransactionTypeExpress_Enum.Transferred:
      break;
    default:
      assertUnreachable(type);
  }
}
