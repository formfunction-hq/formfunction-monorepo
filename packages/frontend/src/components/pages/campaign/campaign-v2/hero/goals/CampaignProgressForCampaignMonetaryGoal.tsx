import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import formatDecimals from "formfn-shared/dist/utils/formatDecimals";
import CampaignProgress, {
  CampaignProgressDisplayType,
} from "components/pages/campaign/campaign-generic/hero/goals/CampaignProgress";
import { CampaignProgressForCampaignMonetaryGoal_CampaignMonetaryGoal$key } from "components/pages/campaign/campaign-v2/hero/goals/__generated__/CampaignProgressForCampaignMonetaryGoal_CampaignMonetaryGoal.graphql";

const goalFragment = graphql`
  fragment CampaignProgressForCampaignMonetaryGoal_CampaignMonetaryGoal on CampaignMonetaryGoal {
    goalAmount
    currentAmount
    currency {
      decimals
      shortSymbol
      symbol
    }
  }
`;

type Props = {
  descriptionOverride?: string | JSX.Element;
  displayType?: CampaignProgressDisplayType;
  emojiMarker: string;
  goal: CampaignProgressForCampaignMonetaryGoal_CampaignMonetaryGoal$key;
};

export default function CampaignProgressForCampaignMonetaryGoal({
  descriptionOverride,
  displayType,
  goal,
  emojiMarker,
}: Props) {
  const campaignGoalData = useFragment(goalFragment, goal);
  const {
    goalAmount,
    currentAmount,
    currency: { decimals, shortSymbol, symbol },
  } = campaignGoalData;
  const progress = `${formatDecimals(currentAmount, decimals!)} ${
    shortSymbol ?? symbol
  }`;
  const goalDescription = `raised so far of ${formatDecimals(
    goalAmount,
    decimals
  )} ${shortSymbol ?? symbol}`;

  return (
    <CampaignProgress
      descriptionOverride={descriptionOverride}
      displayType={displayType}
      goalDescription={goalDescription}
      progress={progress}
      currentAmount={currentAmount}
      goalAmount={goalAmount}
      emojiMarker={emojiMarker}
    />
  );
}
