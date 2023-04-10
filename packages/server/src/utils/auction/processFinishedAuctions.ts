/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
import dayjs from "src/utils/dates/dayjsex";
import {
  Currency,
  Nft,
  NftListing,
  NftMetadata,
  NftTransaction,
  Photo,
  User,
} from "@prisma/client";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  NftStatusExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import pLimit from "p-limit";
import getWinningBidForMostRecentAuction from "src/utils/auction/getWinningBidForMostRecentAuction";
import getOutbidUsers from "src/utils/auction/getOutbidUsers";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import logEvent from "src/utils/analytics/logEvent";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import asyncFilter from "src/utils/asyncFilter";
import AUCTION_END_BUFFER from "src/constants/AuctionEndBuffer";
import sendSlackNotification from "src/utils/tooling/sendSlackNotification";
import SlackWebhook from "src/types/enums/SlackWebhook";
import isProd from "src/utils/isProd";
import getTimeElapsed from "src/utils/dates/getTimeElapsed";
import NftTransactionWithUsers from "src/types/NftTransactionWithUsers";
import logIfNotProd from "src/utils/logIfNotProd";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import createBidderLostAuctionNotification from "src/utils/notifications/create/createBidderLostAuctionNotification";
import createBidderWonAuctionNotification from "src/utils/notifications/create/createBidderWonAuctionNotification";
import createOwnerAuctionEndedNotification from "src/utils/notifications/create/createOwnerAuctionEndedNotification";
import createOwnerAuctionEndedNoBidsNotification from "src/utils/notifications/create/createOwnerAuctionEndedNoBidsNotification";
import invariant from "tiny-invariant";

// Use limit of 1 to keep logs nicer. May increase later if necessary.
const processNftsLimit = pLimit(1);
const processOutbidLimit = pLimit(1);

type NftForAuction = Nft & {
  NftListing: Maybe<NftListing & { Currency: Currency }>;
  NftMetadata: NftMetadata;
  NftTransaction: Array<
    NftTransaction & {
      From: User & {
        Photo_PhotoToUser_coverPhotoId: Photo | null;
        Photo_PhotoToUser_profilePhotoId: Photo | null;
      };
    }
  >;
};

/**
 * Processes an NFT whose status is "Auction", but the auction has ended.
 * Does the following:
 *
 * 1. Insert an "AuctionWon" tx
 * 2. Notify the owner, saying the auction has ended and needs to be settled
 * 3. Notify the winning bidder, saying they won the auction
 * 4. Notify the losing bidders, saying they can withdraw their bids
 */
async function processNftAuctionWon(
  nft: NftForAuction,
  winningBidderTx: NftTransactionWithUsers
) {
  const prisma = getPrisma();

  const outbidUserIds = getOutbidUsers(
    nft.NftTransaction,
    winningBidderTx.txid!,
    winningBidderTx.fromUserId
  );
  const outbidUsers = filterNulls(
    await Promise.all(
      [...new Set(outbidUserIds)].map((userId) =>
        prisma.user.findUnique({ where: { id: userId } })
      )
    )
  );

  // 1. Insert an "AuctionWon" tx
  await prisma.nftTransaction.create({
    data: {
      Creator: {
        connect: {
          id: winningBidderTx.creatorId,
        },
      },
      Currency: {
        connect: {
          name: nft.NftListing!.Currency.name,
        },
      },
      From: {
        connect: {
          id: winningBidderTx.toUserId,
        },
      },
      Nft: {
        connect: {
          id: nft.id,
        },
      },
      NftTransactionType: {
        connect: { value: NftTransactionTypeExpress_Enum.AuctionWon },
      },
      To: {
        connect: {
          id: winningBidderTx.fromUserId,
        },
      },
      auctionCount: nft.auctionCount,
      price: nft.NftListing?.priceInLamports,
      timeCreated: nft.NftListing?.auctionEndTime ?? undefined,
      txid: null,
    },
  });

  // 2. Notify the owner
  const ownerId = winningBidderTx.toUserId;
  const owner = await prisma.user.findUnique({ where: { id: ownerId } });
  invariant(owner != null);
  logIfNotProd(`Emailing owner ${owner.email} that auction ended`);

  await createOwnerAuctionEndedNotification(
    {
      winningBidTransactionId: winningBidderTx.id,
    },
    owner.id,
    winningBidderTx.From.id
  );
  if (isProd()) {
    await sendSlackNotification(
      SlackWebhook.AuctionAlertChannel,
      `*Auction End Alert* (${nft.mint}): auction ended!` +
        ` Check it out at https://formfunction.xyz/@/${nft.mint}`
    );
  }

  // 3. Notify the winning bidder
  logIfNotProd(
    `Emailing winning bidder ${winningBidderTx.From.email} that they won the auction`
  );
  await createBidderWonAuctionNotification(
    {
      nftMint: nft.mint,
    },
    winningBidderTx.From.id,
    owner.id
  );

  // 4. Notify the losing bidders
  if (outbidUsers.length > 0) {
    logIfNotProd(
      `Emailing the losing bidders ${outbidUsers
        .map((u) => u.email)
        .join(", ")} that they lost the auction`
    );
    await Promise.all(
      outbidUsers.map((outbidUser) =>
        processOutbidLimit(async () => {
          try {
            logIfNotProd(
              `Processing outbid user with email ${outbidUser.email}, id ${outbidUser.id}, and username ${outbidUser.username}`
            );
            await createBidderLostAuctionNotification(
              {
                nftMint: nft.mint,
              },
              outbidUser.id,
              owner.id
            );
          } catch (e) {
            logError(
              AnalyticsEvent.ProcessFinishedAuctionsError,
              e as Error,
              null,
              {
                auctionCount: nft.auctionCount,
                mint: nft.mint,
                outbidUser,
              }
            );
          }
        })
      )
    );
  } else {
    logIfNotProd("There are no outbid users");
  }
}

