import CampaignBottom from "components/pages/campaign/campaign-generic/CampaignBottom";
import CampaignTabs from "components/pages/campaign/campaign-generic/CampaignTabs";
import CampaignTabsContent from "components/pages/campaign/campaign-generic/CampaignTabsContent";
import CampaignTop from "components/pages/campaign/campaign-generic/CampaignTop";
import CampaignFundingTierPreviewsSkeleton from "components/pages/campaign/campaign-generic/funding-tiers/skeletons/CampaignFundingTierPreviewsSkeleton";
import CampaignFundingTierStandardSkeleton from "components/pages/campaign/campaign-generic/funding-tiers/skeletons/CampaignFundingTierStandardSkeleton";
import CampaignActivitySkeleton from "components/pages/campaign/campaign-generic/activity/skeletons/CampaignActivitySkeleton";
import CampaignHeroSkeleton from "components/pages/campaign/campaign-generic/hero/skeletons/CampaignHeroSkeleton";
import CampaignAboutForCampaignsNamespace from "components/pages/campaign/campaign-v2/CampaignAboutForCampaignsNamespace";
import CampaignActivityForCampaignsNamespace from "components/pages/campaign/campaign-v2/activity/CampaignActivityForCampaignsNamespace";
import CampaignHeroForCampaignsNamespace from "components/pages/campaign/campaign-v2/hero/CampaignHeroForCampaignsNamespace";
import CampaignFundingTierPreviewsForCampaignsNamespace from "components/pages/campaign/campaign-v2/funding-tiers/CampaignFundingTierPreviewsForCampaignsNamespace";
import CampaignFundingTiersForCampaignsNamespace from "components/pages/campaign/campaign-v2/funding-tiers/CampaignFundingTiersForCampaignsNamespace";
import useSolanaContext from "hooks/useSolanaContext";
import { Suspense } from "react";
import { useParams } from "react-router-dom";
import CampaignTab from "formfn-shared/dist/types/enums/CampaignTab";
import PopheadzCampaignTab from "types/enums/PopheadzCampaignTab";
import { CampaignV2ContextProvider } from "context/CampaignV2Context";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { useCampaignPageCampaignV2Query } from "hooks/campaign-page/v2/__generated__/useCampaignPageCampaignV2Query.graphql";
import { PreloadedQuery, useFragment } from "react-relay";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import { usePostsForCampaignQuery } from "hooks/campaign/__generated__/usePostsForCampaignQuery.graphql";
import CampaignPosts from "components/pages/campaign/campaign-generic/posts/CampaignPosts";
import { useCampaignHoldersForSlugQuery } from "hooks/campaign/__generated__/useCampaignHoldersForSlugQuery.graphql";
import { useCampaignPageActivityV2Query } from "hooks/campaign-page/v2/__generated__/useCampaignPageActivityV2Query.graphql";
import CampaignColorSchemeExpress_enum from "types/relay/CampaignColorSchemeExpress_enum";
import useCampaignTab from "hooks/campaign/useCampaignTab";
import graphql from "babel-plugin-relay/macro";
import {
  CampaignPageContent_CampaignV2$data,
  CampaignPageContent_CampaignV2$key,
} from "components/pages/campaign/campaign-v2/__generated__/CampaignPageContent_CampaignV2.graphql";
import { useCampaignPageCampaignV2GoalQuery } from "hooks/campaign-page/v2/__generated__/useCampaignPageCampaignV2GoalQuery.graphql";
import CampaignCommunityTabContent from "components/pages/campaign/campaign-v2/CampaignCommunityTabContent";
import CampaignHeaderGoToDashboardBanner from "components/pages/campaign/campaign-generic/CampaignHeaderGoToDashboardBanner";
import { useCampaignPageFundingTiersQuery } from "hooks/campaign-page/v2/__generated__/useCampaignPageFundingTiersQuery.graphql";
import TooniesCampaignTab from "types/enums/TooniesCampaignTab";
import CampaignTabType from "types/CampaignTabType";

const fragment = graphql`
  fragment CampaignPageContent_CampaignV2 on CampaignV2 {
    ...useCampaignTab_CampaignV2
    ...CampaignCommunityTabContent_CampaignV2
    ...CampaignHeaderGoToDashboardBanner_CampaignV2
  }
`;

