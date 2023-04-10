import { Request } from "express";
import { getPrismaObjects } from "src/rest/hasura/notifs/createNotificationsWebhook";
import getFollowers from "src/utils/prisma/getFollowers";
import {
  NftStatusExpress_Enum,
  NftTransactionTypeExpress_Enum,
  Price,
} from "src/__generated__/generated";
import dayjs from "src/utils/dates/dayjsex";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import createFollowerNewEditionsListedNotifications from "src/utils/notifications/create/createFollowerNewEditionsListedNotifications";
import createFollowerNewPieceListedNotifications from "src/utils/notifications/create/createFollowerNewPieceListedNotifications";
import createFollowerNewPieceListedSecondaryNotifications from "src/utils/notifications/create/createFollowerNewPieceListedSecondaryNotifications";
import createFollowerNewPieceScheduledNotifications from "src/utils/notifications/create/createFollowerNewPieceScheduledNotifications";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export default async function createNotificationsForFollowers(
  req: Request,
  creatorId: string,
  fromUserId: string,
  mint: string,
  price: Maybe<Price>,
  type: NftTransactionTypeExpress_Enum,
  nftTransactionId: string
) {
  const followers = await getFollowers(creatorId);
  // If you want to have notifications only for pieces listed by artists as primary sales,
  // and not for secondary sales, replace creatorId with fromUserId
  if (followers.length === 0) {
    return;
  }

  const {
    from: seller,
    to: creator,
    nft,
  } = await getPrismaObjects(fromUserId, creatorId, mint);

  switch (type) {
    case NftTransactionTypeExpress_Enum.Listed:
    case NftTransactionTypeExpress_Enum.ListedInstantSale: {
      if (nft.status === NftStatusExpress_Enum.ListingScheduled) {
        await createFollowerNewPieceScheduledNotifications(
          followers
            // Don't notify person doing the listing
            .filter((follower) => follower.id !== seller.id)
            .map((follower) => ({
              data: {
                nftTransactionId,
                scheduledAuctionTimeUnix: dayjs(
                  nft.NftListing?.scheduledAuctionTime
                ).unix(),
              },
              receiverId: follower.id,
              senderId: seller.id,
            }))
        );
      } else if (nft.hasBeenSold) {
        await createFollowerNewPieceListedSecondaryNotifications(
          followers
            // Don't notify person doing the listing
            .filter((follower) => follower.id !== seller.id)
            .map((follower) => ({
              data: {
                nftTransactionId,
              },
              receiverId: follower.id,
              senderId: creator.id,
            }))
        );
      } else {
        await createFollowerNewPieceListedNotifications(
          followers.map((follower) => ({
            data: {
              nftTransactionId,
            },
            receiverId: follower.id,
            senderId: seller.id,
          }))
        );
      }

      break;
    }
    case NftTransactionTypeExpress_Enum.ListedEditions:
      await createFollowerNewEditionsListedNotifications(
        followers.map((follower) => ({
          data: {
            nftTransactionId,
          },
          receiverId: follower.id,
          senderId: seller.id,
        }))
      );
      break;
    case NftTransactionTypeExpress_Enum.AuctionWon:
    case NftTransactionTypeExpress_Enum.Bid:
    case NftTransactionTypeExpress_Enum.Burned:
    case NftTransactionTypeExpress_Enum.ChangePriceForEditions:
    case NftTransactionTypeExpress_Enum.ClaimedPnft:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemBid:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemFullRightsTransferBid:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemPrintingV2Bid:
    case NftTransactionTypeExpress_Enum.Imported:
    case NftTransactionTypeExpress_Enum.ListingCancelled:
    case NftTransactionTypeExpress_Enum.Minted:
    case NftTransactionTypeExpress_Enum.Offer:
    case NftTransactionTypeExpress_Enum.OfferCancelled:
    case NftTransactionTypeExpress_Enum.Refunded:
    case NftTransactionTypeExpress_Enum.Sold:
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
