import dayjs from "src/utils/dates/dayjsex";
import { NextFunction, Request, Response } from "express";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logEvent from "src/utils/analytics/logEvent";
import processFinishedAuctions from "src/utils/auction/processFinishedAuctions";
import getTimeElapsed from "src/utils/dates/getTimeElapsed";

/**
 * Process finished auctions to insert auction won transactions
 * and send out emails. See processFinishedAuctions.ts for more info.
 */
export default async function processFinishedAuctionsHandler(
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const startTime = dayjs();
  const processed = await processFinishedAuctions();

  logEvent(AnalyticsEvent.ProcessFinishedAuctionsDuration, null, {
    ...getTimeElapsed(startTime),
  });
  res.json({
    success: true,
    ...getTimeElapsed(startTime),
    processed: processed.map((nft) => nft.mint),
  });
}
