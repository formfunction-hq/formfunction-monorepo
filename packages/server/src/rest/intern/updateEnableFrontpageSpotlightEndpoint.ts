import { NextFunction, Request, Response } from "express";
import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";
import getLdFlag from "src/utils/launch-darkly/getLdFlag";
import getPrisma from "src/utils/prisma/getPrisma";
import dayjs from "formfn-shared/dist/utils/dates/dayjsex";
import axios from "axios";
import getEnvironment from "src/utils/getEnvironment";
import Environment from "formfn-shared/dist/types/Environment";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";

function getLdEnvironmentKey() {
  const environment = getEnvironment();
  switch (environment) {
    case Environment.Development:
      return "test";
    case Environment.Local:
      return "local";
    case Environment.Production:
      return "production";
    case Environment.Testnet:
      return "testnet";
    default:
      return assertUnreachable(environment);
  }
}

async function toggleFlag(kind: "turnFlagOn" | "turnFlagOff") {
  await axios.patch(
    "https://app.launchdarkly.com/api/v2/flags/default/enableFrontpageSpotlight",
    {
      environmentKey: getLdEnvironmentKey(),
      instructions: [{ kind }],
    },
    {
      headers: {
        Authorization: process.env.LD_ACCESS_TOKEN as string,
        "Content-Type":
          "application/json; domain-model=launchdarkly.semanticpatch",
      },
    }
  );
}

/**
 * We use this endpoint to periodically toggle the enableFrontpageSpotlight flag.
 *
 * We do this to improve the loading UX of the landing page. Otherwise, we would need
 * to perform an API query to determine whether or not we should render the landing spotlight section.
 *
 * If we show a skeleton while that API query is loading, and there is no active spotlight, then
 * there would be a layout shift.
 *
 * There would also be a layout shift if we don't render any suspense, but there is an
 * active spotlight.
 *
 * This lets us avoid the layout shift, because the flag gets sent down in the initial HTML.
 */
export default async function updateEnableFrontpageSpotlightEndpoint(
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const prisma = getPrisma();
  const currentTime = dayjs();
  const [featuredSpotlightConfig, activeSpotlight] = await Promise.all([
    getLdFlag(LaunchDarklyFlag.FeaturedSpotlightConfig, []),
    prisma.spotlight.findFirst({
      where: {
        endTime: { gt: currentTime.toDate() },
        startTime: { lte: currentTime.toDate() },
      },
    }),
  ]);

  if (featuredSpotlightConfig.length === 0 && activeSpotlight == null) {
    await toggleFlag("turnFlagOff");
    res.json({ result: "turnFlagOff" });
  } else {
    await toggleFlag("turnFlagOn");
    res.json({ result: "turnFlagOn" });
  }
}
