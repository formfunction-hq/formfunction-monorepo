import Typename from "src/types/enums/Typename";
import { ActivityNotificationCampaignInfo } from "src/__generated__/generated";
import convertAsset from "src/utils/convert/convertAsset";
import convertUser from "src/utils/convert/convertUser";
import ConvertCampaignNotificationInfoType from "src/types/convert/ConvertCampaignNotificationInfoType";

export default function convertCampaignNotificationInfo(
  campaign: ConvertCampaignNotificationInfoType
): ActivityNotificationCampaignInfo {
  const { Creator, PreviewAsset, slug, title } = campaign;

  return {
    __typename: Typename.ActivityNotificationCampaignInfo,
    creator: convertUser(Creator),
    previewAsset: convertAsset(PreviewAsset),
    slug,
    title,
  };
}
