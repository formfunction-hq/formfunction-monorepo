import { NextFunction, Request, Response } from "express";
import logEventToLoki from "src/utils/analytics/logEventToLoki";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import getPublicKey from "src/utils/headers/getPublicKey";

export default async function logEventToLokiEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { event, properties } = req.body;
  const userAddress = getPublicKey(req);
  const response = await logEventToLoki(
    event as AnalyticsEvent,
    req,
    { userAddress, ...properties },
    undefined,
    "frontend"
  );

  res.sendStatus(response?.status ?? 500);
}
