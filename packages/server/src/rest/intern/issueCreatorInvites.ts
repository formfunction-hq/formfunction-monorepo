import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";
import pLimit from "p-limit";
import dayjs from "src/utils/dates/dayjsex";
import getLdFlag from "src/utils/launch-darkly/getLdFlag";
import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";
import { PrismaClient } from "@prisma/client";
import { range } from "formfn-shared/dist/utils/range";
import logEvent from "src/utils/analytics/logEvent";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import { Maybe, Undef } from "formfn-shared/dist/types/UtilityTypes";
import { OpUnitType } from "dayjs";

const limit = pLimit(20);

type CreatorInviteConfig = {
  expiresAfterInDays?: number;
  frequency: string;
  numToIssue: number;
  reason: string;
  userIds: Array<string>;
};

function createInvitesForInviteConfig(
  prisma: PrismaClient,
  inviteConfig: CreatorInviteConfig,
  expirationTime?: Maybe<dayjs.Dayjs>
) {
  return inviteConfig.userIds.map((userId) =>
    limit(async () =>
      prisma.creatorInvite.createMany({
        data: range(inviteConfig.numToIssue).map((_i) => ({
          expirationTime:
            inviteConfig.expiresAfterInDays != null
              ? dayjs().add(inviteConfig.expiresAfterInDays, "days").toDate()
              : expirationTime?.toDate() ?? null,
          issueReason: inviteConfig.reason,
          ownerId: userId,
        })),
      })
    )
  );
}

const FREQUENCY_TO_TIME_UNIT: { [key: string]: Undef<OpUnitType> } = {
  monthly: "month",
  weekly: "week",
};

function getExpirationTimeFromFrequency(
  frequency: Undef<string>
): Maybe<dayjs.Dayjs> {
  const timeUnit = frequency != null ? FREQUENCY_TO_TIME_UNIT[frequency] : null;
  if (timeUnit == null) {
    return null;
  }

  return dayjs().endOf(timeUnit);
}

export default async function issueCreatorInvites(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { frequency } = req.body;
  const configList = await getLdFlag<Array<CreatorInviteConfig>>(
    LaunchDarklyFlag.CreatorInviteConfig,
    []
  );
  const inviteConfigs = configList.filter(
    (invite) => invite.frequency === frequency
  );
  if (inviteConfigs.length === 0) {
    res.json({ configList, inviteConfigs });
    return;
  }

  const prisma = getPrisma();
  const createInvitesResults = await Promise.all(
    inviteConfigs
      .map((inviteConfig) =>
        createInvitesForInviteConfig(
          prisma,
          inviteConfig,
          // By default, expire at the end of specified cadence
          // (e.g., monthly -> expires at end of month)
          // Can override by setting expiresAfterInDays
          getExpirationTimeFromFrequency(frequency)
        )
      )
      .flat()
  );

  logEvent(AnalyticsEvent.CreatorInvitesIssued, req, {
    createInvitesResults,
    inviteConfigs,
  });
  res.json({ createInvitesResults, inviteConfigs, success: true });
}
