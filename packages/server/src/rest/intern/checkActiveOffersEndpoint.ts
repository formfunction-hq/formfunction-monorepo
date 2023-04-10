import dayjs from "src/utils/dates/dayjsex";
import { NextFunction, Request, Response } from "express";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logEvent from "src/utils/analytics/logEvent";
import getTimeElapsed from "src/utils/dates/getTimeElapsed";
import getPrisma from "src/utils/prisma/getPrisma";
import pLimit from "p-limit";
import logError from "src/utils/analytics/logError";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";
import CONVERT_NFT_TRANSACTION_INCLUDE from "src/constants/include/ConvertNftTransactionInclude";
import { getCompareByProperty } from "formfn-shared/dist/utils/getCompareByProperty";
import SortOrder from "formfn-shared/dist/types/enums/SortOrder";
import parseCancelOfferTx from "src/utils/solana/txs/parse/parseCancelOfferTx";
import getBuyerEscrowBalance from "src/utils/solana/getBuyerEscrowBalance";
import groupBy from "formfn-shared/dist/utils/array/groupBy";
import ConvertNftTransactionType from "src/types/convert/ConvertNftTransactionType";
import { Offer, PrismaClient } from "@prisma/client";
import { PublicKey } from "@solana/web3.js";
import sleepMs from "formfn-shared/dist/utils/sleepMs";
import toObject from "formfn-shared/dist/utils/toObject";
import getAuctionHouseSdk from "src/utils/solana/getAuctionHouseSdk";
import { CurrencyNameExpress_Enum } from "src/__generated__/generated";
import { decodeAuctionHouseTransaction } from "@formfunction-hq/formfunction-auction-house";
import getAuctionHouseConstants from "src/utils/solana/getAuctionHouseConstants";

const parallelLimit = pLimit(10);

enum Result {
  Failed = "failed",
  NoOp = "no-op",
  Success = "success",
}

async function getMostRecentTxForBuyerEscrowAccount(
  buyerEscrowAddress: PublicKey
) {
  const signatures = await ConnectionWrapper.getConfirmedSignaturesForAddress2(
    buyerEscrowAddress
  );
  const mostRecentSignature = signatures.sort(
    getCompareByProperty("blockTime", SortOrder.Desc)
  )[0];

  return {
    mostRecentSignature,
    parsedTx:
      mostRecentSignature != null
        ? await ConnectionWrapper.getParsedTransaction(
            mostRecentSignature.signature
          )
        : null,
    signatures,
  };
}

