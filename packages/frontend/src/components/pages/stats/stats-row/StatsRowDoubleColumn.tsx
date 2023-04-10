import styles from "css/pages/stats/stats-row/StatsRowDoubleColumn.module.css";
import sharedStyles from "css/pages/stats/stats-row/StatsRow.module.css";
import joinClasses from "utils/joinClasses";
import GlobalClass from "types/enums/GlobalClass";
import StatsRowRankAndUserInfo from "components/pages/stats/stats-row/StatsRowRankAndUserInfo";

type Props = {
  rankElem: JSX.Element;
  salesInfoElem: JSX.Element;
  userInfoElem: JSX.Element;
};

export default function StatsRowDoubleColumn({
  rankElem,
  salesInfoElem,
  userInfoElem,
}: Props) {
  const containerClasses = joinClasses(
    styles.container,
    sharedStyles.container,
    GlobalClass.CardAnimation
  );

  return (
    <div className={containerClasses}>
      <StatsRowRankAndUserInfo fixedWidth={false}>
        {rankElem}
        {userInfoElem}
      </StatsRowRankAndUserInfo>
      {salesInfoElem}
    </div>
  );
}
