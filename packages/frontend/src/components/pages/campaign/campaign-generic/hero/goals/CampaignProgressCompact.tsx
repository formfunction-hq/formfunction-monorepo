import styles from "css/pages/campaign/campaign-generic/hero/goals/CampaignProgressCompact.module.css";
import ColorClass from "types/enums/ColorClass";
import CampaignProgressBar from "components/pages/campaign/campaign-v1/CampaignProgressBar";
import Body2Medium from "components/text/Body2Medium";
import BackgroundColorClass from "types/enums/BackgroundColorClass";
import { CampaignProgressProps } from "components/pages/campaign/campaign-generic/hero/goals/CampaignProgress";

type Props = Omit<CampaignProgressProps, "displayType">;

export default function CampaignProgressCompact({
  currentAmount,
  descriptionOverride,
  emojiMarker,
  goalDescription,
  goalAmount,
  progress,
}: Props) {
  return (
    <div>
      <Body2Medium colorClass={ColorClass.Primary}>
        {descriptionOverride == null
          ? `${progress} ${goalDescription}`
          : descriptionOverride}
      </Body2Medium>
      <div className={styles.progressBar}>
        <CampaignProgressBar
          backgroundColorClass={BackgroundColorClass.Tertiary}
          emojiFontSize={24}
          emojiMarker={emojiMarker}
          progressAsFraction={currentAmount / goalAmount}
        />
      </div>
    </div>
  );
}
