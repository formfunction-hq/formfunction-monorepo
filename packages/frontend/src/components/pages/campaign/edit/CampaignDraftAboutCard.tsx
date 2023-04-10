import graphql from "babel-plugin-relay/macro";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { useFragment } from "react-relay";
import {
  CampaignDraftAboutCard_CampaignV2$data,
  CampaignDraftAboutCard_CampaignV2$key,
} from "components/pages/campaign/edit/__generated__/CampaignDraftAboutCard_CampaignV2.graphql";
import CampaignAboutCard from "components/pages/campaign/campaign-generic/about/CampaignAboutCard";

const campaignFragment = graphql`
  fragment CampaignDraftAboutCard_CampaignV2 on CampaignV2 {
    about {
      campaign
      contactInfo
      creator
      risksAndChallenges
      timeline
    }
  }
`;

function isValidString(str: Maybe<string>) {
  return str != null && str.length > 0;
}

function shouldUseAboutCard({
  campaign,
  contactInfo,
  creator,
  risksAndChallenges,
  timeline,
}: CampaignDraftAboutCard_CampaignV2$data["about"]): boolean {
  return (
    isValidString(campaign) ||
    isValidString(contactInfo) ||
    isValidString(creator) ||
    isValidString(risksAndChallenges) ||
    isValidString(timeline)
  );
}

type Props = {
  campaign: CampaignDraftAboutCard_CampaignV2$key;
  editCampaignAboutButton: JSX.Element;
  fallback: JSX.Element;
};

export default function CampaignDraftAboutCard({
  campaign,
  fallback,
  editCampaignAboutButton,
}: Props) {
  const campaignData = useFragment(campaignFragment, campaign);
  const { about } = campaignData;

  return shouldUseAboutCard(about) ? (
    <CampaignAboutCard
      campaign={about.campaign}
      contactInfo={about.contactInfo}
      creator={about.creator}
      editAboutButton={editCampaignAboutButton}
      risksAndChallenges={about.risksAndChallenges}
      timeline={about.timeline}
    />
  ) : (
    fallback
  );
}
