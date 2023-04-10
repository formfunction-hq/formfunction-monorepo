import { NextFunction, Request, Response } from "express";
import refundableAmountsResolver from "src/resolvers/query/refundableAmountsResolver";
import getPrisma from "src/utils/prisma/getPrisma";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";
import dayjs from "src/utils/dates/dayjsex";
import logError from "src/utils/analytics/logError";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logEvent from "src/utils/analytics/logEvent";
import toObject from "formfn-shared/dist/utils/toObject";
import getTimeElapsed from "src/utils/dates/getTimeElapsed";

/**
 * Checks to see if any users have a pending refund. Logs an error if so.
 */
export default async function checkRefundableAmounts(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const startTime = dayjs();

  const refundableAmounts = await refundableAmountsResolver(null, {});
  const prisma = getPrisma();

  const { amounts } = refundableAmounts;
  const amountsChecked = await Promise.all(
    amounts.map(async (amount) => {
      const userBid = await prisma.nftTransaction.findFirst({
        orderBy: {
          timeCreated: "desc",
        },
        where: {
          fromUserId: amount.userId,
          mint: amount.metadataAccount.mint,
          price: Number(amount.amountInLamports),
          type: NftTransactionTypeExpress_Enum.Bid,
        },
      });

      if (userBid == null) {
        // This should not happen, but let's account for it
        return { amount, include: true, message: "userBid was null" };
      }

      const bidAfterUserLastBid = await prisma.nftTransaction.findFirst({
        orderBy: {
          timeCreated: "asc",
        },
        where: {
          fromUserId: {
            not: amount.userId,
          },
          mint: amount.metadataAccount.mint,
          timeCreated: {
            gte: userBid.timeCreated,
          },
          type: NftTransactionTypeExpress_Enum.Bid,
        },
      });

      if (bidAfterUserLastBid == null) {
        return {
          amount,
          bidAfterUserLastBid,
          include: false,
          message: "bidAfterUserLastBid was null",
          userBid: toObject(userBid),
        };
      }

      // We check this because refunding is not instantaneous. And so after user A outbids user B,
      // user B will have a pending refund for a few minutes.
      const minutesSince = dayjs().diff(
        bidAfterUserLastBid.timeCreated,
        "minute",
        true
      );
      return {
        amount,
        include: minutesSince >= 10,
        message: `${minutesSince} minutes have elapsed since bidAfterLastUserBid`,
        userBid: toObject(userBid),
      };
    })
  );

  const pendingRefundExists = amountsChecked.some((amount) => amount.include);
  if (pendingRefundExists) {
    logError(
      AnalyticsEvent.PendingRefundsError,
      "A pending refund exists",
      req,
      {
        amountsChecked: toObject(amountsChecked),
      }
    );
  }

  logEvent(AnalyticsEvent.CheckRefundableAmountsDuration, req, {
    ...getTimeElapsed(startTime),
  });

  res.json({ amounts: toObject(amountsChecked) });
}
