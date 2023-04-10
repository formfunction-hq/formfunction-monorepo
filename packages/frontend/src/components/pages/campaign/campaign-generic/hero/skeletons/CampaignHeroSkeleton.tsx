import ArtistPillLoadingSkeleton from "components/auction/ArtistPillLoadingSkeleton";
import FlexBox from "components/layout/FlexBox";
import CampaignActivitySkeleton from "components/pages/campaign/campaign-generic/activity/skeletons/CampaignActivitySkeleton";
import CampaignHeroAssetsAndActivity from "components/pages/campaign/campaign-generic/hero/CampaignHeroAssetsAndActivity";
import CampaignProgressSkeleton from "components/pages/campaign/campaign-generic/hero/goals/skeletons/CampaignProgressSkeleton";
import CampaignHeroAssetsSkeleton from "components/pages/campaign/campaign-generic/hero/skeletons/CampaignHeroAssetsSkeleton";
import Header2 from "components/text/Header2";
import Subheader from "components/text/Subheader";
import useBreakpoint from "hooks/useBreakpoint";
import Skeleton from "react-loading-skeleton";
import ColorValue from "types/enums/ColorValue";

export default function CampaignHeroSkeleton(): JSX.Element {
  const { isMobileBreakpoint } = useBreakpoint();

  return (
    <div>
      <FlexBox alignItems="center" flexDirection="column" gap={24}>
        <Header2 colorClass={null} textAlign="center">
          <Skeleton
            baseColor={ColorValue.Ghost}
            width={isMobileBreakpoint ? 200 : 300}
          />
        </Header2>
        <Subheader colorClass={null} textAlign="center">
          <Skeleton
            baseColor={ColorValue.Ghost}
            width={isMobileBreakpoint ? 300 : 500}
          />
        </Subheader>
        <ArtistPillLoadingSkeleton />
      </FlexBox>
      <CampaignHeroAssetsAndActivity
        activity={<CampaignActivitySkeleton />}
        assets={<CampaignHeroAssetsSkeleton />}
        progressTowardsGoal={<CampaignProgressSkeleton />}
      />
    </div>
  );
}
