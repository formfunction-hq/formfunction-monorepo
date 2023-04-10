import { NextFunction, Request, Response } from "express";
import getCampaignForCampaignForSlugInput from "src/utils/campaigns/getCampaignForCampaignForSlugInput";
import getImgixUrl from "src/utils/getImgixUrl";
import getCampaignsConfig from "src/utils/launch-darkly/getCampaignsConfig";
import getPrisma from "src/utils/prisma/getPrisma";

/**
 * Used by Cloudflare functions to generate link previews.
 */
export default async function fetchUserCampaign(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const prisma = getPrisma();
  const { username, campaignSlug } = req.params;

  const [campaignsConfig, campaignV2, user] = await Promise.all([
    getCampaignsConfig(),
    getCampaignForCampaignForSlugInput(
      { campaignSlug, creatorUsername: username },
      null
    ),
    prisma.user.findUnique({
      where: {
        username,
      },
    }),
  ]);

  const campaignConfig = campaignsConfig.campaignsBySlug[campaignSlug];

  if (user == null) {
    res.sendStatus(404);
    return;
  }

  if (campaignConfig != null && user.id === campaignConfig.creatorId) {
    res.json({
      description: campaignConfig.description,
      image: campaignConfig.heroAssets[0].downloadUrl,
      name: campaignConfig.title,
    });
    return;
  }

  const campaign = campaignV2?.campaign;
  if (campaign != null && user.id === campaign.creatorId) {
    res.json({
      description: campaign.tagline,
      image: getImgixUrl(campaign.PreviewAsset.path),
      name: campaign.title,
    });
    return;
  }

  res.sendStatus(404);
}
