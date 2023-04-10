import { Request } from "express";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import NFT_TRANSACTION_ORDER_BY from "src/constants/orderBy/NftTransactionOrderBy";
import { getPrismaObjects } from "src/rest/hasura/notifs/createNotificationsWebhook";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  NftTransactionTypeExpress_Enum,
  Price,
} from "src/__generated__/generated";
import createOwnerEditionSoldNotification from "src/utils/notifications/create/createOwnerEditionSoldNotification";
import createOwnerEditionsSoldOutNotification from "src/utils/notifications/create/createOwnerEditionsSoldOutNotification";
import createOwnerFirstBidReceivedNotification from "src/utils/notifications/create/createOwnerFirstBidReceivedNotification";
import createOwnerOtherBidReceivedNotification from "src/utils/notifications/create/createOwnerOtherBidReceivedNotification";
import createOwnerOfferReceivedNotification from "src/utils/notifications/create/createOwnerOfferReceivedNotification";
import createOwnerPieceSoldAsInstantSaleNotification from "src/utils/notifications/create/createOwnerPieceSoldAsInstantSaleNotification";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

async function isFirstBidForAuction(
  mint: string,
  txid: string
): Promise<boolean> {
  const prisma = getPrisma();
  const txs = await prisma.nftTransaction.findMany({
    orderBy: NFT_TRANSACTION_ORDER_BY,
    where: {
      mint,
      type: {
        in: [
          NftTransactionTypeExpress_Enum.Bid,
          NftTransactionTypeExpress_Enum.Sold,
          NftTransactionTypeExpress_Enum.Transferred,
        ],
      },
    },
  });

  const txIdx = txs.findIndex((tx) => tx.txid === txid);

  if (txIdx === -1) {
    // Should not happen
    return false;
  }

  // eslint-disable-next-line no-plusplus
  for (let i = txIdx + 1; i < txs.length; i++) {
    const tx = txs[i];

    if (tx.type === NftTransactionTypeExpress_Enum.Bid) {
      return false;
    }

    if (
      [
        NftTransactionTypeExpress_Enum.Sold,
        NftTransactionTypeExpress_Enum.Transferred,
      ].includes(tx.type as NftTransactionTypeExpress_Enum)
    ) {
      break;
    }
  }

  return true;
}

export default async function createNotificationForSeller(
  req: Request,
  fromUserId: string,
  toUserId: string,
  mint: string,
  price: Maybe<Price>,
  type: NftTransactionTypeExpress_Enum,
  txid: string,
  nftTransactionId: string
) {
  switch (type) {
    case NftTransactionTypeExpress_Enum.Bid: {
      const { from: bidder, to: seller } = await getPrismaObjects(
        fromUserId,
        toUserId,
        mint
      );

      const isFirstBid = await isFirstBidForAuction(mint, txid);

      if (isFirstBid) {
        await createOwnerFirstBidReceivedNotification(
          {
            nftTransactionId,
          },
          seller.id,
          bidder.id
        );
      } else {
        await createOwnerOtherBidReceivedNotification(
          {
            nftTransactionId,
          },
          seller.id,
          bidder.id
        );
      }
      break;
    }
    case NftTransactionTypeExpress_Enum.SoldInstantSale: {
      const { from: seller, to: buyer } = await getPrismaObjects(
        fromUserId,
        toUserId,
        mint
      );

      await createOwnerPieceSoldAsInstantSaleNotification(
        {
          nftTransactionId,
        },
        seller.id,
        buyer.id
      );
      break;
    }
    case NftTransactionTypeExpress_Enum.Offer: {
      const { from: buyer, to: seller } = await getPrismaObjects(
        fromUserId,
        toUserId,
        mint,
        nftTransactionId
      );

      await createOwnerOfferReceivedNotification(
        { nftTransactionId },
        seller.id,
        buyer.id
      );
      break;
    }
    case NftTransactionTypeExpress_Enum.SoldEditionPrimary: {
      const {
        from: seller,
        to: buyer,
        nft,
      } = await getPrismaObjects(fromUserId, toUserId, mint, nftTransactionId);

      await createOwnerEditionSoldNotification(
        {
          nftTransactionId,
        },
        seller.id,
        buyer.id
      );

      const prisma = getPrisma();
      const masterEdition = await prisma.nft.findUnique({
        where: {
          mint: nft.masterEditionMint!,
        },
      });
      if (nft.edition === masterEdition!.maxSupply) {
        await createOwnerEditionsSoldOutNotification(
          {
            nftTransactionId,
          },
          seller.id,
          buyer.id
        );
      }

      break;
    }
    case NftTransactionTypeExpress_Enum.AuctionWon:
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
    case NftTransactionTypeExpress_Enum.OfferCancelled:
    case NftTransactionTypeExpress_Enum.Refunded:
    case NftTransactionTypeExpress_Enum.Sold:
    case NftTransactionTypeExpress_Enum.SoldAcceptedOffer:
    case NftTransactionTypeExpress_Enum.SoldGenerativeMint: // TODO[Generative Mints](@bryancho): address later
    case NftTransactionTypeExpress_Enum.StoppedMintingForEditions:
    case NftTransactionTypeExpress_Enum.Transferred:
      break;
    default:
      assertUnreachable(type);
  }
}
