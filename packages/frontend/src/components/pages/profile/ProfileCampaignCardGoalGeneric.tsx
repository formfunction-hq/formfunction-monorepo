import Body1 from "components/text/Body1";
import Header3 from "components/text/Header3";
import styles from "css/pages/profile/ProfileCampaignCardGoalGeneric.module.css";
import ColorClass from "types/enums/ColorClass";
import GlobalClass from "types/enums/GlobalClass";
import joinClasses from "utils/joinClasses";

type Props = {
  goalDescription: string;
  progressDescription: string;
};

export default function ProfileCampaignCardGoalGeneric({
  goalDescription,
  progressDescription,
}: Props) {
  return (
    <div className={styles.container}>
      <Header3
        className={joinClasses(GlobalClass.GradientText, styles.currentAmount)}
        colorClass={null}
      >
        {progressDescription}
      </Header3>
      <Body1 colorClass={ColorClass.Primary}>{goalDescription}</Body1>
    </div>
  );
}
