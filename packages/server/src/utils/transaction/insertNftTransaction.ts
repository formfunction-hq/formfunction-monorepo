import getPrisma from "src/utils/prisma/getPrisma";
import {
  EditionsMerkleAllowlistInfoExpress,
  InsertNftTransactionInput,
  NftExpress,
  NftTransactionExpress,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import dayjs from "src/utils/dates/dayjsex";
import { Prisma } from "@prisma/client";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import { Dayjs } from "dayjs";
import { Request } from "express";
import logEvent from "src/utils/analytics/logEvent";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import getParsedTransactionWithRetries from "src/utils/solana/getParsedTransactionWithRetries";
import { ParsedTransactionWithMeta } from "@solana/web3.js";
import ConvertNftToMetadataAccountType from "src/types/convert/ConvertNftToMetadataAccountType";
import getUserConnectOrCreate from "src/utils/prisma/getUserConnectOrCreate";
import getLdFlag from "src/utils/launch-darkly/getLdFlag";
import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";
import convertNftTransaction from "src/utils/convert/convertNftTransaction";
import CONVERT_NFT_TRANSACTION_INCLUDE from "src/constants/include/ConvertNftTransactionInclude";
import toObject from "formfn-shared/dist/utils/toObject";
import { AuctionHouseSdk } from "@formfunction-hq/formfunction-auction-house";
import PrismaTransactionClient from "src/types/PrismaTransactionClient";
import updateNftForTransaction from "src/utils/transaction/updateNftForTransaction";
import updateMasterEditionNftForTransaction from "src/utils/transaction/updateMasterEditionNftForTransaction";
import executeAdditionalUpdatesForTransaction from "src/utils/transaction/executeAdditionalUpdatesForTransaction";
import insertNftForTransaction from "src/utils/transaction/insertNftForTransaction";
import getTimeElapsed from "src/utils/dates/getTimeElapsed";
import getCurrencyNameForTxType from "src/utils/nft/getCurrencyForTxType";
import ConvertNftTransactionType from "src/types/convert/ConvertNftTransactionType";
import isBotTaxedTransaction from "formfn-shared/dist/utils/solana/txs/parse/isBotTaxedTransaction";
import convertEditionsMerkleAllowlistInfo from "src/utils/convert/convertEditionsMerkleAllowlistInfo";
import CONVERT_EDITIONS_MERKLE_ALLOWLIST_INFO_INCLUDE from "src/constants/include/ConvertEditionsMerkleAllowlistInfoInclude";

const VALIDATE_BID_BUFFER_DURATION = dayjs.duration({ minutes: 5 });

/**
 * For bids, need to use the transaction's block time, because of race conditions.
 *
 * I.e. if a bid of 0.6 and 0.8 are placed, it's possible that both of them go through
 * on-chain, but have the same block time. If this happens, we want to ensure that they
 * are inserted with the same timestamp in our database, which may not happen unless
 * we specifically use the transaction block time.
 *
 * For everything else, it's less necessary, but still nice to use the transaction's block time
 * to keep our DB in sync with on-chain data.
 *
 * However, in some cases, Solana's blocktime can be out-of-sync with the current time.
 * In these cases, we may need to fallback to using the server time.
 */
function getTxTime(
  parsedTx: Maybe<ParsedTransactionWithMeta>,
  input: InsertNftTransactionInput,
  useTransactionBlockTime: boolean
) {
  const blockTime =
    parsedTx?.blockTime == null ? undefined : dayjs.unix(parsedTx.blockTime);
  const fallbackTime =
    input.timeCreatedFallback != null
      ? dayjs(input.timeCreatedFallback)
      : dayjs();

  return useTransactionBlockTime ? blockTime ?? fallbackTime : fallbackTime;
}

async function validateNftBid(
  req: MaybeUndef<Request>,
  oldNft: Maybe<ConvertNftToMetadataAccountType>,
  txTime: Dayjs,
  parsedTx: Maybe<ParsedTransactionWithMeta>,
  useTransactionBlockTime: boolean
): Promise<void> {
  // Here are the rules for bidding (with regards to time):
  // 1. You must bid BEFORE the current auction end time
  // 2. If you bid, and there is < TIME_EXTENSION_DURATION left in the auction,
  //    the auction gets extended (see shouldExtendAuction)
  //
  // NOTE: we use VALIDATE_BID_BUFFER_DURATION to handle edge cases where the bid
  // goes through on-chain (we also validate auction end time on-chain), but the
  // tx takes a while to confirm, and so by the time we get to this logic,
  // the current time is past the auction end time. This is only necessary if useTransactionBlockTime
  // is false.
  if (
    oldNft?.NftListing?.auctionEndTime != null &&
    txTime.isSameOrAfter(
      dayjs(oldNft.NftListing.auctionEndTime).add(
        useTransactionBlockTime
          ? dayjs.duration({ seconds: 0 })
          : VALIDATE_BID_BUFFER_DURATION
      )
    )
  ) {
    const error = new Error("Bid is too late");
    logError(AnalyticsEvent.ValidateNftBidError, error, req, {
      oldNft,
      txTime,
    });
    throw error;
  }

  // TODO: do this for non-bids
  if (parsedTx != null && parsedTx.meta?.err != null) {
    throw new Error(JSON.stringify(parsedTx.meta.err));
  }
}

export default async function insertNftTransaction(
  req: MaybeUndef<Request>,
  input: InsertNftTransactionInput,
  options: {
    convertedNft?: NftExpress;
    isCrossmint?: boolean;
    // In cases where we backfill transactions via scripts/manually, we sometimes do
    // not want to update the NFT/Master Edition NFT. In these cases, we allow the caller
    // to specify this.
    updateMasterEditionNft?: boolean;
    updateNft?: boolean;
  } = {}
): Promise<{
  editionsMerkleAllowlistInfoForBuyer: Maybe<EditionsMerkleAllowlistInfoExpress>;
  transaction: NftTransactionExpress;
  updatedMasterEditionNft: Maybe<ConvertNftToMetadataAccountType>;
  updatedNft: Maybe<ConvertNftToMetadataAccountType>;
}> {
  const {
    convertedNft,
    updateNft = true,
    updateMasterEditionNft = true,
  } = options;
  const {
    comment,
    creatorId,
    currencyName,
    fromUserId,
    id,
    ixIndex,
    ixInnerIndex,
    mint,
    price,
    toUserId,
    txid,
    type,
  } = input;
  const startTime = dayjs();
  logEvent(
    AnalyticsEvent.InsertNftTransactionCalled,
    req,
    toObject({
      convertedNft,
      input,
    })
  );

  // TODO: assert parsedTx is null(?)
  const [parsedTx, useTransactionBlockTime] = await Promise.all([
    getParsedTransactionWithRetries(
      txid,
      type,
      type === NftTransactionTypeExpress_Enum.Bid ? 7 : 5
    ),
    getLdFlag(LaunchDarklyFlag.UseTransactionBlockTime, true),
  ]);
  logEvent(
    AnalyticsEvent.InsertNftTransactionDuration,
    req,
    toObject({
      ...getTimeElapsed(startTime),
      description: "After fetching tx",
      input,
    })
  );

  // Sometimes bot-taxed transactions show up, we want to ignore them.
  if (parsedTx != null && isBotTaxedTransaction(parsedTx)) {
    const errorMsg = "Transaction was bot taxed and will not be inserted.";
    logError(AnalyticsEvent.BotTaxedTransaction, errorMsg, req, {
      input,
      parsedTx,
    });
    throw new Error(errorMsg);
  }

  const txTime = getTxTime(parsedTx, input, useTransactionBlockTime);
  const editionNumber =
    parsedTx == null ? null : AuctionHouseSdk.getEditionNumberFromTx(parsedTx);

  try {
    // Try/catch here so that if the transaction times out, we can log a more useful error
    const [updatedNft, updatedMasterEditionNft, nftTransaction] =
      await getPrisma().$transaction<
        [
          Maybe<ConvertNftToMetadataAccountType>,
          Maybe<ConvertNftToMetadataAccountType>,
          ConvertNftTransactionType
        ]
      >(
        async (prisma: PrismaTransactionClient) => {
          const insertedNft = await insertNftForTransaction(
            prisma,
            input,
            editionNumber,
            parsedTx
          );

          const oldNft =
            insertedNft ??
            (await prisma.nft.findUnique({
              include: CONVERT_NFT_TO_METADATA_INCLUDE,
              where: { mint },
            }));
          if (type === NftTransactionTypeExpress_Enum.Bid) {
            await validateNftBid(
              req,
              oldNft,
              txTime,
              parsedTx,
              useTransactionBlockTime
            );
          }

          // Only update if `updateNft` is true
          // NOTE: defining separately for readability
          const updateNftResult = updateNft
            ? updateNftForTransaction(
                prisma,
                req,
                input,
                oldNft,
                txTime,
                useTransactionBlockTime,
                convertedNft
              )
            : oldNft;
          const updatedNftInner = insertedNft ?? (await updateNftResult);

          const updatedMasterEditionNftInner = updateMasterEditionNft
            ? await updateMasterEditionNftForTransaction(
                prisma,
                input,
                oldNft,
                editionNumber,
                txTime
              )
            : null;

          const currencyNameForTx = getCurrencyNameForTxType(
            type,
            oldNft?.NftListing?.Currency,
            currencyName
          );
          const createAndUpdateFields: Prisma.NftTransactionCreateInput = {
            Creator: getUserConnectOrCreate(creatorId),
            Currency:
              currencyNameForTx != null
                ? {
                    connect: { name: currencyNameForTx },
                  }
                : undefined,
            From: getUserConnectOrCreate(fromUserId),
            Nft: {
              connect: {
                mint,
              },
            },
            NftTransactionType: {
              connect: {
                value: type,
              },
            },
            To: getUserConnectOrCreate(toUserId),
            // Even if the auction count gets incremented (e.g. when NFT is sold), this transaction should still
            // use the old auction count. Subsequent txs will use the new count.
            auctionCount: [
              NftTransactionTypeExpress_Enum.SoldEditionPrimary,
              NftTransactionTypeExpress_Enum.SoldGenerativeMint,
            ].includes(type)
              ? // In this case, the auction count of oldNft will be 1, but we want the auction count of the tx to be 0
                0
              : oldNft?.auctionCount ?? 0,
            comment,
            id: id ?? undefined,
            isCrossmint: options.isCrossmint,
            ixIndex: ixIndex ?? undefined,
            ixInnerIndex: ixInnerIndex ?? undefined,
            price: price == null ? null : Number(price),
            timeCreated: txTime.toDate(),
            txid,
          };

          // TODO: see if we can convert back to `create` now that we
          // don't insert on-platform transactions via the indexer script
          const insertedTransactionInner = await prisma.nftTransaction.upsert({
            create: createAndUpdateFields,
            include: CONVERT_NFT_TRANSACTION_INCLUDE,
            update: createAndUpdateFields,
            where: {
              txid_ixIndex_ixInnerIndex: {
                ixIndex: ixIndex ?? -1,
                ixInnerIndex: ixInnerIndex ?? -1,
                txid,
              },
            },
          });

          await executeAdditionalUpdatesForTransaction(
            prisma,
            input,
            insertedTransactionInner.id,
            txTime,
            oldNft
          );

          return [
            updatedNftInner,
            updatedMasterEditionNftInner,
            insertedTransactionInner,
          ];
        },
        {
          // Default is 2 seconds
          maxWait: dayjs.duration({ seconds: 30 }).asMilliseconds(),
          // Default is 5 seconds
          timeout: dayjs.duration({ seconds: 60 }).asMilliseconds(),
        }
      );
    logEvent(
      AnalyticsEvent.InsertNftTransactionDuration,
      req,
      toObject({
        ...getTimeElapsed(startTime),
        description: "After prisma transaction",
        input,
      })
    );

    const allowlistInfo =
      input.type === NftTransactionTypeExpress_Enum.SoldEditionPrimary
        ? await getPrisma().editionsMerkleAllowlistInfo.findUnique({
            include: CONVERT_EDITIONS_MERKLE_ALLOWLIST_INFO_INCLUDE,
            where: {
              userId_nftId: {
                nftId: input.insertStandardEditionInput!.masterEditionMint,
                userId: input.toUserId,
              },
            },
          })
        : null;

    const returnData = {
      editionsMerkleAllowlistInfoForBuyer:
        allowlistInfo == null
          ? null
          : await convertEditionsMerkleAllowlistInfo(
              allowlistInfo,
              input.insertStandardEditionInput!.masterEditionMint,
              input.toUserId
            ),
      transaction: convertNftTransaction(nftTransaction),
      updatedMasterEditionNft,
      updatedNft,
    };

    logEvent(AnalyticsEvent.InsertNftTransactionSuccess, req, {
      input,
      ...getTimeElapsed(startTime),
      ...toObject(returnData),
    });

    return returnData;
  } catch (e) {
    logError(AnalyticsEvent.InsertNftTransactionError, e as Error, req, {
      input,
      options,
    });
    throw e;
  }
}
