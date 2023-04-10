import dayjs from "src/utils/dates/dayjsex";
import { NextFunction, Request, Response } from "express";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logEvent from "src/utils/analytics/logEvent";
import getTimeElapsed from "src/utils/dates/getTimeElapsed";
import getPrisma from "src/utils/prisma/getPrisma";
import pLimit from "p-limit";
import logError from "src/utils/analytics/logError";
import { OfferWithNftAndTransaction } from "src/types/OfferWithNftAndTransaction";
import cancelAndRefundOffer from "src/utils/offers/cancelAndRefundOffer";
import OFFER_WITH_NFT_AND_TRANSACTION_INCLUDE from "src/constants/include/OfferWithNftAndTransactionInclude";
import maybeBackfillRefundTxidForOffer from "src/utils/offers/maybeBackfillRefundTxidForOffer";
import jsonStringify from "formfn-shared/dist/utils/jsonStringify";

const parallelLimit = pLimit(10);

/**
 * Process expired offers.
 */
export default async function processExpiredOffersHandler(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const startTime = dayjs();
  const prisma = getPrisma();
  const expiredOffers: Array<OfferWithNftAndTransaction> =
    await prisma.offer.findMany({
      include: OFFER_WITH_NFT_AND_TRANSACTION_INCLUDE,
      where: {
        AND: [
          { saleTransactionId: null },
          { refundTxid: null },
          { expirationDate: { lte: startTime.toDate() } },
          { expirationDate: { gt: startTime.subtract(1, "week").toDate() } },
        ],
      },
    });

  const refundAttempts = await Promise.all(
    expiredOffers.map((offer) =>
      parallelLimit(async () => cancelAndRefundOffer(req, offer))
    )
  );

  const failedRefundAttempts = refundAttempts.filter((item) => !item.success);
  const failedOffers = expiredOffers.filter((offer) =>
    failedRefundAttempts.find((item) => item.id === offer.id)
  );

  // Try to backfill failed refund attempts in case this is one of those cases
  // where the refund succeeded but we failed to insert the refundTxid to the DB
  const backfillAttempts = await Promise.all(
    failedOffers.map((offer) => maybeBackfillRefundTxidForOffer(req, offer))
  );
  const failedBackfillAttempts = backfillAttempts.filter(
    (item) => !item.success
  );
  if (failedBackfillAttempts.length > 0) {
    // Only log if we fail to backfill the failed cancelAndRefundOffer attempts
    await logError(
      AnalyticsEvent.ProcessExpiredOffersError,
      `ProcessExpiredOffers failed to process ${failedBackfillAttempts.length} offers`,
      req,
      {
        failedBackfillAttempts,
        failedRefundAttempts,
      }
    );
  }

  const successfulBackfills = backfillAttempts.filter((item) => item.success);
  const successfulRefunds = refundAttempts.filter((item) => item.success);
  await logEvent(AnalyticsEvent.ProcessExpiredOffersInfo, null, {
    success: true,
    ...getTimeElapsed(startTime),
    successfulBackfills,
    successfulRefunds,
  });

  res.json(
    jsonStringify({
      success: true,
      ...getTimeElapsed(startTime),
      failedBackfillAttempts,
      failedOffers,
      successfulBackfills,
      successfulRefunds,
    })
  );
}
