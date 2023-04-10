import { Prisma } from "@prisma/client";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";

const CONVERT_CAMPAIGN_NOTIFICATION_INFO_INCLUDE = {
  Creator: {
    include: CONVERT_USER_INCLUDE,
  },
  PreviewAsset: true,
  // eslint-disable-next-line prettier/prettier
} satisfies Prisma.CampaignInclude;

export default CONVERT_CAMPAIGN_NOTIFICATION_INFO_INCLUDE;
