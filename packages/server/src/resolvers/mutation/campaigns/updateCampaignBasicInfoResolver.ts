import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import {
  CampaignStatusExpress_Enum,
  UpdateCampaignBasicInfoInput,
  UpdateCampaignBasicInfoResponse,
} from "src/__generated__/generated";
import getPrisma from "src/utils/prisma/getPrisma";
import CONVERT_CAMPAIGN_INCLUDE from "src/constants/include/ConvertCampaignInclude";
import convertCampaign from "src/utils/convert/convertCampaign";
import getCampaignBasicInfoCreateOrUpdateData from "src/utils/campaigns/getCampaignBasicInfoCreateOrUpdateData";
import assertCanUpdateCampaign from "src/utils/campaigns/assertCanUpdateCampaign";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import updateCampaignTeamMembers from "src/utils/campaigns/updateCampaignTeamMembers";
import CampaignAction from "src/types/enums/CampaignAction";

export default async function updateCampaignBasicInfoResolver(
  context: MyContext,
  input: UpdateCampaignBasicInfoInput
): Promise<UpdateCampaignBasicInfoResponse> {
  const prisma = getPrisma();
  const verifiedPublicKey = assertUserSignedRequest(context);
  const campaignBeforeUpdate = await assertCanUpdateCampaign(
    verifiedPublicKey,
    {
      id: input.campaignId,
    },
    CampaignAction.EditBasicInfo
  );
  const existingPreviewAssetId =
    input.previewAsset != null ? null : campaignBeforeUpdate.PreviewAsset.id;

  await updateCampaignTeamMembers(campaignBeforeUpdate, input.teamMembers);

  const campaign = await prisma.campaign.update({
    data: getCampaignBasicInfoCreateOrUpdateData(
      input,
      existingPreviewAssetId,
      verifiedPublicKey.toString(),
      campaignBeforeUpdate!.status as CampaignStatusExpress_Enum
    ),
    include: CONVERT_CAMPAIGN_INCLUDE,
    where: {
      id: input.campaignId,
    },
  });

  return {
    __typename: Typename.UpdateCampaignBasicInfoResponse,
    campaign: await convertCampaign(campaign),
  };
}
