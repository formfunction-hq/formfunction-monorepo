import graphql from "babel-plugin-relay/macro";
import AssetForAssetExpress from "components/assets/AssetForAssetExpress";
import CampaignHero from "components/pages/campaign/campaign-generic/hero/CampaignHero";
import CampaignHeroAssets from "components/pages/campaign/campaign-generic/hero/CampaignHeroAssets";
import CampaignHeroTop from "components/pages/campaign/campaign-generic/hero/CampaignHeroTop";
import CampaignArtistPillButtons from "components/pages/campaign/campaign-v2/hero/CampaignArtistPillButtons";
import CampaignProgressTowardsGoalForCampaignV2 from "components/pages/campaign/campaign-v2/hero/goals/CampaignProgressTowardsGoalForCampaignV2";
import { CampaignHeroForCampaignsNamespace_CampaignsNamespaceQueryResponse$key } from "components/pages/campaign/campaign-v2/hero/__generated__/CampaignHeroForCampaignsNamespace_CampaignsNamespaceQueryResponse.graphql";
import Page404Content from "components/pages/errors/Page404Content";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { campaignQuery } from "hooks/campaign-page/v2/useCampaignPageCampaignV2";
import { useCampaignPageCampaignV2Query } from "hooks/campaign-page/v2/__generated__/useCampaignPageCampaignV2Query.graphql";
import useSetPageTitle from "hooks/useSetPageTitle";
import { PreloadedQuery, useFragment, usePreloadedQuery } from "react-relay";
import CampaignTab from "formfn-shared/dist/types/enums/CampaignTab";
import ElementId from "types/enums/ElementId";
import scrollElementIntoView from "utils/scroll/scrollElementIntoView";
import { useCampaignPageCampaignV2GoalQuery } from "hooks/campaign-page/v2/__generated__/useCampaignPageCampaignV2GoalQuery.graphql";
import { campaignGoalQuery } from "hooks/campaign-page/v2/useCampaignPageCampaignV2Goal";
import { Suspense } from "react";
import CampaignProgressSkeleton from "components/pages/campaign/campaign-generic/hero/goals/skeletons/CampaignProgressSkeleton";

const fragment = graphql`
  fragment CampaignHeroForCampaignsNamespace_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {
    campaignV2ForSlug(input: $input) {
      campaign {
        galleryAssets {
          ...CampaignHeroAssets_AssetExpress
        }

        tagline
        title

        logoAsset {
          ...AssetForAssetExpress_AssetExpress
        }

        socialLinks {
          discord
          instagram
          twitter
          website
        }

        youtubeVideoHref
        ...CampaignArtistPillButtons_CampaignV2
      }
    }
  }
`;

type InnerProps = {
  activity: Maybe<JSX.Element>;
  campaignGoalQueryRef: PreloadedQuery<useCampaignPageCampaignV2GoalQuery>;
  campaignsNamespace: CampaignHeroForCampaignsNamespace_CampaignsNamespaceQueryResponse$key;
  setCampaignTab: (val: CampaignTab) => void;
};

function CampaignProgressTowardsGoalQueryLoader({
  campaignGoalQueryRef,
}: {
  campaignGoalQueryRef: PreloadedQuery<useCampaignPageCampaignV2GoalQuery>;
}) {
  const campaignGoalData =
    usePreloadedQuery<useCampaignPageCampaignV2GoalQuery>(
      campaignGoalQuery,
      campaignGoalQueryRef
    );
  return (
    <CampaignProgressTowardsGoalForCampaignV2
      campaign={campaignGoalData.CampaignsNamespace.campaignV2ForSlug.campaign}
    />
  );
}

function Inner({
  activity,
  campaignGoalQueryRef,
  campaignsNamespace,
  setCampaignTab,
}: InnerProps) {
  const campaignsNamespaceData = useFragment(fragment, campaignsNamespace);
  const { campaign } = campaignsNamespaceData.campaignV2ForSlug;
  useSetPageTitle(campaign?.title ?? "Not found");

  if (campaign == null) {
    return <Page404Content message="Campaign not found" />;
  }

  const assets =
    campaign.galleryAssets == null ? null : (
      <CampaignHeroAssets
        assets={campaign.galleryAssets}
        youTubeVideoHref={campaign.youtubeVideoHref}
      />
    );

  const top = (
    <CampaignHeroTop
      artistPillButton={<CampaignArtistPillButtons campaign={campaign} />}
      description={campaign.tagline}
      logoAsset={
        campaign.logoAsset == null ? null : (
          <AssetForAssetExpress
            asset={campaign.logoAsset}
            // TODO[@arcticmatt]: may need to adjust image sizing, this just makes it look good for popheadz
            height={121}
            objectFit="cover"
            showDropShadow={false}
            showShimmer={false}
            width="auto"
          />
        )
      }
      onClickLearnMore={() => {
        setCampaignTab(CampaignTab.About);
        scrollElementIntoView(ElementId.CampaignTabs);
      }}
      socialLinks={{
        discord: campaign.socialLinks?.discord,
        instagram: campaign.socialLinks?.instagram,
        twitter: campaign.socialLinks?.twitter,
        website: campaign.socialLinks?.website,
      }}
      title={campaign.title}
    />
  );

  return (
    <CampaignHero
      activity={activity}
      assets={assets}
      progressTowardsGoal={
        <Suspense fallback={<CampaignProgressSkeleton />}>
          <CampaignProgressTowardsGoalQueryLoader
            campaignGoalQueryRef={campaignGoalQueryRef}
          />
        </Suspense>
      }
      top={top}
    />
  );
}

type Props = {
  activity: Maybe<JSX.Element>;
  campaignGoalQueryRef: PreloadedQuery<useCampaignPageCampaignV2GoalQuery>;
  campaignQueryRef: PreloadedQuery<useCampaignPageCampaignV2Query>;
  setCampaignTab: (val: CampaignTab) => void;
};

export default function CampaignHeroForCampaignsNamespace({
  activity,
  campaignGoalQueryRef,
  campaignQueryRef,
  setCampaignTab,
}: Props) {
  const data = usePreloadedQuery<useCampaignPageCampaignV2Query>(
    campaignQuery,
    campaignQueryRef
  );

  return (
    <Inner
      activity={activity}
      campaignGoalQueryRef={campaignGoalQueryRef}
      campaignsNamespace={data.CampaignsNamespace}
      setCampaignTab={setCampaignTab}
    />
  );
}
