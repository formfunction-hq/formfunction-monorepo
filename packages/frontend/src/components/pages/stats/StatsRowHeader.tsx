import Body1Medium from "components/text/Body1Medium";
import styles from "css/pages/stats/StatsRowHeader.module.css";
import ColorClass from "types/enums/ColorClass";
import StatsRowHeaderType from "types/enums/StatsRowHeaderType";

type Props = {
  headerType: StatsRowHeaderType;
};

export default function StatsRowHeader({ headerType }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Body1Medium className={styles.name} colorClass={ColorClass.Secondary}>
          Name
        </Body1Medium>
      </div>
      <div className={styles.right}>
        <Body1Medium className={styles.count} colorClass={ColorClass.Secondary}>
          {headerType === StatsRowHeaderType.CreatorsHeader
            ? "Collectors"
            : "Creators Supported"}
        </Body1Medium>
        <Body1Medium className={styles.count} colorClass={ColorClass.Secondary}>
          {headerType === StatsRowHeaderType.CreatorsHeader
            ? "Pieces Sold"
            : "Pieces Bought"}
        </Body1Medium>
        <Body1Medium
          className={styles.salesInfo}
          colorClass={ColorClass.Secondary}
        >
          {headerType === StatsRowHeaderType.CreatorsHeader
            ? "Total Sales"
            : "Total Paid"}
        </Body1Medium>
      </div>
    </div>
  );
}
