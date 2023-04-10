import { CampaignV2 } from "src/__generated__/generated";

export default function assertCampaignHasFundingTier(campaign: CampaignV2) {
  if (campaign.fundingTiers == null || campaign.fundingTiers.length === 0) {
    throw new Error("Campaign must have at least one funding tier.");
  }
}
