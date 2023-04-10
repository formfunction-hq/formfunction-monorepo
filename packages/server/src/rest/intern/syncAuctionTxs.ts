import dayjs from "src/utils/dates/dayjsex";
import { NextFunction, Request, Response } from "express";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import getPrisma from "src/utils/prisma/getPrisma";
import parseNftTx from "src/utils/solana/txs/parse/parseNftTx";
import pLimit from "p-limit";
import logEvent from "src/utils/analytics/logEvent";
import getTimeElapsed from "src/utils/dates/getTimeElapsed";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import removeDuplicatesWithSet from "formfn-shared/dist/utils/array/removeDuplicatesWithSet";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";
import parseAndInsertTransaction from "src/utils/transaction/parseAndInsertTransaction";
import getErrorPropertiesToLog from "formfn-shared/dist/utils/analytics/getErrorPropertiesToLog";
import getAuctionHouseConstants from "src/utils/solana/getAuctionHouseConstants";
import loadCandyMachineSdk from "src/utils/solana/loadCandyMachineSdk";
import getConfirmedSignaturesForAddress from "src/utils/solana/getConfirmedSignaturesForAddress";
import getParsedTransactionsForSignatures from "src/utils/solana/getParsedTransactionsForSignatures";
import arrayLast from "formfn-shared/dist/utils/array/arrayLast";

const limit = pLimit(5);

/**
 * Queries for on-chain transactions, and alerts if any are missing from the NftTransaction or
 * NftTransactionRaw tables.
 *
 * Also tries to automatically insert any missing transactions.
 *
 * The most likely scenario where txs are missing are if people submit txs off-platform.
 */
