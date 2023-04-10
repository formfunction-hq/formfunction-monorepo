import { PublicKey } from "@solana/web3.js";
import { NextFunction, Request, Response } from "express";
import groupBy from "formfn-shared/dist/utils/array/groupBy";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import toObject from "formfn-shared/dist/utils/toObject";
import pLimit from "p-limit";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import ScriptResult from "src/types/enums/ScriptResult";
import logError from "src/utils/analytics/logError";
import insertNftTransaction from "src/utils/transaction/insertNftTransaction";
import dayjs from "src/utils/dates/dayjsex";
import getTimeElapsed from "src/utils/dates/getTimeElapsed";
import getUsersToCreateFromTransactions from "src/utils/nft/getUsersToCreateFromTransactions";
import getPrisma from "src/utils/prisma/getPrisma";
import parseBuyEditionTx from "src/utils/solana/txs/parse/editions/parseBuyEditionTx";
import getAllParsedTransactionsForAddress from "src/utils/solana/getAllParsedTransactionsForAddress";
import { decodeAuctionHouseTransaction } from "@formfunction-hq/formfunction-auction-house";
import getAuctionHouseConstants from "src/utils/solana/getAuctionHouseConstants";

export default async function backfillMissingEditions(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { dryRun, masterEditionMint, parallelLimit, lookbackBufferInSeconds } =
    req.body;
  const startTime = dayjs();
  const prisma = getPrisma();
  const limit = pLimit(parallelLimit != null ? Number(parallelLimit) : 10);
  const lookbackBufferNumber =
    lookbackBufferInSeconds != null ? Number(lookbackBufferInSeconds) : 60;

  const masterEditionMintKey = new PublicKey(masterEditionMint);
  const parsedTxs = await getAllParsedTransactionsForAddress(
    masterEditionMintKey
  );
  const parsedAsBuyEditionTxs = filterNulls(
    await Promise.all(
      parsedTxs.map((tx) => {
        const decodedTransaction = decodeAuctionHouseTransaction(
          getAuctionHouseConstants().programId,
          tx
        );
        return parseBuyEditionTx(tx, decodedTransaction, masterEditionMintKey);
      })
    )
  ).map(({ tx }) => tx);
  const parsedBuyTxids = parsedAsBuyEditionTxs.map((tx) => tx.txid!);
  const onPlatformTxids = (
    await Promise.all([
      prisma.nftTransactionRaw.findMany({
        select: { txid: true },
        where: { txid: { in: parsedBuyTxids } },
      }),
      prisma.nftTransaction.findMany({
        select: { txid: true },
        where: { txid: { in: parsedBuyTxids } },
      }),
    ])
  )
    .flat()
    .map(({ txid }) => txid);
  // Have a buffer so we're not inserting something that will get inserted organically
  const timeWithBufferSubtracted = dayjs().subtract(
    lookbackBufferNumber,
    "seconds"
  );
  const txsToProcess = parsedAsBuyEditionTxs.filter(
    // If we've already accounted for this tx in our DB, don't even bother processing it
    (tx) => !onPlatformTxids.includes(tx.txid!)
  );

  const results = await Promise.all(
    txsToProcess.map((tx) =>
      limit(async () => {
        if (dayjs(tx.timeCreated).isAfter(timeWithBufferSubtracted)) {
          return {
            message: "Transaction is too new",
            otherInfo: {
              timeThreshold: timeWithBufferSubtracted.toString(),
              tx,
            },
            result: ScriptResult.NoOp,
          };
        }

        if (dryRun === true) {
          return {
            otherInfo: { tx },
            result: ScriptResult.DryRunShouldBackfill,
          };
        }

        const {
          mint: standardEditionMint,
          txid,
          type,
          priceInLamports: price,
          creatorId,
          toAddress: toUserId,
          fromAddress: fromUserId,
        } = tx;
        const usersToCreate = await getUsersToCreateFromTransactions([tx]);
        // Create any users that don't exist on the platform yet
        await Promise.all(
          usersToCreate.map((address) =>
            prisma.user.upsert({
              create: {
                id: address,
                username: address,
              },
              update: {
                username: address,
              },
              where: {
                id: address,
              },
            })
          )
        );

        try {
          const { transaction } = await insertNftTransaction(req, {
            creatorId: creatorId!,
            currencyName: tx.price?.currencyInfo.name,
            fromUserId: fromUserId!,
            insertStandardEditionInput: {
              masterEditionMint,
              ownerId: toUserId,
              standardEditionMint,
            },
            mint: standardEditionMint,
            price,
            toUserId: toUserId!,
            txid: txid!,
            type,
          });

          return {
            otherInfo: { transaction, tx },
            result: ScriptResult.Success,
          };
        } catch (e: any) {
          return {
            message: "Failed to insert transaction",
            otherInfo: { error: e, tx },
            result: ScriptResult.Fail,
          };
        }
      })
    )
  );

  const resultsGroupedBy = groupBy(results, (result) => result.result);
  const responseData: {
    [key in ScriptResult]?: { count: number; items: any };
  } = Object.entries(resultsGroupedBy).reduce(
    (result, [backfillResult, groupedByList]) => ({
      ...result,
      [backfillResult]: {
        count: groupedByList.length,
        items: groupedByList,
      },
    }),
    {}
  );
  const failedResults = responseData[ScriptResult.Fail];
  const debugInfo = {
    onPlatformTxids,
    parsedAsBuyEditionTxs,
    parsedTxs,
    txsToProcess,
  };
  if (failedResults != null && failedResults.count > 0) {
    logError(
      AnalyticsEvent.BackfillMissingEditionsFail,
      `Backfill failed for ${failedResults.count} editions for ${masterEditionMint}`,
      req,
      toObject({ debugInfo, responseData })
    );
  }

  res.json(
    toObject({
      ...getTimeElapsed(startTime),
      debugInfo,
      responseData,
    })
  );
}
