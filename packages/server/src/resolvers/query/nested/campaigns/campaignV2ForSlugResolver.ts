import {
  CampaignStatusExpress_Enum,
  CampaignV2ForSlugInput,
  CampaignV2ForSlugResponse,
} from "src/__generated__/generated";
import Typename from "src/types/enums/Typename";
import convertCampaign from "src/utils/convert/convertCampaign";
import MyContext from "src/types/MyContext";
import getCampaignForCampaignForSlugInput from "src/utils/campaigns/getCampaignForCampaignForSlugInput";
import isCampaignVisible from "src/utils/campaigns/permissions/isCampaignVisible";

export default async function campaignV2ForSlugResolver(
  context: MyContext,
  input: CampaignV2ForSlugInput
): Promise<CampaignV2ForSlugResponse> {
  const { verifiedPublicKey } = context;
  const { campaign, isViewerHolder } = await getCampaignForCampaignForSlugInput(
    input,
    verifiedPublicKey?.toString()
  );

  if (
    campaign == null ||
    !(await isCampaignVisible(
      campaign.creatorId,
      campaign.status as CampaignStatusExpress_Enum,
      verifiedPublicKey?.toString()
    ))
  ) {
    return {
      __typename: Typename.CampaignV2ForSlugResponse,
      campaign: null,
    };
  }

  return {
    __typename: Typename.CampaignV2ForSlugResponse,
    campaign: await convertCampaign(campaign, isViewerHolder),
  };
}
