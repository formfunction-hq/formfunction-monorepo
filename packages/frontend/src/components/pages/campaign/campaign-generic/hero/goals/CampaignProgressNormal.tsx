import styles from "css/pages/campaign/campaign-generic/hero/goals/CampaignProgressNormal.module.css";
import Header3 from "components/text/Header3";
import Body2 from "components/text/Body2";
import ColorClass from "types/enums/ColorClass";
import CampaignProgressBar from "components/pages/campaign/campaign-v1/CampaignProgressBar";
import ColorScheme from "types/ColorScheme";
import { CampaignProgressProps } from "components/pages/campaign/campaign-generic/hero/goals/CampaignProgress";
import PlainButton from "components/buttons/PlainButton";
import FlexBox from "components/layout/FlexBox";
import useConfetti from "hooks/useConfetti";

function ConfettiButton() {
  const showConfetti = useConfetti();
  return (
    <PlainButton
      className={styles.confettiButton}
      onClick={showConfetti}
      transparentBg={false}
    >
      <span className={styles.confettiEmoji}>🎉</span>
    </PlainButton>
  );
}

type Props = {
  colorScheme: ColorScheme;
} & Omit<CampaignProgressProps, "displayType">;

export default function CampaignProgressNormal({
  colorScheme,
  currentAmount,
  emojiMarker,
  goalDescription,
  goalAmount,
  progress,
}: Props) {
  const progressBar = (
    <div className={styles.progressBar}>
      <CampaignProgressBar
        emojiMarker={emojiMarker}
        progressAsFraction={currentAmount / goalAmount}
      />
    </div>
  );

  if (currentAmount / goalAmount >= 1) {
    return (
      <div className={styles.container}>
        <FlexBox alignItems="flex-start" gap={16}>
          <ConfettiButton />
          <div>
            <Header3 colorClass={colorScheme.foreground.colorClass}>
              Fully funded
            </Header3>
            <Body2
              className={styles.goalAmount}
              colorClass={ColorClass.Primary}
            >
              {progress} {goalDescription}
            </Body2>
          </div>
        </FlexBox>
        {progressBar}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header3 colorClass={colorScheme.foreground.colorClass}>
        {progress}
      </Header3>
      <Body2 className={styles.goalAmount} colorClass={ColorClass.Primary}>
        {goalDescription}
      </Body2>
      {progressBar}
    </div>
  );
}
