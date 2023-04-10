import dayjs from "src/utils/dates/dayjsex";
import { NextFunction, Request, Response } from "express";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import getPrisma from "src/utils/prisma/getPrisma";
import isNftSynced from "src/utils/solana/isNftSynced";
import toObject from "formfn-shared/dist/utils/toObject";
import {
  CurrencyNameExpress_Enum,
  NftStatusExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import logEvent from "src/utils/analytics/logEvent";
import getTimeElapsed from "src/utils/dates/getTimeElapsed";
import invariant from "tiny-invariant";
import pLimit from "p-limit";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import sleepMs from "formfn-shared/dist/utils/sleepMs";
import getAllTransferTxs from "src/utils/solana/txs/getAllTransferTxs";
import { ParsedInstruction, PublicKey } from "@solana/web3.js";
import insertMissingTransactions from "src/utils/nft/insertMissingTransactions";
import getOnchainAndDbNftStatus from "src/utils/nft/getOnchainAndDbNftStatus";
import getLdFlag from "src/utils/launch-darkly/getLdFlag";
import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";
import getMostRecentSetAuthorityTxForMint from "src/utils/solana/getMostRecentSetAuthorityTxForMint";
import insertNftTransaction from "src/utils/transaction/insertNftTransaction";
import getPromiseLimit from "src/utils/launch-darkly/getPromiseLimit";
import { AuctionHouseSdk } from "@formfunction-hq/formfunction-auction-house";
import getAuctionHouseSdk from "src/utils/solana/getAuctionHouseSdk";
import getNftTxs from "src/utils/solana/txs/getNftTxs";
import removeDuplicatesWithComparison from "formfn-shared/dist/utils/array/removeDuplicatesWithComparison";
import updateNftOwner from "src/utils/nft/updateNftOwner";

async function maybeInsertNewAuthorityAsTransfer(
  req: Request,
  mint: string,
  creatorId: string,
  previousOwnerId: string,
  newOwnerId: string
) {
  // If owners were not equal and we didn't insert any transactions
  // check to see if the owners are different because the owner of
  // the token account was explicitly changed
  const {
    tx: mostRecentSetAuthorityTx,
    ix: setAuthorityIx,
    ixIndex,
    ixInnerIndex,
  } = (await getMostRecentSetAuthorityTxForMint(
    new PublicKey(mint),
    previousOwnerId,
    newOwnerId
  )) ?? {};
  if (mostRecentSetAuthorityTx == null || setAuthorityIx == null) {
    logError(
      AnalyticsEvent.AreNftsSyncedDebug,
      "did not find set authority tx",
      req,
      { creatorId, mint, newOwnerId, previousOwnerId }
    );
    return false;
  }

  const setAuthorityIxInfo = (setAuthorityIx as ParsedInstruction).parsed.info;
  const { newAuthority: newOwnerAddress } = setAuthorityIxInfo;
  const previousOwnerAddress =
    setAuthorityIxInfo.authority ?? setAuthorityIxInfo.multisigAuthority;
  if (previousOwnerAddress == null || newOwnerAddress == null) {
    logError(
      AnalyticsEvent.AreNftsSyncedDebug,
      "invalid prev/new owner address",
      req,
      {
        creatorId,
        mint,
        mostRecentSetAuthorityTx,
        newOwnerAddress,
        passedInNewOwnerId: newOwnerId,
        passedInPreviousOwnerId: previousOwnerId,
        previousOwnerAddress,
        setAuthorityIx,
      }
    );
    return false;
  }

  if (
    previousOwnerAddress === previousOwnerId &&
    newOwnerAddress === newOwnerId
  ) {
    await insertNftTransaction(req, {
      creatorId,
      fromUserId: previousOwnerAddress,
      ixIndex,
      ixInnerIndex,
      mint,
      toUserId: newOwnerAddress,
      txid: mostRecentSetAuthorityTx.transaction.signatures[0],
      type: NftTransactionTypeExpress_Enum.Transferred,
    });

    return true;
  }

  return false;
}

async function checkIsNftSynced(
  mint: string,
  req: Request,
  confirmedSignaturesLimit: number,
  auctionHouseSdk: AuctionHouseSdk
): Promise<
  Maybe<{
    convertedNftToLog: {
      ownerId: Maybe<string>;
      price: Maybe<bigint>;
      status: NftStatusExpress_Enum;
    };
    mint: string;
    prismaNftToLog: {
      ownerId: string;
      price: Maybe<bigint>;
      status: string;
    };
  }>
> {
  const { onchainNft, prismaNft } = await getOnchainAndDbNftStatus(
    mint,
    confirmedSignaturesLimit
  );
  invariant(prismaNft != null, "prisma nft cannot be null");

  const convertedNftToLog = toObject({
    ownerId: onchainNft.ownerId,
    price: onchainNft.price,
    status: onchainNft.status,
  });

  const prismaNftToLog = toObject({
    ownerId: prismaNft?.ownerId,
    price: prismaNft?.NftListing?.priceInLamports,
    status: prismaNft?.status,
  });

  if (!(await isNftSynced(prismaNft!, onchainNft, auctionHouseSdk))) {
    // Sleep and try again in case this was due to a race condition
    await sleepMs(3000);

    const { onchainNft: onchainNftInner, prismaNft: prismaNftInner } =
      await getOnchainAndDbNftStatus(mint);
    invariant(prismaNftInner != null);

    if (
      !(await isNftSynced(prismaNftInner, onchainNftInner, auctionHouseSdk))
    ) {
      // If NFT is not synced, try syncing it
      const [onchainTransferTxs, nftTxs] = await Promise.all([
        getAllTransferTxs(new PublicKey(mint)),
        getNftTxs(new PublicKey(mint)),
      ]);
      const onchainTxs = removeDuplicatesWithComparison(
        // Order matters! We want to prioritize the transactions from getNftTxs over the transfer transactions,
        // because some of our transactions (like create_edition_distributor) also transfer the NFT.
        [...nftTxs, ...onchainTransferTxs],
        (a, b) => a.txid === b.txid
      );
      const insertedTxs = await insertMissingTransactions(
        mint,
        onchainTxs,
        prismaNftInner.isImported
      );
      if (insertedTxs.length > 0) {
        logEvent(AnalyticsEvent.AreNftsSyncedInsertedMissingTxs, req, {
          insertedTxs,
        });
      } else if (onchainNftInner.ownerId !== prismaNftInner.ownerId) {
        // If owners were not the same and we didn't insert any transactions,
        // try and see if the authority was explicitly changed and insert a
        // transfer tx
        const success = await maybeInsertNewAuthorityAsTransfer(
          req,
          mint,
          prismaNftInner!.creatorId!,
          prismaNftInner!.ownerId,
          onchainNftInner.ownerId!
        );
        if (success) {
          return null;
        }
      }

      // Before the final check, fix the owner manually
      await updateNftOwner(mint, onchainNftInner.ownerId!);

      // Final check
      const {
        onchainNft: onchainNftInnerInner,
        prismaNft: prismaNftInnerInner,
      } = await getOnchainAndDbNftStatus(mint);

      if (
        await isNftSynced(
          prismaNftInnerInner!,
          onchainNftInnerInner,
          auctionHouseSdk
        )
      ) {
        return null;
      }

      return { convertedNftToLog, mint, prismaNftToLog };
    }
  }

  return null;
}

/**
 * Checks if any NFTs are out of sync with on-chain state.
 *
 * TODO: consolidate with syncOnchainTxs
 */
export default async function areNftsSyncedEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const startTime = dayjs();
  const prisma = getPrisma();
  const mintIgnoreList = await getLdFlag<Array<string>>(
    LaunchDarklyFlag.AreNftsSyncedMintIgnoreList,
    []
  );
  const concurrency = await getPromiseLimit("areNftsSynced");
  const { confirmedSignaturesLimit, skip, take } = req.body;
  const limit = pLimit(concurrency);
  const mints = (
    await prisma.nft.findMany({
      include: { NftListing: { include: { Currency: true } } },
      orderBy: { timeCreated: "asc" },
      skip: skip != null ? Number(skip) : undefined,
      take: take != null ? Number(take) : undefined,
      where: {
        // We don't care about master edition pNFTs, because they are not meant to be sold/traded
        OR: [{ isMasterEdition: false, isPnft: true }, { isPnft: false }],
        mint: {
          notIn: [
            // Special-case early NFTs created by pencilflip whose status was manually
            // changed to burned to hide them...
            "AYzwNo6eASbiauvuaiRNUXQpjvqGTS1wP7m5XsBFMuaj",
            "7MzyqUseXP3bbKQR3UChiLjeJhjCL9rvvqNy9L7nTp95",
            "5uBGvZEWBqm9p5gXuFbDoeR9oWcRKVFAfXPgriCR4qnU",
            "HtxNMZxb5ScN6zusVfNJXHbdAfBypL1L6zYCgT68b3f1",
            "EiWEMbgYTTXMbKUHDMSxtYVebddMP9Txr7F8kSFu2eHL",
            "DtY4ExiChmPAhT3ZduPDfvPu8XDPysJQkugTsgcE57dd",
            "BH8JvDEcRxCkhdhiAA9Rb1A4hPCfooq71ujAD6e7iw1",
            "CBxx3m4zwjvfvAW1t1Q9HmKucXD7e54n2uqnqsMaPsci",
            "2Q4Z9xLZesFFWCnaJMoZGuMDFRBmif66jton7ecciJ2M",

            // Having Quicknode probs for this one https://app.asana.com/0/1201823109247614/1201812176054097/f
            // Ignoring for now so Sentry doesn't spam
            "BZHpF1EV4C9qYK7Bx6DUb9kNitmToAhQwJtYUMejVTwc",

            // User attempted to burn by sending to trash.sol...
            // marking them as burned to hide them
            "612NgqKT8PApomsdENM57Uu5ouBduHz6bghse1F8rUkT",
            "4V4LxWGgKDHhzswMaCtNbabNaBNUHDuMYPNVXJ2Yztni",

            // LD controlled list
            ...mintIgnoreList,
          ],
        },
        status: {
          not: {
            in: [
              NftStatusExpress_Enum.Burned,
              NftStatusExpress_Enum.AirdropCompleted,
              NftStatusExpress_Enum.AirdropInProgress,
            ],
          },
        },
      },
    })
  ).map((prismaNft) => ({
    listingCurrency: prismaNft.NftListing!.Currency,
    mint: prismaNft.mint,
  }));

  const outOfSyncNfts = filterNulls(
    await Promise.all(
      mints.map(({ mint, listingCurrency }) =>
        limit(async () => {
          try {
            return await checkIsNftSynced(
              mint,
              req,
              confirmedSignaturesLimit ?? 100,
              getAuctionHouseSdk(
                (listingCurrency.name as Maybe<CurrencyNameExpress_Enum>) ??
                  CurrencyNameExpress_Enum.Solana
              )
            );
          } catch (e) {
            logError(AnalyticsEvent.AreNftsSyncedError, e as Error, req, {
              mint,
            });
            return null;
          }
        })
      )
    )
  );

  const loggingData = {
    concurrency,
    outOfSyncNfts,
    skip,
    take,
    ...getTimeElapsed(startTime),
  };

  if (outOfSyncNfts.length > 0) {
    logError(
      AnalyticsEvent.OutOfSyncError,
      `${outOfSyncNfts.length} NFTs are out of sync (skip: ${skip}, take: ${take})`,
      req,
      loggingData
    );
  }

  logEvent(AnalyticsEvent.AreNftsSyncedDuration, req, loggingData);

  res.json(loggingData);
}
