import { NextFunction, Request, Response } from "express";

import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

/**
 * Async errors are only caught by Express 5 (https://expressjs.com/en/guide/error-handling.html).
 * This middleware catches all errors and logs them before passing things off to Express's default error handler.
 */
export default function logErrors(handler: Handler): Handler {
  const handlerWithLogging: Handler = async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (e) {
      await logError(AnalyticsEvent.ExpressError, e as Error, req);
      next(e);
    }
  };

  return handlerWithLogging;
}
