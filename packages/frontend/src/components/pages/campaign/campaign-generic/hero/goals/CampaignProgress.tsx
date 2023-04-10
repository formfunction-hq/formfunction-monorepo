import useCampaignColorScheme from "hooks/useCampaignColorScheme";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import CampaignProgressNormal from "components/pages/campaign/campaign-generic/hero/goals/CampaignProgressNormal";
import CampaignProgressCompact from "components/pages/campaign/campaign-generic/hero/goals/CampaignProgressCompact";

export type CampaignProgressDisplayType = "compact" | "normal";

export type CampaignProgressProps = {
  currentAmount: number;
  descriptionOverride?: string | JSX.Element;
  displayType?: CampaignProgressDisplayType;
  emojiMarker: string;
  goalAmount: number;
  goalDescription: string;
  progress: string;
};

// TODO: use in CampaignProgressTowardsGoalSkeleton
export default function CampaignProgress({
  currentAmount,
  descriptionOverride,
  displayType = "normal",
  emojiMarker,
  goalDescription,
  goalAmount,
  progress,
}: CampaignProgressProps) {
  const colorScheme = useCampaignColorScheme();

  switch (displayType) {
    case "compact":
      return (
        <CampaignProgressCompact
          currentAmount={currentAmount}
          descriptionOverride={descriptionOverride}
          emojiMarker={emojiMarker}
          goalAmount={goalAmount}
          goalDescription={goalDescription}
          progress={progress}
        />
      );
    case "normal":
      return (
        <CampaignProgressNormal
          colorScheme={colorScheme}
          currentAmount={currentAmount}
          emojiMarker={emojiMarker}
          goalAmount={goalAmount}
          goalDescription={goalDescription}
          progress={progress}
        />
      );
    default:
      return assertUnreachable(displayType);
  }
}
