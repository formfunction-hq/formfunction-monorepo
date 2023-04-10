import ResponsiveContainer from "components/containers/ResponsiveContainer";
import StatsBody from "components/pages/stats/StatsBody";
import StatsDisplayType from "types/enums/StatsDisplayType";
import StatsDuration from "types/enums/StatsDuration";
import LandingSectionHeader from "components/pages/landing/LandingSectionHeader";

const LANDING_PAGE_NUMBER_OF_STATS_TO_FETCH = 6;

export default function LandingLeaderboard(): JSX.Element {
  return (
    <ResponsiveContainer>
      <LandingSectionHeader>Leaderboard</LandingSectionHeader>
      <StatsBody
        displayType={StatsDisplayType.DoubleColumn}
        initialDuration={StatsDuration.SevenDays}
        numberOfStatsToFetch={LANDING_PAGE_NUMBER_OF_STATS_TO_FETCH}
        showStatsRowHeader={false}
      />
    </ResponsiveContainer>
  );
}
