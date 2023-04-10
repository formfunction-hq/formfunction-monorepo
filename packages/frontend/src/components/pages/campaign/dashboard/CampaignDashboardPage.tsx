import graphql from "babel-plugin-relay/macro";
import DisconnectedPageContainer from "components/containers/DisconnectedPageContainer";
import PageWithHeaderAndFooter from "components/containers/PageWithHeaderAndFooter";
import ResponsivePageBody from "components/containers/ResponsivePageBody";
import CampaignDashboardPageContent from "components/pages/campaign/dashboard/CampaignDashboardPageContent";
import CampaignDashboardPageContentContainer from "components/pages/campaign/dashboard/CampaignDashboardPageContentContainer";
import CampaignDashboardSidebar from "components/pages/campaign/dashboard/CampaignDashboardSidebar";
import CampaignDashboardTabGeneric from "components/pages/campaign/dashboard/tabs/CampaignDashboardTabGeneric";
import {
  CampaignDashboardPage_Query,
  CampaignDashboardPage_Query$data,
} from "components/pages/campaign/dashboard/__generated__/CampaignDashboardPage_Query.graphql";
import Page404Content from "components/pages/errors/Page404Content";
import CAMPAIGN_DASHBOARD_AVAILABLE_STATUSES from "constants/CampaignDashboardAvailableStatuses";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import usePostsForCampaign from "hooks/campaign/usePostsForCampaign";
import useUserContext from "hooks/useUserContext";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import { useLazyLoadQuery } from "react-relay";
import { useParams } from "react-router-dom";
import CampaignDashboardTab from "types/enums/CampaignDashboardTab";

function Content({
  campaignData,
}: {
  campaignData: CampaignDashboardPage_Query$data["CampaignsNamespace"]["campaignV2ForSlug"]["campaign"];
}) {
  const params = useParams();
  const { campaignSlug, username: creatorUsername } = params;
  // We intentionally kick off these queries AFTER verifying that
  // the logged in user is the owner of the campaign for tighter
  // data security
  const postsForCampaignQueryRef = usePostsForCampaign({
    campaignSlug: campaignSlug!,
    creatorUsername,
  });

  return (
    <CampaignDashboardPageContent
      campaign={campaignData!}
      postsForCampaignQueryRef={postsForCampaignQueryRef ?? null}
    />
  );
}

const query = graphql`
  query CampaignDashboardPage_Query($input: CampaignV2ForSlugInput!) {
    CampaignsNamespace {
      campaignV2ForSlug(input: $input) {
        campaign {
          id
          status
          creator {
            id
          }
          teamMembers {
            member {
              id
            }
          }

          ...CampaignDashboardPageContent_CampaignV2
        }
      }
    }
  }
`;

function DataLoader() {
  const params = useParams();
  const { campaignSlug, username } = params;
  const { user } = useUserContext();
  const data = useLazyLoadQuery<CampaignDashboardPage_Query>(query, {
    input: {
      campaignSlug: campaignSlug!,
      creatorUsername: username ?? "",
    },
  });

  const { campaign } = data.CampaignsNamespace.campaignV2ForSlug;
  const authorizedIds = filterNulls([
    campaign?.creator.id,
    ...(campaign?.teamMembers ?? []).map(({ member }) => member.id),
  ]);
  if (
    campaign == null ||
    !authorizedIds.includes(user!.id) ||
    !CAMPAIGN_DASHBOARD_AVAILABLE_STATUSES.includes(campaign.status)
  ) {
    return (
      <ResponsivePageBody>
        <Page404Content />
      </ResponsivePageBody>
    );
  }

  return <Content campaignData={campaign} />;
}

export default function CampaignDashboardPage(): JSX.Element {
  const fallback = (
    <CampaignDashboardPageContentContainer>
      <CampaignDashboardSidebar
        campaign={null}
        setTab={emptyFunction}
        tab={CampaignDashboardTab.Updates}
      />
      <CampaignDashboardTabGeneric
        campaignTitle={<Skeleton width={200} />}
        content={<div />}
        subtitle={<Skeleton width={200} />}
        title={<Skeleton width={300} />}
      />
    </CampaignDashboardPageContentContainer>
  );

  return (
    <DisconnectedPageContainer
      fallback={<PageWithHeaderAndFooter>{fallback}</PageWithHeaderAndFooter>}
    >
      <PageWithHeaderAndFooter>
        <Suspense fallback={fallback}>
          <DataLoader />
        </Suspense>
      </PageWithHeaderAndFooter>
    </DisconnectedPageContainer>
  );
}
