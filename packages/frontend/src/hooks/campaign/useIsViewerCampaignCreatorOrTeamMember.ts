import graphql from "babel-plugin-relay/macro";
import { useIsViewerCampaignCreatorOrTeamMember_CampaignV2$key } from "hooks/campaign/__generated__/useIsViewerCampaignCreatorOrTeamMember_CampaignV2.graphql";
import useViewerId from "hooks/useViewerId";
import { useFragment } from "react-relay";

const fragment = graphql`
  fragment useIsViewerCampaignCreatorOrTeamMember_CampaignV2 on CampaignV2 {
    creator {
      id
    }
    teamMembers {
      member {
        id
      }
    }
  }
`;

export default function useIsViewerCampaignCreatorOrTeamMember(
  campaign: useIsViewerCampaignCreatorOrTeamMember_CampaignV2$key
) {
  const {
    creator: { id: creatorId },
    teamMembers,
  } = useFragment(fragment, campaign);
  const viewerId = useViewerId();

  return (
    viewerId != null &&
    (creatorId === viewerId ||
      (teamMembers != null &&
        teamMembers.some(({ member: { id } }) => id === viewerId)))
  );
}
