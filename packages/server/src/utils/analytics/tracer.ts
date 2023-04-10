import tracer from "dd-trace";
import jsonStringify from "formfn-shared/dist/utils/jsonStringify";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logEvent from "src/utils/analytics/logEvent";

tracer.init({
  env: process.env.NODE_ENV,
  // https://stackoverflow.com/questions/48546124/what-is-linux-equivalent-of-host-docker-internal
  hostname: "host.docker.internal",
  logger: {
    debug: (message) =>
      logEvent(AnalyticsEvent.DatadogDebug, null, { message }),
    error: (error) => {
      if (typeof error === "string") {
        logEvent(AnalyticsEvent.DatadogError, null, {
          error,
        });
      } else {
        logEvent(AnalyticsEvent.DatadogError, null, {
          error: jsonStringify(error),
          errorMessage: error.message,
          errorName: error.name,
          errorStack: error.stack,
        });
      }
    },
    info: (message) => logEvent(AnalyticsEvent.DatadogInfo, null, { message }),
    warn: (message) => logEvent(AnalyticsEvent.DatadogWarn, null, { message }),
  },
  port: 8126,
  profiling: true,
}); // initialized in a different file to avoid hoisting.

export default tracer;
