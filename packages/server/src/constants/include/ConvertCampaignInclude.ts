import { Prisma } from "@prisma/client";
import CONVERT_CAMPAIGN_FUNDING_TIER_INCLUDE from "src/constants/include/ConvertCampaignFundingTierInclude";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";

const CONVERT_CAMPAIGN_INCLUDE = {
  CampaignFundingTier: {
    include: CONVERT_CAMPAIGN_FUNDING_TIER_INCLUDE,
  },
  CampaignToTeamMember: {
    include: {
      Member: {
        include: CONVERT_USER_INCLUDE,
      },
      Request: true,
    },
  },
  Creator: {
    include: CONVERT_USER_INCLUDE,
  },
  GalleryAssets: true,
  GoalCurrency: true,
  PreviewAsset: true,
  // eslint-disable-next-line prettier/prettier
} satisfies Prisma.CampaignInclude;

export default CONVERT_CAMPAIGN_INCLUDE;
