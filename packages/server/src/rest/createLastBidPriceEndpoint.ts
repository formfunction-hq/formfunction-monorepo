import { NextFunction, Request, Response } from "express";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import createLastBidPrice from "src/utils/solana/createLastBidPrice";

export default async function createLastBidPriceEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { body } = req;
  const { mint } = body;

  try {
    await createLastBidPrice(mint);
  } catch (e) {
    logError(AnalyticsEvent.CreateLastBidPriceError, e as Error, req, { mint });

    res.json({ errorMessage: (e as Error).message, success: false });
    return;
  }

  res.json({ success: true });
}
