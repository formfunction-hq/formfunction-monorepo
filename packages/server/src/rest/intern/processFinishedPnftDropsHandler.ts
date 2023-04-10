import { NextFunction, Request, Response } from "express";
import processFinishedPnftDrops from "src/rest/intern/processFinishedPnftDrops";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import logEvent from "src/utils/analytics/logEvent";
import dayjs from "src/utils/dates/dayjsex";
import getTimeElapsed from "src/utils/dates/getTimeElapsed";

export default async function processFinishedPnftDropsHandler(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const startTime = dayjs();
  const results = await processFinishedPnftDrops(req);

  if (results.some((result) => result?.err != null)) {
    logError(
      AnalyticsEvent.ProcessFinishedPnftDropsFail,
      "Failed to process closing for some pNFT drops",
      req,
      { results }
    );
  }

  logEvent(AnalyticsEvent.ProcessFinishedPnftDropsFinish, req, {
    results,
    ...getTimeElapsed(startTime),
  });

  res.json({ results });
}
