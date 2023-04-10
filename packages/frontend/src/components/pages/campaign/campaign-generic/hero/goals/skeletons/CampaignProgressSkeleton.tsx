import styles from "css/pages/campaign/campaign-generic/hero/goals/CampaignProgressNormal.module.css";
import Skeleton from "react-loading-skeleton";
import ColorValue from "types/enums/ColorValue";
import Header3 from "components/text/Header3";
import Body2 from "components/text/Body2";
import CampaignProgressBar from "components/pages/campaign/campaign-v1/CampaignProgressBar";

export default function CampaignProgressSkeleton(): JSX.Element {
  return (
    <div className={styles.container}>
      <Header3 colorClass={null}>
        <Skeleton baseColor={ColorValue.Ghost} width={100} />
      </Header3>
      <Body2 className={styles.goalAmount} colorClass={null}>
        <Skeleton baseColor={ColorValue.Ghost} width={300} />
      </Body2>
      <div className={styles.progressBar}>
        <CampaignProgressBar progressAsFraction={0} />
      </div>
    </div>
  );
}
