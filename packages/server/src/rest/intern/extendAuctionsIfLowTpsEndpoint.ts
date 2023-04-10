import { NextFunction, Request, Response } from "express";
import getSolanaNetworkHealth from "formfn-shared/dist/utils/solana/health/getSolanaNetworkHealth";
import getLdFlag from "src/utils/launch-darkly/getLdFlag";
import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";
import SolanaNetworkHealth from "formfn-shared/dist/types/enums/SolanaNetworkHealth";
import getPrisma from "src/utils/prisma/getPrisma";
import dayjs from "src/utils/dates/dayjsex";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import pLimit from "p-limit";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import ConvertNftToMetadataAccountType from "src/types/convert/ConvertNftToMetadataAccountType";
import {
  NftStatusExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import { Duration } from "dayjs/plugin/duration";
import getRpcRetryUrls from "src/utils/launch-darkly/getRpcRetryUrls";
import { Connection } from "@solana/web3.js";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import NFT_TRANSACTION_ORDER_BY from "src/constants/orderBy/NftTransactionOrderBy";
import NftTransactionWithUsers from "src/types/NftTransactionWithUsers";
import createBidderAuctionExtendedNotifications from "src/utils/notifications/create/createBidderAuctionExtendedNotifications";
import createOwnerAuctionExtendedNotification from "src/utils/notifications/create/createOwnerAuctionExtendedNotification";

const limit = pLimit(20);

async function createNotificationsForNft(
  nft: ConvertNftToMetadataAccountType & {
    NftTransaction: Array<NftTransactionWithUsers>;
  },
  extensionDuration: Duration
) {
  await createOwnerAuctionExtendedNotification(
    {
      nftMint: nft.mint,
      numMinutesExtended: extensionDuration.asMinutes(),
    },
    nft.ownerId
  );

  const bidTxsForCurrentAuction = nft.NftTransaction.filter(
    (tx) =>
      tx.type === NftTransactionTypeExpress_Enum.Bid &&
      tx.auctionCount === nft.auctionCount
  );

  const notifData = {
    minutesExtendedBy: extensionDuration.asMinutes(),
    nftMint: nft.mint,
  };
  await createBidderAuctionExtendedNotifications(
    bidTxsForCurrentAuction.map((tx) => ({
      data: notifData,
      receiverId: tx.fromUserId,
      senderId: nft.ownerId,
    }))
  );
}

export default async function extendAuctionsIfLowTpsEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const [
    extensionDurationInMinutes,
    enableLowTpsExtensions,
    enableLowTpsExtensionsForUnknownNetworkHealth,
  ] = await Promise.all([
    getLdFlag(LaunchDarklyFlag.LowTpsExtensionDurationInMinutes, 30),
    getLdFlag(LaunchDarklyFlag.EnableLowTpsExtensions, false),
    getLdFlag(
      LaunchDarklyFlag.EnableLowTpsExtensionsForUnknownNetworkHealth,
      false
    ),
  ]);
  const dryRun = req.body.dryRun === true || !enableLowTpsExtensions;
  const extensionDuration = dayjs.duration({
    minutes: extensionDurationInMinutes,
  });

  const rpcRetryUrls = await getRpcRetryUrls();
  const connections = rpcRetryUrls.map((rpc) => new Connection(rpc));
  const [solanaTpsLookbackInMinutes, solanaTpsCutoffs] = await Promise.all([
    getLdFlag(LaunchDarklyFlag.SolanaTpsLookbackInMinutes, 5),
    getLdFlag(LaunchDarklyFlag.SolanaTpsCutoffs, {
      solanaDownTpsCutoff: 500,
      solanaSlowTpsCutoff: 1250,
    }),
  ]);
  const networkHealth = await getSolanaNetworkHealth(
    connections,
    solanaTpsLookbackInMinutes,
    solanaTpsCutoffs.solanaDownTpsCutoff,
    solanaTpsCutoffs.solanaSlowTpsCutoff
  );

  if (networkHealth.health === SolanaNetworkHealth.Unknown) {
    logError(
      AnalyticsEvent.ExtendAuctionsIfLowTpsError,
      "Network health is unknown",
      req,
      {
        networkHealth,
      }
    );
  }

  if (
    networkHealth.health !== SolanaNetworkHealth.Down &&
    (!enableLowTpsExtensionsForUnknownNetworkHealth ||
      networkHealth.health !== SolanaNetworkHealth.Unknown)
  ) {
    res.json({ networkHealth });
    return;
  }

  const prisma = getPrisma();
  const auctionsNearEnding = await prisma.nft.findMany({
    include: {
      ...CONVERT_NFT_TO_METADATA_INCLUDE,
      NftTransaction: {
        include: {
          From: {
            include: CONVERT_USER_INCLUDE,
          },
        },
        orderBy: NFT_TRANSACTION_ORDER_BY,
        take: 100,
      },
    },
    where: {
      NftListing: {
        auctionEndTime: {
          gte: dayjs().toDate(),
          lte: dayjs()
            .add(dayjs.duration({ minutes: req.body.minutesToAdd ?? 30 }))
            .toDate(),
          not: null,
        },
      },
      status: NftStatusExpress_Enum.Auction,
    },
  });

  const nftsBefore = auctionsNearEnding.map((nft) => ({
    auctionEndTime: dayjs(nft.NftListing?.auctionEndTime).toString(),
    mint: nft.mint,
  }));
  const response = {
    dryRun,
    networkHealth,
    nftsBefore,
  };

  if (auctionsNearEnding.length > 0) {
    // Log error so Sentry will alert us when this happens
    logError(
      AnalyticsEvent.ExtendAuctionsIfLowTpsDetected,
      `${dryRun ? "[dry run] " : ""}Extending ${
        auctionsNearEnding.length
      } auctions because of low tps (${networkHealth.tps?.toFixed(2)})`,
      req,
      response
    );
  }

  if (dryRun || auctionsNearEnding.length === 0) {
    res.json(response);
    return;
  }

  const nftsAfter = await Promise.all(
    auctionsNearEnding.map((nft) =>
      limit(async () => {
        const data = {
          auctionEndTime: dayjs(nft.NftListing!.auctionEndTime)
            .add(extensionDuration)
            .toDate(),
        };
        try {
          await prisma.nftListing.update({
            data,
            where: { nftId: nft.mint },
          });

          await createNotificationsForNft(nft, extensionDuration);
          return {
            auctionEndTime: data.auctionEndTime,
            mint: nft.mint,
            success: true,
          };
        } catch (e) {
          return { errorMessage: (e as Error).message, success: false };
        }
      })
    )
  );
  const nftsAfterToLog = nftsAfter.map((result) =>
    result.success
      ? {
          auctionEndTime: dayjs(result.auctionEndTime).toString(),
          mint: result.mint,
        }
      : result
  );

  const numFailures = nftsAfter.filter((result) => !result.success).length;
  if (numFailures > 0) {
    logError(
      AnalyticsEvent.ExtendAuctionsIfLowTpsError,
      `Failed to extend ${numFailures} auctions because of low tps (${networkHealth.tps?.toFixed(
        2
      )})`,
      req,
      {
        ...response,
        nftsAfter: nftsAfterToLog,
        numFailures,
      }
    );
  } else {
    logError(
      AnalyticsEvent.ExtendAuctionsIfLowTpsSuccess,
      `Successfully extended ${
        nftsAfter.length
      } auctions because of low tps (${networkHealth.tps?.toFixed(2)})`,
      req,
      {
        ...response,
        nftsAfter: nftsAfterToLog,
      }
    );
  }

  res.json({
    ...response,
    nftsAfter: nftsAfterToLog,
  });
}
