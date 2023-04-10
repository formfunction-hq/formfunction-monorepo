import TabButton from "components/buttons/TabButton";
import DisconnectedPageContainer from "components/containers/DisconnectedPageContainer";
import PageWithHeaderAndFooter from "components/containers/PageWithHeaderAndFooter";
import ResponsivePageBody from "components/containers/ResponsivePageBody";
import LoadingSpinner from "components/loading/LoadingSpinner";
import ActivityAuctions from "components/pages/activity/ActivityAuctions";
import ActivityNotifications from "components/pages/activity/ActivityNotifications";
import ActivityOffers from "components/pages/activity/ActivityOffers";
import Header2 from "components/text/Header2";
import styles from "css/pages/activity/ActivityPage.module.css";
import useActivityTab from "hooks/useActivityTab";
import useBottomTabsContext from "hooks/useBottomTabsContext";
import useLogPageView from "hooks/useLogPageView";
import useSetPageTitle from "hooks/useSetPageTitle";
import { Suspense } from "react";
import ActivityTab from "types/enums/ActivityTab";
import ButtonName from "types/enums/ButtonName";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";

function ActivityTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: ActivityTab;
  setActiveTab: (val: ActivityTab) => void;
}): JSX.Element {
  return (
    <div className={styles.tabs}>
      <TabButton
        buttonName={ButtonName.NotificationsTab}
        isActive={activeTab === ActivityTab.Notifications}
        name="Notifications"
        onClick={() => setActiveTab(ActivityTab.Notifications)}
      />
      <TabButton
        buttonName={ButtonName.AuctionsTab}
        isActive={activeTab === ActivityTab.Auctions}
        name="Auctions"
        onClick={() => setActiveTab(ActivityTab.Auctions)}
      />
      <TabButton
        buttonName={ButtonName.OffersTab}
        isActive={activeTab === ActivityTab.Offers}
        name="Offers"
        onClick={() => setActiveTab(ActivityTab.Offers)}
      />
    </div>
  );
}

function Body() {
  const { hasBottomTabs } = useBottomTabsContext();
  const [activeTab, setActiveTab] = useActivityTab();

  return (
    <ResponsivePageBody>
      <div className={styles.body}>
        {!hasBottomTabs && (
          <Header2 colorClass={ColorClass.Primary}>Activity</Header2>
        )}
        <ActivityTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <Suspense
          fallback={
            activeTab === ActivityTab.Notifications && (
              <LoadingSpinner colorValue={ColorValue.BrightPurple} />
            )
          }
        >
          {activeTab === ActivityTab.Notifications && <ActivityNotifications />}
        </Suspense>
        <Suspense
          fallback={
            activeTab === ActivityTab.Auctions && (
              <LoadingSpinner colorValue={ColorValue.BrightPurple} />
            )
          }
        >
          <div className={styles.fullWidth}>
            <ActivityAuctions isShown={activeTab === ActivityTab.Auctions} />
          </div>
        </Suspense>
        <Suspense
          fallback={
            activeTab === ActivityTab.Offers && (
              <LoadingSpinner colorValue={ColorValue.BrightPurple} />
            )
          }
        >
          <div className={styles.fullWidth}>
            <ActivityOffers isShown={activeTab === ActivityTab.Offers} />
          </div>
        </Suspense>
      </div>
    </ResponsivePageBody>
  );
}

export default function ActivityPage(): JSX.Element {
  useLogPageView();
  useSetPageTitle("Activity");

  return (
    <DisconnectedPageContainer>
      <PageWithHeaderAndFooter>
        <Body />
      </PageWithHeaderAndFooter>
    </DisconnectedPageContainer>
  );
}
