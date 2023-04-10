import { Maybe } from "types/UtilityTypes";

export default function isUserCampaignCommunityOmniViewer(
  userId: Maybe<string>,
  campaignCreatorId: string,
  userIsTeamMember: boolean
) {
  const userIsCreator = userId === campaignCreatorId;

  return userIsCreator || userIsTeamMember;
}
