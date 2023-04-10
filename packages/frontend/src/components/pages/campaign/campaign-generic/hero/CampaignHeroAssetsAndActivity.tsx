import styles from "css/pages/campaign/campaign-generic/hero/CampaignHeroAssetsAndActivity.module.css";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";

type Props = {
  activity: MaybeUndef<JSX.Element>;
  assets: Maybe<JSX.Element>;
  progressTowardsGoal: Maybe<JSX.Element>;
};

export default function CampaignHeroAssetsAndActivity({
  activity,
  assets,
  progressTowardsGoal,
}: Props) {
  return (
    <div className={styles.assetsSection}>
      <div className={styles.assets}>{assets}</div>
      <div className={styles.assetsSectionRight}>
        {progressTowardsGoal}
        {activity}
      </div>
    </div>
  );
}
