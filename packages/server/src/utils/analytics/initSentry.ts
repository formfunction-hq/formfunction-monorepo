import * as Sentry from "@sentry/node";
import getEnvironment from "src/utils/getEnvironment";
import { Integration, SamplingContext } from "@sentry/types";
import Environment from "formfn-shared/dist/types/Environment";
import AnalyticsEventSource from "src/types/enums/AnalyticsEventSource";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import targetIncludesAny from "formfn-shared/dist/utils/array/targetIncludesAny";
import * as Tracing from "@sentry/tracing";
import getPrisma from "src/utils/prisma/getPrisma";

function getTracesSampleRate() {
  const env = getEnvironment();
  switch (env) {
    case Environment.Local:
      return 0;
    case Environment.Testnet:
    case Environment.Development:
      return 0.01;
    case Environment.Production:
      return 0.05;
    default:
      return assertUnreachable(env);
  }
}

export default function initSentry(
  eventSource: AnalyticsEventSource,
  integrations?: Array<Integration>
) {
  Sentry.init({
    attachStacktrace: true,
    dsn: process.env.SENTRY_DSN,
    environment: getEnvironment(),
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Prisma({ client: getPrisma() }),
      new Tracing.Integrations.GraphQL(),
      new Tracing.Integrations.Apollo(),
      ...(integrations ?? []),
    ],
    normalizeDepth: 6,
    serverName: eventSource,

    tracesSampler: (samplingContext: SamplingContext) => {
      if (getEnvironment() !== Environment.Production) {
        return getTracesSampleRate();
      }

      // Always inherit, see https://docs.sentry.io/platforms/javascript/configuration/sampling/#inheritance
      // for more info
      if (samplingContext.parentSampled !== undefined) {
        return samplingContext.parentSampled;
      }

      const transactionName = samplingContext.transactionContext.name;

      if (
        targetIncludesAny(transactionName, [
          "ExploreArtworkGridQuery",
          "ExploreArtworkGridPaginationQuery",
        ])
      ) {
        // These queries have historically been some of the slowest, so we want more data
        // on them
        return 0.2;
      }

      if (targetIncludesAny(transactionName, ["Mutation", "Query"])) {
        // We want to sample GraphQL queries and mutations more heavily
        return 0.1;
      }

      if (
        targetIncludesAny(transactionName, [
          "/intern/",
          "/hasura/",
          "logEventToLoki",
        ])
      ) {
        // These are less important
        return 0.001;
      }

      // Default sample rate
      return 0.05;
    },
  });

  Sentry.setTag("eventSource", eventSource);
}
