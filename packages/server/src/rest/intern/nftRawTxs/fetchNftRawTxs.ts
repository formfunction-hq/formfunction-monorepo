/* eslint-disable no-continue */
import { NftTransactionRaw, Prisma } from "@prisma/client";
import logError from "src/utils/analytics/logError";
import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import dayjs from "src/utils/dates/dayjsex";
import parseNftTx from "src/utils/solana/txs/parse/parseNftTx";
import { PublicKey, TransactionError } from "@solana/web3.js";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import {
  InsertNftInput,
  InsertNftTransactionEditionsInput,
  InsertNftTransactionUpdateClaimInput,
  InsertNftTransactionUpdateNftInput,
  InsertPnftInput,
  InsertStandardEditionInput,
  NftTransactionExpress,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import logEvent from "src/utils/analytics/logEvent";
import insertNftTransaction from "src/utils/transaction/insertNftTransaction";
import getTimeElapsed from "src/utils/dates/getTimeElapsed";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";
import CommitRawTxType from "formfn-shared/dist/types/enums/CommitRawTxType";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import INSERT_MISSING_TRANSACTION_TYPES from "src/constants/InsertMissingTransactionTypes";

type NftTransactionExpressWithError = NftTransactionExpress & {
  error: MaybeUndef<TransactionError>;
  extraData: Maybe<string>;
  isRaw: boolean;
  rawTxType: string;
};

type NftTransactionRawWithError = NftTransactionRaw & {
  error: MaybeUndef<TransactionError>;
  isRaw: boolean;
  rawTxType: string;
};

function prepareTxsForResponse(
  txs: Array<NftTransactionExpressWithError | NftTransactionRawWithError>
) {
  return txs.map(
    // Raw transactions will end up here if we failed to parse the on-chain txs
    // This should be rare.
    (tx) => ({
      // @ts-ignore
      creatorId: tx.creatorId,
      error: tx.error,
      mint: tx.mint,
      timeCreated: tx.timeCreated,
      txid: tx.txid,
      type: tx.type,
    })
  );
}

async function deleteTxs(txids: Array<string>, req: Request) {
  const prisma = getPrisma();
  try {
    await prisma.nftTransactionRaw.deleteMany({
      where: { txid: { in: txids } },
    });
  } catch (e: any) {
    await logError(AnalyticsEvent.GetNftTxRawFailedToParseTx, e, req, {
      txids,
    });
  }

  await logEvent(AnalyticsEvent.GetNftTxRawDeleteFailedTxsSuccess, req, {
    txids,
  });
}

async function parseRawTxs(
  rawTxs: Array<NftTransactionRaw>,
  includeFailed: boolean,
  req: Request
): Promise<{
  failedTxTxids: Array<string>;
  parsedTxs: Array<NftTransactionExpressWithError | NftTransactionRawWithError>;
}> {
  const failedTxTxids: Array<string> = [];
  const parsedTxs = await Promise.all(
    rawTxs.map(async (rawTx: any) => {
      let parsedTx;
      try {
        parsedTx = await ConnectionWrapper.getParsedTransaction(rawTx.txid);
      } catch (e: any) {
        // Technically should not be needed b/c getParsedTransaction catches errors...
        // but let's leave for now to be safe
        // TODO: clean up later
        await logError(AnalyticsEvent.GetNftTxRawFailedToFetchTx, e, req, {
          rawTx,
        });
      }
      // Filters out transactions that have failed or ones that could not be
      // fetched since they shouldn't end up in our DB anyways.
      // `includeFailed` can override this for debugging purposes
      if (parsedTx == null || parsedTx.meta?.err != null) {
        if (parsedTx?.meta?.err != null) {
          // Only delete transactions that we know to have failed for now
          failedTxTxids.push(rawTx.txid);
        }

        if (!includeFailed) {
          return null;
        }

        return {
          ...rawTx,
          error: parsedTx?.meta?.err,
          isRaw: true,
        };
      }

      const parsedNftTx = await parseNftTx(parsedTx, new PublicKey(rawTx.mint));

      return parsedNftTx != null
        ? {
            ...parsedNftTx,
            error: parsedTx.meta?.err,
            extraData: rawTx.extraData,
            isRaw: false,
            rawTxType: rawTx.type,
          }
        : {
            ...rawTx,
            error: parsedTx.meta?.err,
            isRaw: true,
            rawTxType: rawTx.type,
          };
    })
  );

  return { failedTxTxids, parsedTxs: filterNulls(parsedTxs) };
}

// TODO[@bryancho]: try to move reading as much of this from on-chain data as possible
function getExtraDataForCommitRawTxType(
  rawTxType: Maybe<CommitRawTxType>,
  extraData: Maybe<string>
): {
  comment?: MaybeUndef<string>;
  editionsInput?: InsertNftTransactionEditionsInput;
  insertNftInput?: InsertNftInput;
  insertPnftInput?: InsertPnftInput;
  insertStandardEditionInput?: InsertStandardEditionInput;
  offerTransactionId?: string;
  updateClaimInput?: InsertNftTransactionUpdateClaimInput;
  updateNftInput?: InsertNftTransactionUpdateNftInput;
} {
  const parsedExtraData = extraData != null ? JSON.parse(extraData) : null;
  if (parsedExtraData == null) {
    return {};
  }

  switch (rawTxType) {
    case CommitRawTxType.AcceptOffer:
      return {
        offerTransactionId: parsedExtraData.offerTransactionId,
      };
    case CommitRawTxType.ClaimPnft:
      return {
        insertPnftInput: parsedExtraData.insertPnftInput,
        updateClaimInput: parsedExtraData.updateClaimInput,
      };
    case CommitRawTxType.List:
      return {
        updateNftInput: {
          ...parsedExtraData.updateNftInput,
          scheduledAuctionTime:
            parsedExtraData.updateNftInput.scheduledAuctionTime == null
              ? null
              : dayjs(
                  parsedExtraData.updateNftInput.scheduledAuctionTime
                ).toDate(),
        },
      };
    case CommitRawTxType.ChangePriceForEditions:
    case CommitRawTxType.ListEditions:
      return {
        editionsInput: parsedExtraData.editionsInput,
        updateNftInput: parsedExtraData.updateNftInput,
      };
    case CommitRawTxType.BuyEdition:
      return {
        insertStandardEditionInput: parsedExtraData.insertStandardEditionInput,
      };
    case CommitRawTxType.Bid:
    case CommitRawTxType.MakeOffer:
      return {
        comment: parsedExtraData.comment,
      };
    case CommitRawTxType.MintMasterEdition:
      return {
        insertNftInput: parsedExtraData.insertNftInput,
      };
    case CommitRawTxType.BuyNow:
    case CommitRawTxType.CancelListing:
    case CommitRawTxType.ChangePrice:
    case CommitRawTxType.ManageSeriesPieces:
    case CommitRawTxType.SellInstantSale:
    case CommitRawTxType.SettleAuction:
    case CommitRawTxType.SetTickSize:
    case CommitRawTxType.SignMetadata:
    case CommitRawTxType.StoppedMintingForEditions:
    case CommitRawTxType.UpdateMetadata:
    case CommitRawTxType.SoldGenerativeMint:
    case null:
      return {};
    default:
      return assertUnreachable(rawTxType);
  }
}

export default async function fetchNftRawTxs(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const startTime = dayjs();
  const {
    afterSecondsAgo,
    afterTimestampInSeconds,
    deleteFailedInserts,
    deleteFailedTxs,
    doNotLog,
    includeFailed,
    insertMissing,
    insertTypes,
    limit,
    mint,
    missing,
    secondsAgo,
  } = req.body;
  const prisma = getPrisma();
  const nowDayjs = dayjs();
  const secondsAgoConstraint = secondsAgo
    ? parseInt(secondsAgo.toString(), 10)
    : 60;
  const limitConstraint = limit ? parseInt(limit.toString(), 10) : 100;
  const insertTypesAllowlist: Array<NftTransactionTypeExpress_Enum> =
    insertTypes ?? INSERT_MISSING_TRANSACTION_TYPES;

  if (missing?.toString() === "true") {
    const insertFailedTxids: Array<string> = [];
    const insertSuccessTxids: Array<string> = [];
    const afterSecondsAgoConstraint = afterTimestampInSeconds
      ? nowDayjs.diff(
          dayjs.unix(parseInt(afterTimestampInSeconds.toString(), 10)),
          "seconds"
        )
      : afterSecondsAgo != null
      ? Number(afterSecondsAgo)
      : 150;
    // We use raw SQL here since Prisma doesn't support relation queries
    // on non-foreign-key based relations.
    const queryWithMint = mint
      ? Prisma.sql`SELECT r.txid, r."timeCreated", r.mint, r."extraData", r.type
      FROM "NftTransactionRaw" r
      LEFT JOIN "NftTransaction" n
      ON r.txid = n.txid
      WHERE n.txid IS NULL
      AND r.mint = ${mint.toString()}::text
      AND r."timeCreated" >= (NOW() - ${afterSecondsAgoConstraint}::int * INTERVAL '1 second')
      AND r."timeCreated" < (NOW() - ${secondsAgoConstraint}::int * INTERVAL '1 second')
      AND ("extraData" IS NULL OR STRPOS("extraData", 'isSeries') = 0)
      AND ("extraData" IS NULL OR STRPOS("extraData", 'shouldIgnore') = 0)
      ORDER BY r."timeCreated" DESC
      LIMIT ${limitConstraint};`
      : Prisma.sql``;
    const queryWithoutMint = Prisma.sql`SELECT r.txid, r."timeCreated", r.mint, r."extraData", r.type
      FROM "NftTransactionRaw" r
      LEFT JOIN "NftTransaction" n
      ON r.txid = n.txid
      WHERE n.txid IS NULL
      AND r."timeCreated" >= (NOW() - ${afterSecondsAgoConstraint}::int * INTERVAL '1 second')
      AND r."timeCreated" < (NOW() - ${secondsAgoConstraint}::int * INTERVAL '1 second')
      AND ("extraData" IS NULL OR STRPOS("extraData", 'isSeries') = 0)
      AND ("extraData" IS NULL OR STRPOS("extraData", 'shouldIgnore') = 0)
      ORDER BY r."timeCreated" DESC
      LIMIT ${limitConstraint};`;

    const query =
      // Prisma's $queryRaw API doesn't seem to play nice with
      // conditional insertion of SQL statements so just constructing
      // a new one if `mint` is non-null
      mint ? queryWithMint : queryWithoutMint;

    const rawTxsMissingFromDb = (await prisma.$queryRaw(
      query
    )) as Array<NftTransactionRaw>;

    const { parsedTxs, failedTxTxids } = await parseRawTxs(
      rawTxsMissingFromDb as any,
      includeFailed === "true",
      req
    );

    if (deleteFailedTxs === "true") {
      await deleteTxs(failedTxTxids, req);
    }

    if (insertMissing === "true") {
      const parsedMissingTxs = parsedTxs.filter(
        (tx) => tx.isRaw === false
      ) as Array<NftTransactionExpressWithError>;
      for (let i = 0; i < parsedMissingTxs.length; i += 1) {
        const tx = parsedMissingTxs[i];
        const nftTransactionRaw = rawTxsMissingFromDb.find(
          (rawTx) => rawTx.txid === tx.txid
        );
        const {
          mint: mintInner,
          txid,
          type,
          priceInLamports: price,
          extraData,
          rawTxType,
        } = tx;
        const toUserId = tx.toAddress;
        const { creatorId } = tx;
        const fromUserId = tx.fromAddress;
        if (!insertTypesAllowlist.includes(type)) {
          logError(
            AnalyticsEvent.GetNftTxRawFailedToInsertTx,
            `inserting txs of type ${type} is not allowed by default, set insertTypes array to override`,
            req,
            {
              ...tx,
            },
            "warning"
          );
          insertFailedTxids.push(txid!);
          continue;
        }

        if (toUserId == null || creatorId == null || fromUserId == null) {
          logError(
            AnalyticsEvent.GetNftTxRawFailedToInsertTx,
            "required fields are missing in parsed tx",
            req,
            { ...tx }
          );
          insertFailedTxids.push(txid!);
          return;
        }

        const parsedExtraData = getExtraDataForCommitRawTxType(
          rawTxType as CommitRawTxType,
          extraData
        );

        try {
          // eslint-disable-next-line no-await-in-loop
          await insertNftTransaction(req, {
            comment: parsedExtraData.comment,
            creatorId: creatorId!,
            currencyName: tx.price?.currencyInfo.name,
            editionsInput: parsedExtraData.editionsInput,
            fromUserId: fromUserId!,
            insertNftInput: parsedExtraData.insertNftInput,
            insertPnftInput: parsedExtraData.insertPnftInput,
            insertStandardEditionInput:
              parsedExtraData.insertStandardEditionInput,
            mint: mintInner,
            offerTransactionId: parsedExtraData.offerTransactionId,
            price,
            timeCreatedFallback: nftTransactionRaw?.timeCreated,
            toUserId: toUserId!,
            txid: txid!,
            type,
            updateClaimInput: parsedExtraData.updateClaimInput,
            updateNftInput: parsedExtraData.updateNftInput,
          });
        } catch (e: any) {
          logError(AnalyticsEvent.GetNftTxRawFailedToInsertTx, e, req, {
            ...tx,
            details: "insert nft transaction call failed in fetch nft raw tx",
          });
          insertFailedTxids.push(txid!);
          continue;
        }
        insertSuccessTxids.push(txid!);
      }
    }

    if (parsedTxs.length > 0 && doNotLog !== "true") {
      const unParsedTxs = parsedTxs.filter((tx) => tx.isRaw === true);
      if (unParsedTxs.length > 0) {
        await logError(
          AnalyticsEvent.GetNftTxRawFailedToParseTx,
          "fetchNftRawTxs failed to parse some transactions",
          req,
          { sqlQuery: query.text, txids: parsedTxs.map((tx) => tx.txid) }
        );
      }

      await logError(
        AnalyticsEvent.GetNftTxRawFoundMissingTransactions,
        `fetchNftRawTxs found ${parsedTxs.length} missing transactions`,
        req,
        { sqlQuery: query.text, txids: parsedTxs.map((tx) => tx.txid) }
      );
    }

    if (deleteFailedInserts === "true" && insertFailedTxids) {
      await deleteTxs(insertFailedTxids, req);
    }

    logEvent(AnalyticsEvent.NftRawTxsDuration, req, {
      data: prepareTxsForResponse(parsedTxs),
      deletedTxids: deleteFailedTxs === "true" ? failedTxTxids : undefined,
      insertFailedTxids,
      insertSuccessTxids,

      ...getTimeElapsed(startTime),
    });
    res.json({
      data: prepareTxsForResponse(parsedTxs),
      deletedTxids: deleteFailedTxs === "true" ? failedTxTxids : undefined,
      insertFailedTxids,
      insertSuccessTxids,
    });
    return;
    // End of missing === "true" block
  }

  const afterTimestampConstraint = (
    afterTimestampInSeconds
      ? dayjs.unix(parseInt(afterTimestampInSeconds.toString(), 10))
      : nowDayjs.subtract(
          dayjs.duration({
            seconds: 150,
          })
        )
  )
    .utc()
    .format();
  const rawTxs = await prisma.nftTransactionRaw.findMany({
    orderBy: { timeCreated: "desc" },
    take: limitConstraint,
    where: {
      ...(mint ? { mint: { equals: mint.toString() } } : {}),
      timeCreated: {
        gte: afterTimestampConstraint,
        lt: nowDayjs
          .subtract(
            dayjs.duration({
              seconds: secondsAgoConstraint,
            })
          )
          .utc()
          .format(),
      },
    },
  });

  const { parsedTxs } = await parseRawTxs(
    rawTxs,
    includeFailed === "true",
    req
  );
  logEvent(AnalyticsEvent.NftRawTxsDuration, req, {
    data: prepareTxsForResponse(parsedTxs),
    ...getTimeElapsed(startTime),
  });
  res.json({ data: prepareTxsForResponse(parsedTxs) });
}