export default async function syncAuctionTxs(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const startTime = dayjs();

  const {
    maxSecondsAgo,
    secondsAgo,
    auctionHouseTxsConfig: {
      limit: auctionHouseTxsLimit,
      beforeTxid: auctionHouseBeforeTxid,
    },
    candyMachineTxsConfig: {
      limit: candyMachineTxsLimit,
      beforeTxid: candyMachineBeforeTxid,
    },
    logOnly,
  } = req.body;

  // We only consider transactions that occurred BEFORE now() - secondsAgo.
  // This is because there may be some delay between when a transaction is confirmed
  // and when it gets inserted into our DB via normal mechanisms (e.g. by the
  // insertNftTransaction resolver, or by the fetchNftRawTxs endpoint).
  const secondsAgoConstraint = secondsAgo != null ? Number(secondsAgo) : 60;

  // We only consider transactions that occurred AFTER now() - maxSecondsAgo.
  // This is so that if we fail to insert a transaction, we don't repeatedly
  // get errors trying to insert it every time this endpoint is called.
  const maxSecondsAgoConstraint =
    maxSecondsAgo != null ? Number(maxSecondsAgo) : 600;

  const auctionHouseSignatures = await getConfirmedSignaturesForAddress(
    getAuctionHouseConstants().programId,
    auctionHouseTxsLimit ?? 5000,
    true,
    auctionHouseBeforeTxid
  );
  const candyMachineSignatures = await getConfirmedSignaturesForAddress(
    loadCandyMachineSdk().candyMachineProgramId,
    candyMachineTxsLimit ?? 5000,
    true,
    candyMachineBeforeTxid
  );
  const auctionHouseSignaturesSet = new Set(auctionHouseSignatures);
  const candyMachineSignaturesSet = new Set(candyMachineSignatures);

  const signatures = [...auctionHouseSignatures, ...candyMachineSignatures];

  const prisma = getPrisma();
  const [dbRawTxs, dbTxs, deletedTxs] = await Promise.all([
    prisma.nftTransactionRaw.findMany({
      where: {
        txid: {
          in: signatures,
        },
      },
    }),
    prisma.nftTransaction.findMany({
      where: {
        txid: {
          in: signatures,
        },
      },
    }),
    prisma.deletedNftTransaction.findMany({
      where: {
        txid: {
          in: signatures,
        },
      },
    }),
  ]);
  const dbTxids = removeDuplicatesWithSet(
    [...dbRawTxs, ...dbTxs].map((tx) => tx.txid)
  );
  const signaturesNotInDb = signatures.filter(
    (signature) =>
      !dbTxids.includes(signature) &&
      !deletedTxs.map((tx) => tx.txid).includes(signature)
  );
  const parsed = await getParsedTransactionsForSignatures(
    signaturesNotInDb.map((signature) => signature)
  );
  const parsedTxsNotInDb: Array<NftTransactionOnchain> = filterNulls(
    await Promise.all(
      parsed.map((parsedTx) =>
        limit(async () => {
          if (parsedTx == null) {
            return null;
          }

          const txTime = dayjs.unix(parsedTx.blockTime!);
          if (
            txTime.isAfter(
              dayjs().subtract(
                dayjs.duration({ seconds: secondsAgoConstraint })
              )
            ) ||
            txTime.isBefore(
              dayjs().subtract(
                dayjs.duration({ seconds: maxSecondsAgoConstraint })
              )
            )
          ) {
            return null;
          }

          const parsedNftTx = await parseNftTx(parsedTx);
          if (parsedNftTx?.type === NftTransactionTypeExpress_Enum.Minted) {
            return null;
          }
          if (
            parsedNftTx != null &&
            [
              NftTransactionTypeExpress_Enum.ListedEditions,
              NftTransactionTypeExpress_Enum.SoldEditionPrimary,
            ].includes(parsedNftTx.type)
          ) {
            const airdrop = await prisma.airdrop.findFirst({
              where: {
                OR: [
                  { standardEditionMint: parsedNftTx.mint },
                  { standardEditionMintRaw: parsedNftTx.mint },
                  { masterEditionMint: parsedNftTx.mint },
                ],
              },
            });
            if (airdrop != null) {
              // We don't want to insert ListedEditions/SoldEditionPrimary txs for NFTs
              // that are part of an airdrop.
              return null;
            }
          }

          return parsedNftTx;
        })
      )
    )
  );

  logEvent(AnalyticsEvent.SyncAuctionTxsDuration, req, {
    ...getTimeElapsed(startTime),
  });

  const commonLogData = {
    auctionHouseTxCursors: {
      leastRecent: arrayLast(auctionHouseSignatures),
      mostRecent: auctionHouseSignatures[0],
    },
    candyMachineTxCursors: {
      leastRecent: arrayLast(candyMachineSignatures),
      mostRecent: candyMachineSignatures[0],
    },
    numMissing: parsedTxsNotInDb.length,
  };
  if (parsedTxsNotInDb.length === 0) {
    res.json({
      ...commonLogData,
      parsed,
      parsedTxsNotInDb,
      signaturesNotInDb,
      signaturesNotInDbLength: signaturesNotInDb.length,
      success: true,
    });
    return;
  }

  logError(
    AnalyticsEvent.MissingTransactionsError,
    `Found ${parsedTxsNotInDb.length} missing transactions from NftRawTransaction and/or NftTransaction tables`,
    req,
    {
      numTxs: parsedTxsNotInDb.length,
      txs: parsedTxsNotInDb.map((tx) => ({
        mint: tx.mint.toString(),
        txid: tx.txid,
        type: tx.type,
      })),
    }
  );

  if (logOnly === true) {
    res.json({
      missingAuctionHouseTxs: parsedTxsNotInDb
        .filter((tx) => auctionHouseSignaturesSet.has(tx.txid ?? ""))
        .map((tx) => ({
          mint: tx.mint,
          txid: tx.txid,
        })),
      missingCandyMachineTxs: parsedTxsNotInDb
        .filter((tx) => candyMachineSignaturesSet.has(tx.txid ?? ""))
        .map((tx) => ({
          mint: tx.mint,
          txid: tx.txid,
        })),
      ...commonLogData,
    });
    return;
  }

  // Try to insert the missing transactions
  const insertResults = await Promise.all(
    parsedTxsNotInDb.map((parsedTx) =>
      limit(async () => {
        const commonProperties = {
          fromUserId: parsedTx.fromAddress,
          mint: parsedTx.mint.toString(),
          toUserId: parsedTx.toAddress,
          txid: parsedTx.txid!,
          type: parsedTx.type,
        };

        try {
          await parseAndInsertTransaction(commonProperties);
          return {
            success: true,
            ...commonProperties,
          };
        } catch (e) {
          return {
            error: getErrorPropertiesToLog(e as Error),
            success: false,
            ...commonProperties,
          };
        }
      })
    )
  );

  const numInsertErrors = insertResults.filter(
    (result) => !result.success
  ).length;
  if (numInsertErrors > 0) {
    logError(
      AnalyticsEvent.MissingTransactionsError,
      `Failed to insert ${numInsertErrors} missing transactions into the NftTransactions table`,
      req,
      insertResults
    );
  } else {
    logEvent(AnalyticsEvent.MissingTransactionsInserted, req, insertResults);
  }

  res.json({
    insertResults,
    numMissing: parsedTxsNotInDb.length,
    success: true,
  });
}
