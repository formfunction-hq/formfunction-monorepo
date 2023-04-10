import PageWithHeaderAndFooter from "components/containers/PageWithHeaderAndFooter";
import ResponsivePageBody from "components/containers/ResponsivePageBody";
import ExploreControlBar from "components/pages/explore/ExploreControlBar";
import ExploreArtworkGrid from "components/pages/explore/ExploreArtworkGrid";
import Header2 from "components/text/Header2";
import styles from "css/pages/explore/ExplorePage.module.css";
import useIsBottomTabsWidth from "hooks/useIsBottomTabsWidth";
import { Suspense } from "react";
import ExploreCreatorsGrid from "components/pages/explore/ExploreCreatorsGrid";
import useExploreContext from "hooks/useExploreContext";
import ExploreTab from "types/enums/ExploreTab";
import useSetPageTitle from "hooks/useSetPageTitle";
import useLogPageView from "hooks/useLogPageView";
import NftGridFullWidthLoading from "components/grids/nft/NftGridFullWidthLoading";
import CreatorsGrid from "components/misc/CreatorsGrid";
import ExploreCreatorCardLoadingSkeleton from "components/pages/explore/ExploreCreatorCardLoadingSkeleton";
import { range } from "formfn-shared/dist/utils/range";
import SeriesGridFullWidthLoading from "components/series/SeriesGridFullWidthLoading";
import ExploreSeriesGrid from "components/pages/explore/ExploreSeriesGrid";
import isArtworkTab from "utils/explore/isArtworkTab";
import ColorClass from "types/enums/ColorClass";
import ExploreCampaignsGrid from "components/pages/explore/ExploreCampaignsGrid";
import CampaignGridFullWidthLoading from "components/campaign/CampaignGridFullWidthLoading";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";

function getTitleForTab(tab: ExploreTab) {
  switch (tab) {
    case ExploreTab.Artwork:
      return "Discover unique artwork";
    case ExploreTab.Campaigns:
      return "Bring creative projects to life";
    case ExploreTab.Creators:
      return "Find your new favorite creator";
    case ExploreTab.Editions:
      return "Explore amazing editions";
    case ExploreTab.Series:
      return "Discover amazing art series";
    default:
      return assertUnreachable(tab);
  }
}

function Body() {
  const isBottomTabsWidth = useIsBottomTabsWidth();
  const { tab } = useExploreContext();
  const creatorsGridLoading = (
    <CreatorsGrid>
      {range(6).map((val) => (
        <ExploreCreatorCardLoadingSkeleton key={val} />
      ))}
    </CreatorsGrid>
  );

  return (
    <ResponsivePageBody>
      <div className={styles.body}>
        {!isBottomTabsWidth && (
          <Header2
            className={styles.title}
            colorClass={ColorClass.Primary}
            // We want the fadein animation to replay when the tab changes
            key={tab}
          >
            {getTitleForTab(tab)}
          </Header2>
        )}
        <div className={styles.controlBar}>
          <ExploreControlBar />
        </div>
        <div className={styles.exploreGrid}>
          {isArtworkTab(tab) && (
            <Suspense fallback={<NftGridFullWidthLoading multiple={3} />}>
              <ExploreArtworkGrid />
            </Suspense>
          )}
          {tab === ExploreTab.Series && (
            <Suspense fallback={<SeriesGridFullWidthLoading multiple={3} />}>
              <ExploreSeriesGrid />
            </Suspense>
          )}
          {tab === ExploreTab.Campaigns && (
            <Suspense
              fallback={
                <CampaignGridFullWidthLoading
                  multiple={3}
                  showNftAssets={false}
                />
              }
            >
              <ExploreCampaignsGrid />
            </Suspense>
          )}
          {tab === ExploreTab.Creators && (
            <Suspense fallback={creatorsGridLoading}>
              <ExploreCreatorsGrid />
            </Suspense>
          )}
        </div>
      </div>
    </ResponsivePageBody>
  );
}

export default function ExplorePage(): JSX.Element {
  useSetPageTitle("Explore");
  useLogPageView();

  return (
    <PageWithHeaderAndFooter>
      <Body />
    </PageWithHeaderAndFooter>
  );
}
