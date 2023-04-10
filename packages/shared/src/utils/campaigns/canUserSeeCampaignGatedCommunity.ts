import { Maybe } from "types/UtilityTypes";
import isUserCampaignCommunityOmniViewer from "utils/campaigns/isUserCampaignCommunityOmniViewer";

export default function canUserSeeCampaignGatedCommunity(
  userId: Maybe<string>,
  campaignCreatorId: string,
  userIsTeamMember: boolean,
  userIsHolder: boolean
) {
  return (
    isUserCampaignCommunityOmniViewer(
      userId,
      campaignCreatorId,
      userIsTeamMember
    ) || userIsHolder
  );
}
