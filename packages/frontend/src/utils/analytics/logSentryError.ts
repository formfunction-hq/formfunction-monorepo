import * as Sentry from "@sentry/react";
import { Severity } from "@sentry/react";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import getErrorPropertiesToLog from "formfn-shared/dist/utils/analytics/getErrorPropertiesToLog";

function getFingerprint(
  event: AnalyticsEvent,
  e: Error | string,
  extra?: { [key: string]: any }
) {
  if (event === AnalyticsEvent.TopLevelEvent) {
    return [event, getErrorPropertiesToLog(e).errorMessage];
  }
  if (event === AnalyticsEvent.RpcError && extra?.errorMessage != null) {
    return [event, extra.errorMessage];
  }
  return [event];
}

export default function logSentryError(
  event: AnalyticsEvent,
  e: Error | string,
  extra?: { [key: string]: any },
  severity = Severity.Error
) {
  Sentry.captureException(typeof e === "string" ? `${event}—${e}` : e, {
    extra,
    fingerprint: getFingerprint(event, e, extra),
    level: severity,
    tags: {
      event,
      eventSource: "frontend",
    },
  });
}