/**
 * Processes an NFT whose status is "Auction", but the auction has ended and the NFT
 * did not receive any bids (may be the case for scheduled auctions). Does the following:
 *
 * 1. Notify the owner, saying that the auction had no bids
 * 2. Updates NFT state
 */
async function processNftNoBids(nft: NftForAuction) {
  const errorMessage =
    `Could not find winning bidder for NFT with mint ` +
    `${nft.mint} and auction count of ${nft.auctionCount}`;

  logError(
    AnalyticsEvent.ProcessFinishedAuctionsNoWinningBidder,
    errorMessage,
    null,
    {
      auctionCount: nft.auctionCount,
      mint: nft.mint,
    }
  );

  const prisma = getPrisma();
  const owner = await prisma.user.findUnique({ where: { id: nft.ownerId } });
  invariant(owner != null);

  // 1. Notify the owner
  await createOwnerAuctionEndedNoBidsNotification(
    { nftMint: nft.mint },
    owner.id
  );

  // 2. Update the NFT & listing
  await prisma.nft.update({
    data: {
      NftListing: {
        update: {
          auctionEndTime: null,
          scheduledAuctionTime: null,
        },
      },
      status: NftStatusExpress_Enum.Listed,
    },
    where: { mint: nft.mint },
  });
}

/**
 * Processes an NFT whose status is "Auction", but the auction has ended.
 */
async function processNft(nft: NftForAuction) {
  const startTime = dayjs();
  logIfNotProd(`Processing NFT with mint ${nft.mint}`);

  const winningBidder = getWinningBidForMostRecentAuction(nft.NftTransaction);
  if (
    winningBidder == null ||
    winningBidder.tx.auctionCount < nft.auctionCount
  ) {
    await processNftNoBids(nft);
  } else {
    await processNftAuctionWon(nft, winningBidder.tx);
  }

  logEvent(AnalyticsEvent.ProcessFinishedAuctionsProcessNftFinished, null, {
    ...getTimeElapsed(startTime),
    auctionCount: nft.auctionCount,
    mint: nft.mint,
  });
}

export default async function processFinishedAuctions() {
  const prisma = getPrisma();
  const nftsForAuction = await prisma.nft.findMany({
    include: {
      NftListing: {
        include: {
          Currency: true,
        },
      },
      NftMetadata: true,
      NftTransaction: {
        include: {
          From: {
            include: CONVERT_USER_INCLUDE,
          },
        },
        orderBy: {
          timeCreated: "desc",
        },
        where: {
          // We ignore imported transactions
          source: null,
        },
      },
    },
    where: {
      NftListing: {
        auctionEndTime: {
          lt: dayjs()
            // Give a bit of buffer time to account for last-second bids.
            // E.g. the following scenario is possible, and we need to account for it:
            //   - User approves bid tx
            //   - Auction ends while bid tx is being finalized
            //   - Bid tx is finalized
            //   - insertNftTransactionResolver inserts bid
            .subtract(AUCTION_END_BUFFER)
            .toDate(),
        },
      },
      status: NftStatusExpress_Enum.Auction,
    },
  });
  logIfNotProd(`${nftsForAuction.length} NFTs are currently for auction`);

  const nftsForAuctionEnded: typeof nftsForAuction = await asyncFilter(
    nftsForAuction,
    async (nft) => {
      const hasBeenProcessed =
        nft.NftTransaction.find(
          (tx) =>
            tx.type === NftTransactionTypeExpress_Enum.AuctionWon &&
            tx.auctionCount === nft.auctionCount
        ) != null;
      return !hasBeenProcessed;
    }
  );

  logIfNotProd(
    `${nftsForAuctionEnded.length} / ${nftsForAuction.length} of those NFTs have an ended auction, and have not been processed yet`
  );

  await Promise.all(
    nftsForAuctionEnded.map((nft) => processNftsLimit(() => processNft(nft)))
  );

  return nftsForAuctionEnded;
}
