import graphql from "babel-plugin-relay/macro";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import getCampaignLinkRelative from "formfn-shared/dist/utils/links/getCampaignLinkRelative";
import { useCampaignLinkForCampaignV2_CampaignV2$key } from "hooks/campaign/__generated__/useCampaignLinkForCampaignV2_CampaignV2.graphql";
import { useFragment } from "react-relay";

const fragment = graphql`
  fragment useCampaignLinkForCampaignV2_CampaignV2 on CampaignV2 {
    creator {
      username
    }
    slug
    status
  }
`;

export default function useCampaignLinkForCampaignV2(
  campaign: Maybe<useCampaignLinkForCampaignV2_CampaignV2$key>,
  checkStatus = false
) {
  const campaignData = useFragment(fragment, campaign);
  if (campaignData == null) {
    return null;
  }

  const link = getCampaignLinkRelative(
    campaignData.creator.username,
    campaignData.slug
  );
  if (!checkStatus) {
    return link;
  }

  switch (campaignData.status) {
    case "Concluded":
    case "Published":
      return link;
    case "Approved":
    case "Draft":
    case "Pending":
    case "Rejected":
    case RELAY_FUTURE_ADDED_VALUE:
      return null;
    default:
      return assertUnreachable(campaignData.status);
  }
}
