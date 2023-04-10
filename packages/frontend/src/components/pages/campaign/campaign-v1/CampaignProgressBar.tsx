import styles from "css/pages/campaign/campaign-v1/CampaignProgressBar.module.css";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import useCampaignColorScheme from "hooks/useCampaignColorScheme";
import BackgroundColorClass from "types/enums/BackgroundColorClass";
import joinClasses from "utils/joinClasses";

type Props = {
  backgroundColorClass?: BackgroundColorClass;
  emojiFontSize?: number;
  emojiMarker?: MaybeUndef<string>;
  // Should be in the range [0,1]
  progressAsFraction: number;
};

export default function CampaignProgressBar({
  backgroundColorClass = BackgroundColorClass.White,
  emojiFontSize = 30,
  emojiMarker,
  progressAsFraction,
}: Props): JSX.Element {
  const progressAsPercent = Math.min(progressAsFraction * 100, 100);
  const colorScheme = useCampaignColorScheme();

  return (
    <div className={joinClasses(styles.container, backgroundColorClass)}>
      <div
        className={joinClasses(
          styles.progressBar,
          colorScheme.foreground.backgroundColorClass
        )}
        style={{ width: `${progressAsPercent}%` }}
      />
      {emojiMarker != null && (
        <div
          className={styles.emoji}
          style={{
            fontSize: emojiFontSize,
            marginLeft: `calc(${progressAsPercent}% - ${emojiFontSize / 2}px)`,
          }}
        >
          {emojiMarker}
        </div>
      )}
    </div>
  );
}
