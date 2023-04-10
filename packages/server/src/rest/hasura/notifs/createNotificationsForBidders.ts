import { Request } from "express";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { getPrismaObjects } from "src/rest/hasura/notifs/createNotificationsWebhook";
import createBidderOutbidNotificationForWebhook from "src/rest/hasura/notifs/createBidderOutbidNotificationForWebhook";
import createBidderAuctionSettledNotification from "src/utils/notifications/create/createBidderAuctionSettledNotification";
import {
  NftTransactionTypeExpress_Enum,
  Price,
} from "src/__generated__/generated";

export default async function createNotificationsForBidders(
  req: Request,
  creatorId: string,
  fromUserId: string,
  toUserId: string,
  mint: string,
  price: Maybe<Price>,
  type: NftTransactionTypeExpress_Enum,
  nftTransactionId: string,
  txid: string,
  currencyId: string
) {
  switch (type) {
    case NftTransactionTypeExpress_Enum.Bid: {
      await createBidderOutbidNotificationForWebhook(
        req,
        creatorId,
        fromUserId,
        toUserId,
        mint,
        price,
        type,
        nftTransactionId,
        txid,
        currencyId
      );
      break;
    }
    case NftTransactionTypeExpress_Enum.Sold: {
      const { from: seller, to: buyer } = await getPrismaObjects(
        fromUserId,
        toUserId,
        mint
      );

      await createBidderAuctionSettledNotification(
        { nftTransactionId },
        buyer.id,
        seller.id
      );

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
    case NftTransactionTypeExpress_Enum.Offer:
    case NftTransactionTypeExpress_Enum.OfferCancelled:
    case NftTransactionTypeExpress_Enum.Refunded:
    case NftTransactionTypeExpress_Enum.SoldAcceptedOffer:
    case NftTransactionTypeExpress_Enum.SoldEditionPrimary:
    case NftTransactionTypeExpress_Enum.SoldGenerativeMint:
    case NftTransactionTypeExpress_Enum.SoldInstantSale:
    case NftTransactionTypeExpress_Enum.StoppedMintingForEditions:
    case NftTransactionTypeExpress_Enum.Transferred:
      break;
    default:
      assertUnreachable(type);
  }
}