function CampaignTabContent({
  campaignData,
  campaignFundingTiersQueryRef,
  campaignHoldersQueryRef,
  campaignQueryRef,
  campaignTab,
  postsForCampaignQueryRef,
}: {
  campaignData: CampaignPageContent_CampaignV2$data;
  campaignFundingTiersQueryRef: PreloadedQuery<useCampaignPageFundingTiersQuery>;
  campaignHoldersQueryRef: MaybeUndef<
    PreloadedQuery<useCampaignHoldersForSlugQuery>
  >;
  campaignQueryRef: MaybeUndef<PreloadedQuery<useCampaignPageCampaignV2Query>>;
  campaignTab: CampaignTabType;
  postsForCampaignQueryRef: MaybeUndef<
    PreloadedQuery<usePostsForCampaignQuery>
  >;
}) {
  const { anchorWallet } = useSolanaContext();

  switch (campaignTab) {
    case CampaignTab.About:
      return campaignQueryRef != null ? (
        <Suspense fallback={null}>
          <CampaignAboutForCampaignsNamespace
            campaignQueryRef={campaignQueryRef}
          />
        </Suspense>
      ) : null;
    case CampaignTab.Community:
      return postsForCampaignQueryRef != null &&
        campaignHoldersQueryRef != null ? (
        <CampaignCommunityTabContent
          campaign={campaignData}
          postsForCampaignQueryRef={postsForCampaignQueryRef}
          campaignHoldersQueryRef={campaignHoldersQueryRef}
        />
      ) : null;
    case CampaignTab.Support: {
      return campaignQueryRef != null ? (
        <Suspense fallback={<CampaignFundingTierStandardSkeleton />}>
          {anchorWallet === undefined ? (
            // CampaignSections needs the current user info to be available in order to
            // render accurate information, so while the anchorWallet is still undefined,
            // just show the skeleton
            <CampaignFundingTierStandardSkeleton />
          ) : (
            <CampaignFundingTiersForCampaignsNamespace
              campaignFundingTiersQueryRef={campaignFundingTiersQueryRef}
            />
          )}
        </Suspense>
      ) : null;
    }
    case CampaignTab.PublicUpdates:
      return postsForCampaignQueryRef != null ? (
        <CampaignPosts
          alignItems="center"
          postsForCampaignQueryRef={postsForCampaignQueryRef}
        />
      ) : null;
    case PopheadzCampaignTab.Team:
    case TooniesCampaignTab.TooniesSwap:
      return null;
    default:
      return assertUnreachable(campaignTab);
  }
}

export type CampaignPageContentProps = {
  campaign: CampaignPageContent_CampaignV2$key;
  campaignActivityQueryRef: PreloadedQuery<useCampaignPageActivityV2Query>;
  campaignFundingTiersQueryRef: PreloadedQuery<useCampaignPageFundingTiersQuery>;
  campaignGoalQueryRef: PreloadedQuery<useCampaignPageCampaignV2GoalQuery>;
  campaignHoldersQueryRef: PreloadedQuery<useCampaignHoldersForSlugQuery>;
  campaignQueryRef: PreloadedQuery<useCampaignPageCampaignV2Query>;
  colorScheme?: CampaignColorSchemeExpress_enum;
  postsForCampaignQueryRef: PreloadedQuery<usePostsForCampaignQuery>;
};

export default function CampaignPageContent({
  campaign,
  campaignActivityQueryRef,
  campaignFundingTiersQueryRef,
  campaignGoalQueryRef,
  campaignHoldersQueryRef,
  campaignQueryRef,
  colorScheme,
  postsForCampaignQueryRef,
}: CampaignPageContentProps) {
  const params = useParams();
  const { campaignSlug } = params;
  const campaignData = useFragment(fragment, campaign);

  const [campaignTab, setCampaignTab] = useCampaignTab(campaignData);

  const campaignActivity =
    campaignActivityQueryRef != null ? (
      <Suspense fallback={<CampaignActivitySkeleton />}>
        <CampaignActivityForCampaignsNamespace
          activityQueryRef={campaignActivityQueryRef}
        />
      </Suspense>
    ) : null;

  const campaignHero = (
    <Suspense fallback={<CampaignHeroSkeleton />}>
      {campaignQueryRef != null && (
        <CampaignHeroForCampaignsNamespace
          activity={campaignActivity}
          campaignGoalQueryRef={campaignGoalQueryRef}
          campaignQueryRef={campaignQueryRef}
          setCampaignTab={setCampaignTab}
        />
      )}
    </Suspense>
  );

  const campaignFundingTierPreviews = campaignQueryRef != null &&
    // TODO[@arcticmatt][campaigns]: better solution for hiding this for popheadz
    campaignSlug?.includes("popheadz") === false && (
      <Suspense fallback={<CampaignFundingTierPreviewsSkeleton />}>
        <CampaignFundingTierPreviewsForCampaignsNamespace
          campaignQueryRef={campaignQueryRef}
          campaignFundingTiersQueryRef={campaignFundingTiersQueryRef}
          setCampaignTab={setCampaignTab}
        />
      </Suspense>
    );

  return (
    <CampaignV2ContextProvider defaultColorScheme={colorScheme}>
      <CampaignHeaderGoToDashboardBanner campaign={campaignData} />
      <CampaignTop>
        {campaignHero}
        {campaignFundingTierPreviews}
      </CampaignTop>
      <CampaignBottom>
        <CampaignTabs
          campaignQueryRef={campaignQueryRef ?? null}
          campaignTab={campaignTab}
          setCampaignTab={setCampaignTab}
        />
        <CampaignTabsContent>
          <CampaignTabContent
            campaignData={campaignData}
            campaignFundingTiersQueryRef={campaignFundingTiersQueryRef}
            campaignHoldersQueryRef={campaignHoldersQueryRef}
            campaignTab={campaignTab}
            campaignQueryRef={campaignQueryRef}
            postsForCampaignQueryRef={postsForCampaignQueryRef}
          />
        </CampaignTabsContent>
      </CampaignBottom>
    </CampaignV2ContextProvider>
  );
}
