import ArtName from "components/text/ArtName";
import styles from "css/pages/stats/stats-row/StatsRowSingleColumn.module.css";
import sharedStyles from "css/pages/stats/stats-row/StatsRow.module.css";
import ColorClass from "types/enums/ColorClass";
import joinClasses from "utils/joinClasses";
import GlobalClass from "types/enums/GlobalClass";
import StatsRowRankAndUserInfo from "components/pages/stats/stats-row/StatsRowRankAndUserInfo";

type Props = {
  collectorsOrCreatorsCount: number;
  nftCount: number;
  rankElem: JSX.Element;
  salesInfoElem: JSX.Element;
  userInfoElem: JSX.Element;
};

export default function StatsRowSingleColumn({
  collectorsOrCreatorsCount,
  nftCount,
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
      <StatsRowRankAndUserInfo>
        {rankElem}
        {userInfoElem}
      </StatsRowRankAndUserInfo>
      <div className={styles.right}>
        <ArtName className={styles.count} colorClass={ColorClass.Primary}>
          {collectorsOrCreatorsCount}
        </ArtName>
        <ArtName className={styles.count} colorClass={ColorClass.Primary}>
          {nftCount}
        </ArtName>
        {salesInfoElem}
      </div>
    </div>
  );
}
