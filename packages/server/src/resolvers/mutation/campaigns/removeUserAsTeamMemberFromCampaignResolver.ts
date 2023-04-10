import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import {
  RemoveUserAsTeamMemberFromCampaignInput,
  RemoveUserAsTeamMemberFromCampaignResponse,
  RequestStatusExpress_Enum,
} from "src/__generated__/generated";
import getPrisma from "src/utils/prisma/getPrisma";
import CONVERT_CAMPAIGN_INCLUDE from "src/constants/include/ConvertCampaignInclude";
import convertCampaign from "src/utils/convert/convertCampaign";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import invariant from "tiny-invariant";
import { Campaign, CampaignToTeamMember } from "@prisma/client";

function assertCanViewerRemoveUserAsTeamMember(
  campaign: Campaign & { CampaignToTeamMember: Array<CampaignToTeamMember> },
  viewerId: string,
  userIdToRemove: string
) {
  // Validation
  const isViewerMember = campaign.CampaignToTeamMember.map(
    ({ memberId }) => memberId
  ).includes(viewerId);
  const isViewerCreator = viewerId === campaign.creatorId;
  const isRemovingSelf = viewerId === userIdToRemove;

  if (isViewerCreator) {
    if (isRemovingSelf) {
      throw new Error(
        "You cannot remove yourself as a creator from this campaign"
      );
    }
  } else if (isViewerMember) {
    if (!isRemovingSelf) {
      throw new Error(
        "You may not remove other team members from this campaign"
      );
    }
  } else {
    // Neither creator nor member
    throw new Error(
      "You do not have permissions to remove team members from this campaign"
    );
  }
}

export default async function removeUserAsTeamMemberFromCampaignResolver(
  context: MyContext,
  input: RemoveUserAsTeamMemberFromCampaignInput
): Promise<RemoveUserAsTeamMemberFromCampaignResponse> {
  const prisma = getPrisma();
  const verifiedPublicKey = assertUserSignedRequest(context);
  const viewerId = verifiedPublicKey.toString();
  const campaign = await prisma.campaign.findUnique({
    include: { CampaignToTeamMember: true },
    where: { id: input.campaignId },
  });
  invariant(campaign != null, "Campaign cannot be null");

  // Validation
  assertCanViewerRemoveUserAsTeamMember(campaign, viewerId, input.userId);

  const { requestId } = campaign.CampaignToTeamMember.find(
    (val) => val.memberId === input.userId
  )!;

  await prisma.request.update({
    data: {
      status: RequestStatusExpress_Enum.Rejected,
    },
    where: { id: requestId },
  });
  const updatedCampaign = await prisma.campaign.findUnique({
    include: CONVERT_CAMPAIGN_INCLUDE,
    where: { id: input.campaignId },
  });

  return {
    __typename: Typename.RemoveUserAsTeamMemberFromCampaignResponse,
    campaign: await convertCampaign(updatedCampaign!),
  };
}
