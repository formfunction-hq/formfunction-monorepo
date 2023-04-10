import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import { Request } from "express";
import logEventToLoki from "src/utils/analytics/logEventToLoki";
import getRequest from "src/utils/async-local-storage/getRequest";

export default async function logEvent(
  event: AnalyticsEvent,
  // TODO[@arcticmatt]: technically not necessary because we can fetch from AsyncLocalStorage
  req?: MaybeUndef<Request>,
  properties?: { [key: string]: any }
): Promise<void> {
  if (process.env.NODE_ENV === "test") {
    return;
  }

  await logEventToLoki(event, req ?? getRequest(), properties);
}
