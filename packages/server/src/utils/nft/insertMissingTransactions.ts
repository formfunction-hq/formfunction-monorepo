/* eslint-disable no-continue */
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logEvent from "src/utils/analytics/logEvent";
import {
  NftExpress,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import { Request } from "express";
import logError from "src/utils/analytics/logError";
import isProd from "src/utils/isProd";
import sendSlackNotification from "src/utils/tooling/sendSlackNotification";
import SlackWebhook from "src/types/enums/SlackWebhook";
import insertNftTransaction from "src/utils/transaction/insertNftTransaction";
import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";
import { getCompareByProperty } from "formfn-shared/dist/utils/getCompareByProperty";
import SortOrder from "formfn-shared/dist/types/enums/SortOrder";
import getPrisma from "src/utils/prisma/getPrisma";
import getLdFlag from "src/utils/launch-darkly/getLdFlag";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import dayjs from "dayjs";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import INSERT_MISSING_TRANSACTION_TYPES from "src/constants/InsertMissingTransactionTypes";

const TX_TYPES_TO_INSERT_AFTER_DELAY = [NftTransactionTypeExpress_Enum.Burned];

const TX_TYPES_TO_INSERT = [
  NftTransactionTypeExpress_Enum.Transferred,
  ...TX_TYPES_TO_INSERT_AFTER_DELAY,
];

/**
 * Helper function that will insert transactions passed in as
 * `onchainTxs` if they're not present in our DB. Will update the
 * NFT state as it uses `insertNftTransaction` under the hood.
 *
 * Note that this is mainly responsible for inserting transactions that are NOT
 * tracked by our NftTransactionRaw table, i.e. transfers and burns (which can both happen off platform);
 */
export default async function insertMissingTransactions(
  mint: string,
  onchainTxs: Array<NftTransactionOnchain>,
  isImported: boolean,
  convertedNft?: NftExpress,
  req?: Request
) {
  if (onchainTxs.length === 0) {
    return [];
  }

  const insertedTxs: Array<NftTransactionOnchain> = [];

  const [ignoreList, delay] = await Promise.all([
    getLdFlag<Array<string>>(
      LaunchDarklyFlag.MissingTransactionsIgnoreList,
      []
    ),
    getLdFlag(LaunchDarklyFlag.SyncTxsInsertDelay, Infinity),
  ]);
  const expectedMissingTxTypes = [
    // We expect these to be inserted by fetchNftRawTxs
    ...INSERT_MISSING_TRANSACTION_TYPES,
    NftTransactionTypeExpress_Enum.Imported,
    ...TX_TYPES_TO_INSERT,
  ];

  // Check to see if there are any missing transactions that must be accounted for
  const prisma = getPrisma();
  const dbTxids = new Set(
    filterNulls(
      (
        await prisma.nftTransaction.findMany({
          select: { txid: true },
          where: {
            mint,
          },
        })
      ).map((tx) => tx.txid)
    )
  );

  const sortedOnchainTxs = onchainTxs.sort(
    getCompareByProperty("timeCreated", SortOrder.Asc)
  );
  const sortedOnchainTxsNotInDb = sortedOnchainTxs
    .filter((tx) => {
      const { txid, type } = tx;
      const alreadyInDb = txid != null && dbTxids.has(txid);
      const inIgnoreList = txid != null && ignoreList.includes(txid);
      const isAuctionWon =
        txid == null && type === NftTransactionTypeExpress_Enum.AuctionWon;
      const isHolaplexLimitedEditionMintTx =
        type === NftTransactionTypeExpress_Enum.Minted && isImported;

      return (
        !alreadyInDb &&
        !inIgnoreList &&
        !isAuctionWon &&
        !isHolaplexLimitedEditionMintTx
      );
    })
    .map((tx) => {
      const latestTx = sortedOnchainTxs[sortedOnchainTxs.length - 1];
      return {
        isLatest:
          latestTx.txid === tx.txid &&
          latestTx.ixIndex === tx.ixIndex &&
          latestTx.ixInnerIndex === tx.ixInnerIndex,
        tx,
      };
    });

  for (let i = 0; i < sortedOnchainTxsNotInDb.length; i += 1) {
    const { tx: onchainTx, isLatest } = sortedOnchainTxsNotInDb[i];
    const {
      timeCreated,
      creatorId,
      toAddress: toUserId,
      fromAddress: fromUserId,
      priceInLamports: price,
      type,
      txid,
    } = onchainTx;

    if (!expectedMissingTxTypes.includes(type)) {
      // Log error if we see an unexpected tx type
      logError(
        AnalyticsEvent.RefreshNftInsertUnexpectedTransaction,
        `Found unexpected missing transaction with type ${type}`,
        req,
        {
          mint,
          onchainTransaction: onchainTx,
          type,
        }
      );
    }

    if (!TX_TYPES_TO_INSERT.includes(type)) {
      // Only process types to insert after this point
      continue;
    }

    if (
      TX_TYPES_TO_INSERT_AFTER_DELAY.includes(type) &&
      dayjs().diff(dayjs(timeCreated), "minute", true) < delay
    ) {
      // If the tx was created very recently, skip and let the next run catch this
      // to prevent race conditions.
      continue;
    }

    if (isProd()) {
      const channel =
        type === NftTransactionTypeExpress_Enum.Transferred
          ? SlackWebhook.TransferAlertChannel
          : SlackWebhook.SyncTxAlertsChannel;
      // eslint-disable-next-line no-await-in-loop
      await sendSlackNotification(
        channel,
        `${type} tx detected with txid = ${txid} for NFT https://formfunction.xyz/@/${mint}`
      );
    }

    logEvent(AnalyticsEvent.RefreshNftInsertTransaction, req, {
      mint,
      onchainTransaction: onchainTx,
    });
    insertedTxs.push(onchainTx);
    // eslint-disable-next-line no-await-in-loop
    await insertNftTransaction(
      req,
      {
        creatorId,
        currencyName: onchainTx.price?.currencyInfo.name,
        fromUserId,
        ixIndex: onchainTx.ixIndex,
        ixInnerIndex: onchainTx.ixInnerIndex,
        mint,
        price,
        toUserId,
        txid: txid!,
        type,
      },
      // Using `isLatest` as the heuristic for whether or not we should update
      // the NFT should be fine since this function only inserts certain types
      // of txs, all of which should only apply changes if it is the latest missing tx
      { convertedNft, updateNft: isLatest }
    );
  }

  return insertedTxs;
}
