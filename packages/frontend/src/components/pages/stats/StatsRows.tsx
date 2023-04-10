import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import StatsDisplayType from "types/enums/StatsDisplayType";
import styles from "css/pages/stats/StatsRows.module.css";

type Props = {
  children: any;
  displayType: StatsDisplayType;
};

export default function StatsRows({
  children,
  displayType,
}: Props): JSX.Element {
  switch (displayType) {
    case StatsDisplayType.DoubleColumn:
      return <div className={styles.doubleColumn}>{children}</div>;
    case StatsDisplayType.SingleColumn:
      return <div className={styles.singleColumn}>{children}</div>;
    default:
      return assertUnreachable(displayType);
  }
}
