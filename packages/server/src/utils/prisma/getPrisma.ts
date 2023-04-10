import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { PrismaClient } from "@prisma/client";
import dayjs from "src/utils/dates/dayjsex";
import logEvent from "src/utils/analytics/logEvent";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";
import getLdFlag from "src/utils/launch-darkly/getLdFlag";

let prisma: Maybe<PrismaClient> = null;

// const LOG_CONFIG: (Prisma.LogLevel | Prisma.LogDefinition)[] = [
//   "query",
//   "info",
//   "warn",
//   "error",
// ];
// const LOG_CONFIG: (Prisma.LogLevel | Prisma.LogDefinition)[] = [];

/**
 * Prisma client is used as a singleton. The first call to getPrisma decides
 * the database URL. This is mainly used in tests to use the URl of some test database.
 *
 * @param databaseUrl the URL of the database Prisma connects to.
 */
export default function getPrisma(databaseUrl?: string) {
  if (prisma) {
    return prisma;
  }

  if (databaseUrl != null) {
    prisma = new PrismaClient({
      datasources: { db: { url: databaseUrl } },
      log: [],
    });
  } else {
    prisma = new PrismaClient({ log: [] });
  }

  // // @ts-ignore
  // prisma.$on("query", (e) => {
  //   // @ts-ignore
  //   console.log(`Query: ${e.query}`);
  //   // @ts-ignore
  //   console.log(`Duration: ${e.duration}ms`);
  // });

  // See https://www.prisma.io/docs/concepts/components/prisma-client/middleware/logging-middleware
  prisma.$use(async (params, next) => {
    const before = dayjs();
    const result = await next(params);
    const after = dayjs();
    const duration = after.diff(before, "millisecond", true);

    if (duration > 200) {
      logEvent(AnalyticsEvent.PrismaPerf, null, {
        durationMs: duration,
        params,
      });

      const threshold = await getLdFlag(
        LaunchDarklyFlag.PrismaPerfErrorThreshold,
        1000
      );

      if (duration > threshold) {
        logError(
          AnalyticsEvent.PrismaPerf,
          `Query ${params.model}.${params.action} took ${duration}ms`
        );
      }
    }

    return result;
  });

  return prisma;
}
