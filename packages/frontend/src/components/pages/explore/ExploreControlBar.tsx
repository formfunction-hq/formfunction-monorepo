import TabButton from "components/buttons/TabButton";
import FiltersBottomDrawer from "components/drawers/FiltersBottomDrawer";
import MobileSearchBar from "components/pages/search/MobileSearchBar";
import styles from "css/pages/explore/ExploreControlBar.module.css";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import useBreakpoint from "hooks/useBreakpoint";
import useExploreContext from "hooks/useExploreContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import ExploreTab from "types/enums/ExploreTab";
import isArtworkTab from "utils/explore/isArtworkTab";
import joinClasses from "utils/joinClasses";
import SortButtonForExplore from "components/buttons/SortButtonForExplore";
import FiltersButtonForExplore from "components/buttons/FiltersButtonForExplore";
import FiltersButton from "components/buttons/FiltersButton";
import useFlagsTyped from "hooks/useFlagsTyped";
import FiltersButtonForCampaigns from "components/buttons/FiltersButtonForCampaigns";
import GlobalClass from "types/enums/GlobalClass";

// To be enabled once a decent number of campaigns have been created and published
const ENABLE_CAMPAIGNS_EXPLORE_FILTERS = false;

function DesktopButtons(): JSX.Element {
  const { tab } = useExploreContext();

  return (
    <div className={styles.buttons}>
      {isArtworkTab(tab) && <FiltersButtonForExplore />}
      {tab === ExploreTab.Campaigns && ENABLE_CAMPAIGNS_EXPLORE_FILTERS && (
        <FiltersButtonForCampaigns />
      )}
      <SortButtonForExplore />
    </div>
  );
}

function MobileButtons({
  setIsFiltersBottomDrawerShown,
}: {
  setIsFiltersBottomDrawerShown: (val: boolean) => void;
}): JSX.Element {
  return (
    <div className={styles.mobileButtons}>
      <Link className={styles.mobileSearchBarLink} to="/search">
        <MobileSearchBar searchText="" setSearchText={emptyFunction} />
      </Link>
      <FiltersButton
        hideLabel
        iconSize={20}
        onClick={() => setIsFiltersBottomDrawerShown(true)}
      />
    </div>
  );
}

function TabButtonForExploreTab({
  flexGrow,
  name,
  tab,
}: {
  flexGrow: boolean;
  name?: string;
  tab: ExploreTab;
}) {
  const { tab: selectedTab, setTab } = useExploreContext();
  return (
    <TabButton
      isActive={selectedTab === tab}
      name={name ?? tab}
      onClick={() => setTab(tab)}
      flexGrow={flexGrow}
    />
  );
}

type Props = {
  hideTabs?: boolean;
};

function Tabs({ flexGrow }: { flexGrow: boolean }): JSX.Element {
  const { enableCampaignsExplore } = useFlagsTyped();

  return (
    <>
      <TabButtonForExploreTab
        flexGrow={flexGrow}
        name="1/1 Pieces"
        tab={ExploreTab.Artwork}
      />
      <TabButtonForExploreTab tab={ExploreTab.Editions} flexGrow={flexGrow} />
      {enableCampaignsExplore && (
        <TabButtonForExploreTab
          flexGrow={flexGrow}
          tab={ExploreTab.Campaigns}
        />
      )}
      <TabButtonForExploreTab tab={ExploreTab.Series} flexGrow={flexGrow} />
      <TabButtonForExploreTab tab={ExploreTab.Creators} flexGrow={flexGrow} />
    </>
  );
}

function DesktopExploreControlBar({ hideTabs = false }: Props): JSX.Element {
  return (
    <div className={joinClasses(styles.container)}>
      {!hideTabs ? (
        <div className={joinClasses(styles.tabs)}>
          <Tabs flexGrow={false} />
        </div>
      ) : (
        // Empty div so flex layout still works
        <div />
      )}
      <DesktopButtons />
    </div>
  );
}

function MobileExploreControlBar({ hideTabs = false }: Props): JSX.Element {
  const [isFiltersBottomDrawerShown, setIsFiltersBottomDrawerShown] =
    useState(false);

  return (
    <>
      <FiltersBottomDrawer
        isShown={isFiltersBottomDrawerShown}
        onHide={() => setIsFiltersBottomDrawerShown(false)}
      />
      <div className={joinClasses(styles.container, styles.mobileContainer)}>
        <MobileButtons
          setIsFiltersBottomDrawerShown={setIsFiltersBottomDrawerShown}
        />
        {!hideTabs ? (
          <div
            className={joinClasses(
              styles.tabs,
              styles.mobileTabs,
              GlobalClass.HideScrollbar
            )}
          >
            <Tabs flexGrow />
          </div>
        ) : (
          // Empty div so flex layout still works
          <div />
        )}
      </div>
    </>
  );
}

export default function ExploreControlBar({
  hideTabs = false,
}: Props): JSX.Element {
  const { isTabletWideBreakpoint: shouldUseMobileStyling } = useBreakpoint();

  return shouldUseMobileStyling ? (
    <MobileExploreControlBar hideTabs={hideTabs} />
  ) : (
    <DesktopExploreControlBar hideTabs={hideTabs} />
  );
}
