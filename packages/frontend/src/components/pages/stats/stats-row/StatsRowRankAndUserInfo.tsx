import styles from "css/pages/stats/stats-row/StatsRowRankAndUserInfo.module.css";

type Props = {
  children: any;
  fixedWidth?: boolean;
};

export default function StatsRowRankAndUserInfo({
  children,
  fixedWidth = true,
}: Props): JSX.Element {
  return (
    <div
      className={styles.container}
      style={{ width: fixedWidth ? undefined : "auto" }}
    >
      {children}
    </div>
  );
}
