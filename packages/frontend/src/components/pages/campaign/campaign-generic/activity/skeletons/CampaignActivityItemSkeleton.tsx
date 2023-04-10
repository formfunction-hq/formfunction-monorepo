import styles from "css/pages/campaign/campaign-generic/activity/CampaignActivityItem.module.css";
import Skeleton from "react-loading-skeleton";
import ColorValue from "types/enums/ColorValue";
import Body2 from "components/text/Body2";
import Body1 from "components/text/Body1";

export default function CampaignActivityItemSkeleton(): JSX.Element {
  return (
    <div className={styles.container}>
      <Body1 colorClass={null}>
        <Skeleton baseColor={ColorValue.Ghost} width={300} />
      </Body1>
      <Body2 colorClass={null}>
        <Skeleton baseColor={ColorValue.Ghost} width={200} />
      </Body2>
    </div>
  );
}
