import DisconnectedPageContainer from "components/containers/DisconnectedPageContainer";
import PageWithHeaderAndFooter from "components/containers/PageWithHeaderAndFooter";
import graphql from "babel-plugin-relay/macro";
import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { PreloadedQuery, useFragment, usePreloadedQuery } from "react-relay";
import Page404Content from "components/pages/errors/Page404Content";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import CampaignDraftGate from "components/pages/campaign/edit/CampaignDraftGate";
import TextButton from "components/buttons/TextButton";
import useCampaignPageActivityV2 from "hooks/campaign-page/v2/useCampaignPageActivityV2";
import useCampaignPageCampaignV2, {
  campaignQuery,
} from "hooks/campaign-page/v2/useCampaignPageCampaignV2";
import usePostsForCampaign from "hooks/campaign/usePostsForCampaign";
import useCampaignHoldersForSlug from "hooks/campaign/useCampaignHoldersForSlug";
import CampaignPageContent, {
  CampaignPageContentProps,
} from "components/pages/campaign/campaign-v2/CampaignPageContent";
import CampaignPageDraftModeContent from "components/pages/campaign/campaign-v2/CampaignPageDraftModeContent";
import { CampaignPage_CampaignsNamespaceQueryResponse$key } from "components/pages/campaign/campaign-v2/__generated__/CampaignPage_CampaignsNamespaceQueryResponse.graphql";
import { useCampaignPageCampaignV2Query } from "hooks/campaign-page/v2/__generated__/useCampaignPageCampaignV2Query.graphql";
import CampaignPageContentSkeleton from "components/pages/campaign/campaign-v2/CampaignPageContentSkeleton";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import WithFixedBanner from "components/containers/WithFixedBanner";
import CampaignSubmissionReviewActionsBanner from "components/pages/campaign/campaign-v2/CampaignSubmissionReviewActionsBanner";
import useUserContext from "hooks/useUserContext";
import ResponsivePageBody from "components/containers/ResponsivePageBody";
import TextButtonTheme from "types/enums/TextButtonTheme";
import HelpCenterLink from "formfn-shared/dist/types/enums/HelpCenterLink";
import useCampaignPageCampaignV2Goal from "hooks/campaign-page/v2/useCampaignPageCampaignV2Goal";
import useCampaignPageFundingTiers from "hooks/campaign-page/v2/useCampaignPageFundingTiers";
import useCampaignPageCampaignV2Draft from "hooks/campaign-page/v2/useCampaignPageCampaignV2Draft";
import { useCampaignPageCampaignV2DraftQuery } from "hooks/campaign-page/v2/__generated__/useCampaignPageCampaignV2DraftQuery.graphql";
import useCanViewerEditCampaign from "hooks/campaign/useCanViewerEditCampaign";

export const STANDARD_SECTION_HEIGHT = 240;

const fragment = graphql`
  fragment CampaignPage_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {
    campaignV2ForSlug(input: $input) {
      campaign {
        status
        colorScheme

        ...CampaignPageContent_CampaignV2
        ...useCanViewerEditCampaign_CampaignV2
      }
    }
  }
`;