async function processOffer(
  prisma: PrismaClient,
  offer: Offer & {
    NftTransaction: ConvertNftTransactionType;
  }
) {
  const returnResponse = (
    result: Result,
    otherInfo?: { [key: string]: any },
    errorMessage?: string
  ) => ({
    errorMessage,
    offer,
    otherInfo,
    result,
  });

  const auctionHouseSdk = getAuctionHouseSdk(
    offer.NftTransaction.Currency.name as CurrencyNameExpress_Enum
  );

  // 1. Check buyer escrow balance
  const { price, mint, From: buyer, To: seller } = offer.NftTransaction;
  const {
    escrowPaymentAccount: buyerEscrowAddress,
    escrowPaymentAccountInfo: buyerEscrowAccount,
    balance,
  } = await getBuyerEscrowBalance(auctionHouseSdk, buyer.id, mint, "confirmed");

  let loggingData: { [key: string]: any } = {
    balance,
    buyerEscrowAccount,
    buyerEscrowAddress,
  };
  if (balance === Number(price)) {
    return returnResponse(Result.NoOp, loggingData);
  }

  // 2. Fetch most recent tx for buyer escrow account
  const { mostRecentSignature, signatures, parsedTx } =
    await getMostRecentTxForBuyerEscrowAccount(buyerEscrowAddress);
  loggingData = {
    ...loggingData,
    mostRecentSignature,
    parsedTx,
    signatures,
  };
  if (parsedTx == null) {
    return returnResponse(
      Result.Failed,
      loggingData,
      `Could not load most recent tx for buyer escrow for ${offer.NftTransaction.txid}`
    );
  }

  // 3. Try to parse as cancel offer tx
  const decodedTransaction = decodeAuctionHouseTransaction(
    getAuctionHouseConstants().programId,
    parsedTx
  );
  const cancelOfferTx = await parseCancelOfferTx(parsedTx, decodedTransaction);
  loggingData = { ...loggingData, cancelOfferTx };
  if (cancelOfferTx == null) {
    return returnResponse(
      Result.Failed,
      loggingData,
      `Most recent tx for buyer escrow cannot be parsed as cancel offer tx for ${offer.NftTransaction.txid}`
    );
  }

  // 4. Check if cancel offer tx "matches" the offer
  // NOTE: this is probably the best balance of using an efficient heuristic
  // with good accuracy but it is worth noting that false positives are possible
  // since there isn't anything explicitly tying the original offer tx to this tx
  if (
    cancelOfferTx.fromAddress !== buyer.id ||
    cancelOfferTx.toAddress !== seller.id ||
    Number(cancelOfferTx.priceInLamports) !== Number(price) ||
    (await prisma.offer.count({
      where: { refundTxid: cancelOfferTx.txid },
    })) > 0
  ) {
    return returnResponse(
      Result.Failed,
      loggingData,
      `Most recent cancel offer tx for ${offer.NftTransaction.txid} does not match offer`
    );
  }

  // 5. Update the offer object
  try {
    await prisma.offer.update({
      data: { refundTxid: cancelOfferTx.txid },
      where: { nftTransactionId: offer.nftTransactionId },
    });
  } catch (e: any) {
    return returnResponse(
      Result.Failed,
      {
        ...loggingData,
        error: e,
      },
      `DB update failed for ${offer.NftTransaction.txid}`
    );
  }

  return returnResponse(Result.Success, loggingData);
}

/**
 * Make sure all active offers are in a valid state.
 */
export default async function checkActiveOffersEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const startTime = dayjs();
  const prisma = getPrisma();
  const activeOffers = await prisma.offer.findMany({
    include: {
      NftTransaction: { include: CONVERT_NFT_TRANSACTION_INCLUDE },
    },
    where: {
      AND: [
        { saleTransactionId: null },
        { refundTxid: null },
        { expirationDate: { gt: startTime.toDate() } },
      ],
    },
  });

  const processed = await Promise.all(
    activeOffers.map((offer) =>
      parallelLimit(async () => processOffer(prisma, offer))
    )
  );
  const resultsGroupedBy = groupBy(processed, (item) => item.result);
  const failed = resultsGroupedBy[Result.Failed];

  if ((failed?.length ?? 0) > 0) {
    // For failed ones, sleep 5s and try again since there could be false positives
    // due to onchain state not being finalized
    await sleepMs(30 * 1000);
    const retried = await Promise.all(
      failed.map(({ offer }) => processOffer(prisma, offer))
    );
    const retriedResultsGroupedBy = groupBy(retried, (item) => item.result);
    const retriedFailed = retriedResultsGroupedBy[Result.Failed];
    if ((retriedFailed?.length ?? 0) > 0) {
      await logError(
        AnalyticsEvent.CheckActiveOffersError,
        `CheckActiveOffers failed to process ${failed.length} offers`,
        req,
        {
          failed: retriedFailed.map((item) => ({
            ...item,
            offer: toObject(item.offer),
          })),
        }
      );
    }

    await logEvent(AnalyticsEvent.ProcessExpiredOffersDuration, null, {
      ...getTimeElapsed(startTime),
    });

    res.json({
      success: true,
      ...getTimeElapsed(startTime),
      ...toObject(retriedResultsGroupedBy),
    });
    return;
  }

  await logEvent(AnalyticsEvent.ProcessExpiredOffersDuration, null, {
    ...getTimeElapsed(startTime),
  });

  res.json({
    success: true,
    ...getTimeElapsed(startTime),
    ...toObject(resultsGroupedBy),
  });
}
