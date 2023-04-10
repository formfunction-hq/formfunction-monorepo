import graphql from "babel-plugin-relay/macro";
import CampaignDashboardHoldersTab from "components/pages/campaign/dashboard/tabs/CampaignDashboardHoldersTab";
import CampaignDashboardCommunityUpdatesTab from "components/pages/campaign/dashboard/tabs/CampaignDashboardCommunityUpdatesTab";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { usePostsForCampaignQuery } from "hooks/campaign/__generated__/usePostsForCampaignQuery.graphql";
import { useState } from "react";
import { PreloadedQuery, useFragment } from "react-relay";
import CampaignDashboardTab from "types/enums/CampaignDashboardTab";
import {
  CampaignDashboardPageContent_CampaignV2$data,
  CampaignDashboardPageContent_CampaignV2$key,
} from "components/pages/campaign/dashboard/__generated__/CampaignDashboardPageContent_CampaignV2.graphql";
import CampaignDashboardSettingsTab from "components/pages/campaign/dashboard/tabs/CampaignDashboardSettingsTab";
import CampaignDashboardSidebar from "components/pages/campaign/dashboard/CampaignDashboardSidebar";
import CampaignDashboardPageContentContainer from "components/pages/campaign/dashboard/CampaignDashboardPageContentContainer";

const fragment = graphql`
  fragment CampaignDashboardPageContent_CampaignV2 on CampaignV2 {
    ...CampaignDashboardSidebar_CampaignV2
    ...CampaignDashboardSettingsTab_CampaignV2
    ...CampaignDashboardHoldersTab_CampaignV2
    ...CampaignDashboardCommunityUpdatesTab_CampaignV2
  }
`;

function TabContent({
  campaignData,
  postsForCampaignQueryRef,
  tab,
}: {
  campaignData: CampaignDashboardPageContent_CampaignV2$data;
  postsForCampaignQueryRef: Maybe<PreloadedQuery<usePostsForCampaignQuery>>;
  tab: CampaignDashboardTab;
}) {
  switch (tab) {
    case CampaignDashboardTab.SupporterList:
      return <CampaignDashboardHoldersTab campaign={campaignData} />;
    case CampaignDashboardTab.Updates:
      return (
        <CampaignDashboardCommunityUpdatesTab
          campaign={campaignData}
          postsForCampaignQueryRef={postsForCampaignQueryRef}
        />
      );
    case CampaignDashboardTab.Settings:
      return <CampaignDashboardSettingsTab campaign={campaignData} />;
    default:
      return null;
  }
}

type Props = {
  campaign: CampaignDashboardPageContent_CampaignV2$key;
  postsForCampaignQueryRef: Maybe<PreloadedQuery<usePostsForCampaignQuery>>;
};

export default function CampaignDashboardPageContent({
  campaign,
  postsForCampaignQueryRef,
}: Props): JSX.Element {
  const campaignData = useFragment(fragment, campaign);
  const [tab, setTab] = useState<CampaignDashboardTab>(
    CampaignDashboardTab.Updates
  );

  return (
    <CampaignDashboardPageContentContainer>
      <CampaignDashboardSidebar
        campaign={campaignData}
        tab={tab}
        setTab={setTab}
      />
      <TabContent
        campaignData={campaignData}
        tab={tab}
        postsForCampaignQueryRef={postsForCampaignQueryRef}
      />
    </CampaignDashboardPageContentContainer>
  );
}
