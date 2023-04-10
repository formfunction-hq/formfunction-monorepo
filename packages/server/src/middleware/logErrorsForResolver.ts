import { Request } from "express";

import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";

export default async function logErrorsForResolver<T>(
  req: Request,
  resolver: () => Promise<T>
): Promise<T> {
  try {
    const result = await resolver();
    return result;
  } catch (e: any) {
    const errorMessage = e.message ?? "";

    if (errorMessage.includes("50")) {
      await logError(AnalyticsEvent.ResolverError500, e as Error, req);
    } else {
      await logError(AnalyticsEvent.ResolverError, e as Error, req);
    }
    throw e;
  }
}
