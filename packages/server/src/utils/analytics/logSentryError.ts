import * as Sentry from "@sentry/node";
import { SeverityLevel } from "@sentry/node";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import SentryTagName from "src/types/enums/SentryTagName";
import getRequest from "src/utils/async-local-storage/getRequest";
import getOperationName from "src/utils/request/getOperationName";

export default function logSentryError(
  event: AnalyticsEvent,
  e: Error | string,
  extra?: { [key: string]: any },
  severity: SeverityLevel = "error"
) {
  const request = getRequest();
  const captureContext = {
    extra,
    fingerprint: [event],
    level: severity,
    tags: {
      [SentryTagName.Event]: event,
      [SentryTagName.GraphqlOperationName]:
        request == null ? undefined : getOperationName(request),
      [SentryTagName.Machine]: process.env.DD_SERVICE ?? "undefined",
    },
  };

  if (typeof e === "string") {
    Sentry.captureMessage(`${event}—${e}`, captureContext);
  } else {
    Sentry.captureException(e, captureContext);
  }
}
