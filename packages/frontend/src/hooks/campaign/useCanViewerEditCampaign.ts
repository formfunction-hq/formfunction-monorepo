import graphql from "babel-plugin-relay/macro";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { useCanViewerEditCampaign_CampaignV2$key } from "hooks/campaign/__generated__/useCanViewerEditCampaign_CampaignV2.graphql";
import useViewerId from "hooks/useViewerId";
import { useFragment } from "react-relay";

const fragment = graphql`
  fragment useCanViewerEditCampaign_CampaignV2 on CampaignV2 {
    creator {
      id
    }
  }
`;

export default function useCanViewerEditCampaign(
  campaign: Maybe<useCanViewerEditCampaign_CampaignV2$key>
) {
  const campaignData = useFragment(fragment, campaign);
  const viewerId = useViewerId();
  if (campaignData == null) {
    return false;
  }

  const {
    creator: { id: creatorId },
  } = campaignData;
  return creatorId === viewerId;
}
