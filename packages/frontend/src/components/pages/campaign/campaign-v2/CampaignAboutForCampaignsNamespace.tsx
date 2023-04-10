import graphql from "babel-plugin-relay/macro";
import { CampaignAboutForCampaignsNamespace_CampaignsNamespaceQueryResponse$key } from "components/pages/campaign/campaign-v2/__generated__/CampaignAboutForCampaignsNamespace_CampaignsNamespaceQueryResponse.graphql";
import Page404Content from "components/pages/errors/Page404Content";
import { campaignQuery } from "hooks/campaign-page/v2/useCampaignPageCampaignV2";
import { useCampaignPageCampaignV2Query } from "hooks/campaign-page/v2/__generated__/useCampaignPageCampaignV2Query.graphql";
import { PreloadedQuery, useFragment, usePreloadedQuery } from "react-relay";
import CampaignAboutCard from "components/pages/campaign/campaign-generic/about/CampaignAboutCard";

const fragment = graphql`
  fragment CampaignAboutForCampaignsNamespace_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {
    campaignV2ForSlug(input: $input) {
      campaign {
        about {
          campaign
          contactInfo
          creator
          risksAndChallenges
          timeline
        }
      }
    }
  }
`;

type InnerProps = {
  campaignsNamespace: CampaignAboutForCampaignsNamespace_CampaignsNamespaceQueryResponse$key;
};

function Inner({ campaignsNamespace }: InnerProps) {
  const campaignsNamespaceData = useFragment(fragment, campaignsNamespace);
  const { campaign } = campaignsNamespaceData.campaignV2ForSlug;

  if (campaign == null) {
    return <Page404Content message="Campaign not found" />;
  }

  const { about } = campaign;

  return (
    <CampaignAboutCard
      campaign={about.campaign}
      contactInfo={about.contactInfo}
      creator={about.creator}
      risksAndChallenges={about.risksAndChallenges}
      timeline={about.timeline}
    />
  );
}

type Props = {
  campaignQueryRef: PreloadedQuery<useCampaignPageCampaignV2Query>;
};

export default function CampaignAboutForCampaignsNamespace({
  campaignQueryRef,
}: Props) {
  const data = usePreloadedQuery<useCampaignPageCampaignV2Query>(
    campaignQuery,
    campaignQueryRef
  );

  return <Inner campaignsNamespace={data.CampaignsNamespace} />;
}
