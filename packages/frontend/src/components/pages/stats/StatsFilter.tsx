import styles from "css/pages/stats/StatsFilter.module.css";
import BigToggleButton from "components/buttons/BigToggleButton";
import ComponentSize from "types/enums/ComponentSize";

export default function StatsFilter({
  statsFilter,
  setStatsFilter,
}: {
  setStatsFilter: (val: number) => void;
  statsFilter: number;
}) {
  return (
    <div className={styles.toggle}>
      <BigToggleButton
        labels={["1 day", "7 days", "30 days", "All time"]}
        onToggle={setStatsFilter}
        position={statsFilter}
        size={ComponentSize.Small}
      />
    </div>
  );
}
