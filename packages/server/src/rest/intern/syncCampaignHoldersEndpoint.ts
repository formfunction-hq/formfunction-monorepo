import { NextFunction, Request, Response } from "express";
import syncCampaignHolders from "src/utils/campaigns/syncCampaignHolders";

export default async function syncCampaignHoldersEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { campaignId, dryRun } = req.body;
  const results = await syncCampaignHolders(campaignId, dryRun != null);

  res.json({ results, success: true });
}
