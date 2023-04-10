import { CampaignBenefit, CampaignFundingTier } from "@prisma/client";

type ConvertCampaignFundingTierType = CampaignFundingTier & {
  CampaignBenefit: Array<CampaignBenefit>;
};

export default ConvertCampaignFundingTierType;
