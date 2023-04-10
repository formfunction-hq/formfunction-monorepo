import { Severity } from "@sentry/react";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import getDefaultLogProperties from "utils/analytics/getDefaultLogProperties";
import getErrorEventSeverity from "utils/analytics/getErrorEventSeverity";
import logEvent from "utils/analytics/logEvent";
import logSentryError from "utils/analytics/logSentryError";
import toObject from "formfn-shared/dist/utils/toObject";
import getErrorPropertiesToLog from "formfn-shared/dist/utils/analytics/getErrorPropertiesToLog";
import logIfNotProd from "utils/logIfNotProd";

export default function logError(
  event: AnalyticsEvent,
  error: Error | string,
  data?: { [key: string]: any },
  severityOverride?: Severity
) {
  logIfNotProd("An error occurred: ", error);
  const errorProperties = getErrorPropertiesToLog(error);

  const severity =
    severityOverride != null
      ? severityOverride
      : getErrorEventSeverity(event, error);

  const properties = {
    ...(data == null ? {} : toObject(data)),
    ...errorProperties,
    severity,
  };
  logEvent(event, properties);
  logSentryError(
    event,
    error,
    {
      ...properties,
      event,
      ...getDefaultLogProperties(),
    },
    severity
  );
}
