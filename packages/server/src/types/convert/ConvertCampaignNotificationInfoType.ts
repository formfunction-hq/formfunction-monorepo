import { Asset, Campaign } from "@prisma/client";
import ConvertUserType from "src/types/convert/ConvertUserType";

type ConvertCampaignNotificationInfoType = Campaign & {
  Creator: ConvertUserType;
  PreviewAsset: Asset;
};

export default ConvertCampaignNotificationInfoType;