function CampaignContentBasedOnStatus({
  campaignRef,
  campaignActivityQueryRef,
  campaignDraftQueryRef,
  campaignHoldersQueryRef,
  campaignFundingTiersQueryRef,
  campaignGoalQueryRef,
  campaignQueryRef,
  isAdminView,
  isDraftView,
  postsForCampaignQueryRef,
}: {
  campaignDraftQueryRef: PreloadedQuery<useCampaignPageCampaignV2DraftQuery>;
  campaignRef: CampaignPage_CampaignsNamespaceQueryResponse$key;
  isAdminView: boolean;
  isDraftView: boolean;
} & Omit<CampaignPageContentProps, "campaign">) {
  const { user } = useUserContext();
  const campaignData = useFragment(fragment, campaignRef);
  const {
    campaignV2ForSlug: { campaign },
  } = campaignData;
  const viewerCanEdit = useCanViewerEditCampaign(campaign);

  if (campaign == null) {
    return (
      <ResponsivePageBody>
        <Page404Content />
      </ResponsivePageBody>
    );
  }

  const { status } = campaign;

  const draftContent = (
    <DisconnectedPageContainer
      hidePageHeaderAndFooter
      fallback={<CampaignPageContentSkeleton />}
    >
      <CampaignPageDraftModeContent
        campaignDraftQueryRef={campaignDraftQueryRef}
      />
    </DisconnectedPageContainer>
  );

  if (isDraftView && viewerCanEdit) {
    return draftContent;
  }

  switch (status) {
    case "Pending": {
      if (isAdminView) {
        return (
          <DisconnectedPageContainer hidePageHeaderAndFooter>
            <CampaignPageDraftModeContent
              campaignDraftQueryRef={campaignDraftQueryRef}
            />
            ;
          </DisconnectedPageContainer>
        );
      }

      return (
        <DisconnectedPageContainer hidePageHeaderAndFooter>
          <CampaignDraftGate
            subtitle={
              <>
                Currently, all campaigns must be submitted for review to make
                sure they meet campaign guidelines. You&apos;ll receive a
                notification in 1-2 weeks if your campaign is approved.{" "}
                <TextButton
                  buttonThemeOrColorClass={TextButtonTheme.BrightPurple}
                  display="inline"
                  type="link_external"
                  href={HelpCenterLink.CampaignGuidelines}
                >
                  Learn more
                </TextButton>
              </>
            }
            heroUrl="illustrations/thumbs-up.png"
            buttonProps={{
              href: `/@${user?.username}/campaigns`,
              label: "Back to Manage Campaigns",
            }}
            title="You submitted your campaign!"
          />
        </DisconnectedPageContainer>
      );
    }
    case "Rejected": {
      if (isAdminView) {
        return (
          <DisconnectedPageContainer hidePageHeaderAndFooter>
            <CampaignPageDraftModeContent
              campaignDraftQueryRef={campaignDraftQueryRef}
            />
            ;
          </DisconnectedPageContainer>
        );
      }

      return (
        <DisconnectedPageContainer hidePageHeaderAndFooter>
          <CampaignDraftGate
            subtitle={
              <>
                Unfortunately, your campaign was not approved since it did not
                meet our campaign guidelines. You can create a new campaign now,
                or{" "}
                <TextButton
                  buttonThemeOrColorClass={TextButtonTheme.BrightPurple}
                  href={HelpCenterLink.CampaignGuidelines}
                  type="link_external"
                  display="inline"
                >
                  learn more about our guidelines.
                </TextButton>
              </>
            }
            heroUrl="illustrations/stressed-person-using-computer-at-desk.png"
            buttonProps={{
              href: `/@${user?.username}/campaigns`,
              label: "Back to Manage Campaigns",
            }}
            title="Your campaign was not approved"
          />
        </DisconnectedPageContainer>
      );
    }
    case "Approved":
    case "Draft":
      return draftContent;
    case "Published":
    case "Concluded":
      return (
        <CampaignPageContent
          campaign={campaign}
          campaignFundingTiersQueryRef={campaignFundingTiersQueryRef}
          campaignGoalQueryRef={campaignGoalQueryRef}
          campaignActivityQueryRef={campaignActivityQueryRef}
          campaignHoldersQueryRef={campaignHoldersQueryRef}
          campaignQueryRef={campaignQueryRef}
          colorScheme={campaign.colorScheme}
          postsForCampaignQueryRef={postsForCampaignQueryRef}
        />
      );
    case RELAY_FUTURE_ADDED_VALUE:
      return null;
    default:
      return assertUnreachable(status);
  }
}

