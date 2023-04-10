import { Prisma } from "@prisma/client";

const CONVERT_CAMPAIGN_FUNDING_TIER_INCLUDE = {
  CampaignBenefit: true,
  // eslint-disable-next-line prettier/prettier
} satisfies Prisma.CampaignFundingTierInclude;

export default CONVERT_CAMPAIGN_FUNDING_TIER_INCLUDE;
