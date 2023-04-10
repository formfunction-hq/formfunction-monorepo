import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import { Request } from "express";
import logEvent from "src/utils/analytics/logEvent";
import logSentryError from "src/utils/analytics/logSentryError";
import getDefaultLogProperties from "src/utils/analytics/getDefaultLogProperties";
import { SeverityLevel } from "@sentry/node";
import getErrorEventSeverity from "src/utils/analytics/getErrorEventSeverity";
import getErrorPropertiesToLog from "formfn-shared/dist/utils/analytics/getErrorPropertiesToLog";
import getRequest from "src/utils/async-local-storage/getRequest";

export default async function logError(
  event: AnalyticsEvent,
  error: Error | string,
  // TODO[@arcticmatt]: technically not necessary because we can fetch from AsyncLocalStorage
  req?: MaybeUndef<Request>,
  properties?: { [key: string]: any },
  severityOverride?: SeverityLevel
): Promise<void> {
  if (process.env.NODE_ENV === "test") {
    return;
  }

  if (process.env.LOG_ERRORS_TO_CONSOLE === "true") {
    // eslint-disable-next-line no-console
    console.error(error);
  }

  const severity =
    severityOverride != null
      ? severityOverride
      : getErrorEventSeverity(event, error);

  const errorProperties = getErrorPropertiesToLog(error);

  const request = req ?? getRequest();
  await logEvent(event, request, {
    ...properties,
    ...errorProperties,
    severity,
  });

  logSentryError(
    event,
    error,
    {
      ...properties,
      ...errorProperties,
      event,
      severity,
      ...getDefaultLogProperties(request),
    },
    severity
  );
}
