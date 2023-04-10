import StatsRowRank from "components/pages/stats/stats-row/StatsRowRank";
import StatsRowRankAndUserInfo from "components/pages/stats/stats-row/StatsRowRankAndUserInfo";
import StatsRowUserInfo from "components/pages/stats/stats-row/StatsRowUserInfo";
import styles from "css/pages/stats/stats-row/StatsRow.module.css";
import StatsDisplayType from "types/enums/StatsDisplayType";

type Props = {
  displayType: StatsDisplayType;
  rank: number;
};

export default function StatsRowSkeleton({ displayType, rank }: Props) {
  return (
    <div className={styles.container}>
      <StatsRowRankAndUserInfo
        fixedWidth={displayType !== StatsDisplayType.DoubleColumn}
      >
        <StatsRowRank rank={rank} />
        <StatsRowUserInfo
          displayName=""
          isLoadingSkeleton
          photoUrl=""
          username=""
        />
      </StatsRowRankAndUserInfo>
    </div>
  );
}
