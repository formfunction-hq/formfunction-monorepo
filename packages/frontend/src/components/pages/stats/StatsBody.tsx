import { Suspense } from "react";
import TabButton from "components/buttons/TabButton";
import StatsBodyCollectors from "components/pages/stats/StatsBodyCollectors";
import StatsBodyCreators from "components/pages/stats/StatsBodyCreators";
import StatsFilter from "components/pages/stats/StatsFilter";
import styles from "css/pages/stats/StatsBody.module.css";
import useStatsTab from "hooks/useStatsTab";
import useStatsFilter from "hooks/useStatsFilter";
import StatsTabType from "types/enums/StatsTabType";
import getAfterTimeString from "utils/dates/getAfterTimeString";
import dayjs from "utils/dates/dayjsex";
import StatsDisplayType from "types/enums/StatsDisplayType";
import StatsDuration from "types/enums/StatsDuration";
import StatsBodySkeleton from "components/pages/stats/stats-row/StatsBodySkeleton";
import StatsRowHeaderType from "types/enums/StatsRowHeaderType";

function Tabs({
  statsTab,
  setStatsTab,
}: {
  setStatsTab: (val: StatsTabType) => void;
  statsTab: StatsTabType;
}) {
  return (
    <div className={styles.tabs}>
      <TabButton
        isActive={statsTab === StatsTabType.Creators}
        name={StatsTabType.Creators}
        onClick={() => setStatsTab(StatsTabType.Creators)}
      />
      <TabButton
        isActive={statsTab === StatsTabType.Collectors}
        name={StatsTabType.Collectors}
        onClick={() => setStatsTab(StatsTabType.Collectors)}
      />
    </div>
  );
}

type Props = {
  displayType: StatsDisplayType;
  initialDuration: StatsDuration;
  numberOfStatsToFetch: number;
  showStatsRowHeader?: boolean;
};

export default function StatsBody({
  displayType,
  initialDuration,
  numberOfStatsToFetch,
  showStatsRowHeader = true,
}: Props) {
  const durations = [
    dayjs.duration({ days: 1 }),
    dayjs.duration({ weeks: 1 }),
    dayjs.duration({ months: 1 }),
    dayjs.duration({ years: 99 }), // All time
  ];
  const [statsTab, setStatsTab] = useStatsTab();
  const [statsFilter, statsFilterIndex, setStatsFilter] = useStatsFilter(
    durations,
    initialDuration
  );
  const filters = { afterTime: getAfterTimeString(statsFilter) };

  const creators = (
    <Suspense
      fallback={
        statsTab === StatsTabType.Creators ? (
          <StatsBodySkeleton
            displayType={displayType}
            headerType={
              showStatsRowHeader ? StatsRowHeaderType.CreatorsHeader : undefined
            }
          />
        ) : null
      }
    >
      <div
        style={statsTab === StatsTabType.Creators ? {} : { display: "none" }}
      >
        <StatsBodyCreators
          displayType={displayType}
          filters={filters}
          headerType={
            showStatsRowHeader ? StatsRowHeaderType.CreatorsHeader : undefined
          }
          numberOfStatsToFetch={numberOfStatsToFetch}
        />
      </div>
    </Suspense>
  );

  const collectors = (
    <Suspense
      fallback={
        statsTab === StatsTabType.Collectors ? (
          <StatsBodySkeleton
            displayType={displayType}
            headerType={
              showStatsRowHeader
                ? StatsRowHeaderType.CollectorsHeader
                : undefined
            }
          />
        ) : null
      }
    >
      <div
        style={statsTab === StatsTabType.Collectors ? {} : { display: "none" }}
      >
        <StatsBodyCollectors
          displayType={displayType}
          filters={filters}
          headerType={
            showStatsRowHeader ? StatsRowHeaderType.CollectorsHeader : undefined
          }
          numberOfStatsToFetch={numberOfStatsToFetch}
        />
      </div>
    </Suspense>
  );

  return (
    <div>
      <div className={styles.controlBar}>
        <Tabs
          statsTab={statsTab}
          setStatsTab={(val) => {
            setStatsTab(val);
          }}
        />
        <StatsFilter
          statsFilter={statsFilterIndex}
          setStatsFilter={(val) => {
            setStatsFilter(durations[val].toJSON());
          }}
        />
      </div>
      <div className={styles.stats}>
        {creators}
        {collectors}
      </div>
    </div>
  );
}
