import { StrictMode } from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import getEnvironment from "utils/getEnvironment";
import Environment from "formfn-shared/dist/types/Environment";
import getSentryEventSeverity from "utils/analytics/getSentryEventSeverity";
import getLdBootstrap from "utils/launch-darkly/getLdBootstrap";
import logIfNotProd from "utils/logIfNotProd";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import App from "App";
import reportWebVitals from "reportWebVitals";
import mixpanel from "mixpanel-browser";
import getMixpanelProjectToken from "formfn-shared/dist/utils/mixpanel/getMixpanelProjectToken";
import AnalyticsEvent from "types/enums/AnalyticsEvent";

const ldBootstrap = getLdBootstrap();

logIfNotProd("ldBootstrap", ldBootstrap);

function getTracesSampleRate() {
  const env = getEnvironment();
  switch (env) {
    case Environment.Local:
      return 0;
    case Environment.Testnet:
    case Environment.Development:
      return 0.01;
    case Environment.Production:
      return ldBootstrap?.tracesSampleRateFrontend ?? 0.05;
    default:
      return assertUnreachable(env);
  }
}

Sentry.init({
  attachStacktrace: true,
  beforeBreadcrumb(breadcrumb, hint) {
    // The || is for TS to compile.
    // But in this case should we just ts-ignore this line?
    // Because if it will be undefined .includes is totally fine with that
    if (
      breadcrumb.level === "error" &&
      ["fetch", "xhr"].includes(breadcrumb.category || "")
    ) {
      return {
        ...breadcrumb,
        data: {
          ...(breadcrumb.data || {}),
          request: hint?.input || hint?.xhr?.__sentry_xhr__,
        },
      };
    }
    return breadcrumb;
  },
  beforeSend(event) {
    // eslint-disable-next-line no-param-reassign
    event.tags = { event: AnalyticsEvent.TopLevelEvent, ...(event.tags ?? {}) };

    const severity = getSentryEventSeverity(event);
    if (severity != null) {
      // eslint-disable-next-line no-param-reassign
      event.level = severity;
    }

    return event;
  },
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: getEnvironment(),
  integrations: [new Integrations.BrowserTracing()],
  normalizeDepth: 6,

  release: process.env.REACT_APP_RELEASE,
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: getTracesSampleRate(),
});
Sentry.setTag("eventSource", "frontend");

mixpanel.init(getMixpanelProjectToken(getEnvironment()));

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
