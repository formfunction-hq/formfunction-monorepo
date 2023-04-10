import graphql from "babel-plugin-relay/macro";
import TabButton from "components/buttons/TabButton";
import { CampaignCommunityTabButton_CampaignsNamespaceQueryResponse$key } from "components/pages/campaign/campaign-generic/__generated__/CampaignCommunityTabButton_CampaignsNamespaceQueryResponse.graphql";
import { campaignQuery } from "hooks/campaign-page/v2/useCampaignPageCampaignV2";
import { useCampaignPageCampaignV2Query } from "hooks/campaign-page/v2/__generated__/useCampaignPageCampaignV2Query.graphql";
import useCampaignColorScheme from "hooks/useCampaignColorScheme";
import useUserContext from "hooks/useUserContext";
import { Suspense } from "react";
import { PreloadedQuery, useFragment, usePreloadedQuery } from "react-relay";
import CampaignTab from "formfn-shared/dist/types/enums/CampaignTab";
import HUMAN_READABLE_CAMPAIGN_TAB from "constants/HumanReadableCampaignTab";
import useCanViewerViewCommunityTab from "hooks/campaign/useCanViewerViewCommunityTab";
import CampaignTabType from "types/CampaignTabType";

const fragment = graphql`
  fragment CampaignCommunityTabButton_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {
    campaignV2ForSlug(input: $input) {
      campaign {
        ...useCanViewerViewCommunityTab_CampaignV2
      }
    }
  }
`;

function Content({
  campaign,
  campaignTab,
  setCampaignTab,
}: {
  campaign: CampaignCommunityTabButton_CampaignsNamespaceQueryResponse$key;
  campaignTab: CampaignTabType;
  setCampaignTab: (tab: CampaignTab) => void;
}) {
  const campaignData = useFragment(fragment, campaign);
  const colorScheme = useCampaignColorScheme();
  const { user } = useUserContext();
  const canViewCommunityTab = useCanViewerViewCommunityTab(
    campaignData.campaignV2ForSlug.campaign
  );
  if (user === undefined) {
    // To prevent flashing if wallet is not loaded yet
    return null;
  }
  if (canViewCommunityTab) {
    return (
      <TabButton
        activeColorClass={colorScheme.foreground.colorClass}
        isActive={campaignTab === CampaignTab.Community}
        name={HUMAN_READABLE_CAMPAIGN_TAB[CampaignTab.Community]}
        onClick={() => setCampaignTab(CampaignTab.Community)}
      />
    );
  }

  return (
    <TabButton
      activeColorClass={colorScheme.foreground.colorClass}
      isActive={campaignTab === CampaignTab.PublicUpdates}
      name={HUMAN_READABLE_CAMPAIGN_TAB[CampaignTab.PublicUpdates]}
      onClick={() => setCampaignTab(CampaignTab.PublicUpdates)}
    />
  );
}

type Props = {
  campaignQueryRef: PreloadedQuery<useCampaignPageCampaignV2Query>;
  campaignTab: CampaignTabType;
  setCampaignTab: (tab: CampaignTab) => void;
};

function DataLoader({ campaignQueryRef, campaignTab, setCampaignTab }: Props) {
  const campaignData = usePreloadedQuery<useCampaignPageCampaignV2Query>(
    campaignQuery,
    campaignQueryRef
  );

  return (
    <Content
      campaign={campaignData.CampaignsNamespace}
      campaignTab={campaignTab}
      setCampaignTab={setCampaignTab}
    />
  );
}

export default function CampaignCommunityTabButton({
  campaignQueryRef,
  campaignTab,
  setCampaignTab,
}: Props) {
  return (
    <Suspense fallback={null}>
      <DataLoader
        campaignQueryRef={campaignQueryRef}
        campaignTab={campaignTab}
        setCampaignTab={setCampaignTab}
      />
    </Suspense>
  );
}