function DataLoader({
  campaignActivityQueryRef,
  campaignHoldersQueryRef,
  campaignFundingTiersQueryRef,
  campaignGoalQueryRef,
  campaignQueryRef,
  campaignDraftQueryRef,
  postsForCampaignQueryRef,
  isAdminView,
  isDraftView,
}: Omit<CampaignPageContentProps, "campaign"> & {
  campaignDraftQueryRef: PreloadedQuery<useCampaignPageCampaignV2DraftQuery>;
  isAdminView: boolean;
  isDraftView: boolean;
}) {
  const campaignQueryData = usePreloadedQuery<useCampaignPageCampaignV2Query>(
    campaignQuery,
    campaignQueryRef
  );

  const content = (
    <CampaignContentBasedOnStatus
      campaignActivityQueryRef={campaignActivityQueryRef}
      campaignDraftQueryRef={campaignDraftQueryRef}
      campaignFundingTiersQueryRef={campaignFundingTiersQueryRef}
      campaignGoalQueryRef={campaignGoalQueryRef}
      campaignHoldersQueryRef={campaignHoldersQueryRef}
      campaignQueryRef={campaignQueryRef}
      campaignRef={campaignQueryData.CampaignsNamespace}
      isAdminView={isAdminView}
      isDraftView={isDraftView}
      postsForCampaignQueryRef={postsForCampaignQueryRef}
    />
  );

  if (isAdminView) {
    return (
      <WithFixedBanner
        banner={
          <CampaignSubmissionReviewActionsBanner
            campaign={campaignQueryData.CampaignsNamespace}
          />
        }
        bannerPosition="bottom"
        offset={0}
      >
        {content}
      </WithFixedBanner>
    );
  }

  return content;
}

type Props = {
  isAdminView?: boolean;
  isDraftView?: boolean;
};

export default function CampaignPage({ isDraftView, isAdminView }: Props) {
  const params = useParams();
  const { campaignSlug, username } = params;
  const input = {
    campaignSlug: campaignSlug!,
    creatorUsername: username!,
  };

  const { campaignActivityQueryRef } = useCampaignPageActivityV2(input, 0);
  const { campaignQueryRef } = useCampaignPageCampaignV2(input, 0);
  // Load separately from campaignQueryRef b/c drafts require more info, and thus
  // the query takes longer to load.
  const { campaignDraftQueryRef } = useCampaignPageCampaignV2Draft(input, 0);
  const { campaignFundingTiersQueryRef } = useCampaignPageFundingTiers(
    input,
    0
  );
  const { campaignGoalQueryRef } = useCampaignPageCampaignV2Goal(
    input,
    "network-only"
  );
  const postsForCampaignQueryRef = usePostsForCampaign({
    campaignSlug: campaignSlug!,
    creatorUsername: username!,
  });
  const { campaignHoldersQueryRef } = useCampaignHoldersForSlug({
    campaignSlug: campaignSlug!,
    creatorUsername: username!,
  });

  return (
    <PageWithHeaderAndFooter>
      <Suspense fallback={<CampaignPageContentSkeleton />}>
        {campaignActivityQueryRef != null &&
          campaignGoalQueryRef != null &&
          campaignQueryRef != null &&
          campaignHoldersQueryRef != null &&
          postsForCampaignQueryRef != null &&
          campaignFundingTiersQueryRef != null &&
          campaignDraftQueryRef != null && (
            <DataLoader
              campaignActivityQueryRef={campaignActivityQueryRef}
              campaignDraftQueryRef={campaignDraftQueryRef}
              campaignFundingTiersQueryRef={campaignFundingTiersQueryRef}
              campaignGoalQueryRef={campaignGoalQueryRef}
              campaignHoldersQueryRef={campaignHoldersQueryRef}
              campaignQueryRef={campaignQueryRef}
              isAdminView={isAdminView ?? false}
              isDraftView={isDraftView ?? false}
              postsForCampaignQueryRef={postsForCampaignQueryRef}
            />
          )}
      </Suspense>
    </PageWithHeaderAndFooter>
  );
}
