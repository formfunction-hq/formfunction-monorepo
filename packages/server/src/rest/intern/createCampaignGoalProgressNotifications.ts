import { NextFunction, Request, Response } from "express";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { Notification } from "@prisma/client";
import CONVERT_CAMPAIGN_INCLUDE from "src/constants/include/ConvertCampaignInclude";
import ConvertCampaignType from "src/types/convert/ConvertCampaignType";
import getCampaignGoalForCampaign from "src/utils/campaigns/getCampaignGoalForCampaign";
import createCampaignGoalReachedXPercentNotification from "src/utils/notifications/create/createCampaignGoalReachedXPercentNotification";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  CampaignStatusExpress_Enum,
  NotificationTypeExpress_Enum,
} from "src/__generated__/generated";
import pLimit from "p-limit";
import jsonStringify from "formfn-shared/dist/utils/jsonStringify";

const limit = pLimit(5);

// Keep sorted in descending order
const THRESHOLDS = [100, 50].sort((a, b) => b - a);

async function maybeCreateGoalMetNotificationForPercent(
  percentAsNumber: number,
  campaign: ConvertCampaignType
): Promise<Maybe<Notification>> {
  const sentNotification = await getPrisma().notification.findFirst({
    where: {
      NotificationType: {
        value: NotificationTypeExpress_Enum.CampaignGoalReachedXPercent,
      },
      Receiver: { id: campaign.creatorId },
      data: { equals: { campaignId: campaign.id, percentAsNumber } },
    },
  });
  if (sentNotification != null) {
    return null;
  }

  return createCampaignGoalReachedXPercentNotification(
    {
      campaignId: campaign.id,
      percentAsNumber,
    },
    campaign.creatorId
  );
}

async function maybeCreateGoalMetNotificationForCampaign(
  campaign: ConvertCampaignType
): Promise<Maybe<Notification>> {
  const goal = await getCampaignGoalForCampaign(campaign);
  const goalPercentage = goal.currentAmount / Number(campaign.goalAmount);
  const largestThreshold = THRESHOLDS.find(
    (threshold) => goalPercentage >= threshold
  );
  if (largestThreshold == null) {
    return null;
  }
  return maybeCreateGoalMetNotificationForPercent(largestThreshold, campaign);
}

export default async function createCampaignGoalProgressNotifications(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const prisma = getPrisma();
  const campaigns = await prisma.campaign.findMany({
    include: CONVERT_CAMPAIGN_INCLUDE,
    where: { status: CampaignStatusExpress_Enum.Published },
  });

  const results = await Promise.all(
    campaigns.map((campaign) =>
      limit(async () => ({
        campaignId: campaign.id,
        notification: await maybeCreateGoalMetNotificationForCampaign(campaign),
      }))
    )
  );

  res.json({ results: jsonStringify(results), success: true });
}
