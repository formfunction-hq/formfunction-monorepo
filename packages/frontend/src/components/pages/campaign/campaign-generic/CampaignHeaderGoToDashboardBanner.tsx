import ColorClass from "types/enums/ColorClass";
import TextButton from "components/buttons/TextButton";
import CampaignHeaderBanner from "components/pages/campaign/campaign-generic/CampaignHeaderBanner";
import graphql from "babel-plugin-relay/macro";
import { CampaignHeaderGoToDashboardBanner_CampaignV2$key } from "components/pages/campaign/campaign-generic/__generated__/CampaignHeaderGoToDashboardBanner_CampaignV2.graphql";
import { useFragment } from "react-relay";
import useIsViewerCampaignCreatorOrTeamMember from "hooks/campaign/useIsViewerCampaignCreatorOrTeamMember";
import ChevronLeftIcon from "components/icons/ChevronLeftIcon";
import getCampaignLinkRelative from "formfn-shared/dist/utils/links/getCampaignLinkRelative";
import FontClass from "types/enums/FontClass";
import ColorValue from "types/enums/ColorValue";

const fragment = graphql`
  fragment CampaignHeaderGoToDashboardBanner_CampaignV2 on CampaignV2 {
    slug
    creator {
      username
    }

    ...useIsViewerCampaignCreatorOrTeamMember_CampaignV2
  }
`;

type Props = {
  campaign: CampaignHeaderGoToDashboardBanner_CampaignV2$key;
};

export default function CampaignHeaderGoToDashboardBanner({ campaign }: Props) {
  const campaignData = useFragment(fragment, campaign);
  const {
    slug,
    creator: { username: creatorUsername },
  } = campaignData;
  const shouldShowBanner = useIsViewerCampaignCreatorOrTeamMember(campaignData);
  if (!shouldShowBanner) {
    return null;
  }

  return (
    <CampaignHeaderBanner justifyContent="flex-start">
      <TextButton
        buttonThemeOrColorClass={ColorClass.Primary}
        fontClass={FontClass.Body2Medium}
        icon={<ChevronLeftIcon colorValue={ColorValue.Primary} />}
        href={`${getCampaignLinkRelative(creatorUsername!, slug!)}/dashboard`}
        type="link_internal"
      >
        Go to dashboard
      </TextButton>
    </CampaignHeaderBanner>
  );
}
