import graphql from "babel-plugin-relay/macro";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { useCanViewerViewCommunityTab_CampaignV2$key } from "hooks/campaign/__generated__/useCanViewerViewCommunityTab_CampaignV2.graphql";
import useUserContext from "hooks/useUserContext";
import { useFragment } from "react-relay";
import canUserSeeCampaignGatedCommunity from "formfn-shared/dist/utils/campaigns/canUserSeeCampaignGatedCommunity";

const fragment = graphql`
  fragment useCanViewerViewCommunityTab_CampaignV2 on CampaignV2 {
    creator {
      id
    }
    teamMembers {
      member {
        id
      }
    }
    isViewerHolder
  }
`;

export default function useCanViewerViewCommunityTab(
  campaign: Maybe<useCanViewerViewCommunityTab_CampaignV2$key>
): boolean {
  const campaignData = useFragment(fragment, campaign);
  const { user } = useUserContext();
  if (campaignData == null) {
    return false;
  }

  return canUserSeeCampaignGatedCommunity(
    user?.id ?? null,
    campaignData.creator.id,
    campaignData.teamMembers?.find(({ member }) => member.id === user?.id) !=
      null,
    campaignData.isViewerHolder === true
  );
}
