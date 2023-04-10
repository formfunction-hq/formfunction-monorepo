import { NextFunction, Request, Response } from "express";
import syncCampaignHolders from "src/utils/campaigns/syncCampaignHolders";
import getPrisma from "src/utils/prisma/getPrisma";
import pLimit from "p-limit";

const limit = pLimit(10);

export default async function syncAllCampaignHoldersEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { dryRun } = req.body;

  const campaigns = await getPrisma().campaign.findMany();

  const results = await Promise.all(
    campaigns.map((campaign) =>
      limit(() => syncCampaignHolders(campaign.id, dryRun != null))
    )
  );

  res.json({ results, success: true });
}
