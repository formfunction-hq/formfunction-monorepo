import styles from "css/pages/stats/StatsPage.module.css";
import PageWithHeaderAndFooter from "components/containers/PageWithHeaderAndFooter";
import ResponsivePageBody from "components/containers/ResponsivePageBody";
import StatsBody from "components/pages/stats/StatsBody";
import StatsHeader from "components/pages/stats/StatsHeader";
import useLogPageView from "hooks/useLogPageView";
import useSetPageTitle from "hooks/useSetPageTitle";
import StatsDisplayType from "types/enums/StatsDisplayType";
import StatsDuration from "types/enums/StatsDuration";

const STATS_PAGE_NUMBER_OF_STATS_TO_FETCH = 30;

export default function StatsPage() {
  useLogPageView();
  useSetPageTitle("Stats");

  return (
    <PageWithHeaderAndFooter>
      <ResponsivePageBody>
        <StatsHeader />
        <div className={styles.body}>
          <StatsBody
            displayType={StatsDisplayType.SingleColumn}
            initialDuration={StatsDuration.ThirtyDays}
            numberOfStatsToFetch={STATS_PAGE_NUMBER_OF_STATS_TO_FETCH}
          />
        </div>
      </ResponsivePageBody>
    </PageWithHeaderAndFooter>
  );
}
