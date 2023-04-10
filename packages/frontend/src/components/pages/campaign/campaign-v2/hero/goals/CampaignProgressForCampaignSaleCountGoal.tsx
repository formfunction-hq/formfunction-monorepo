import graphql from "babel-plugin-relay/macro";
import CampaignProgress, {
  CampaignProgressDisplayType,
} from "components/pages/campaign/campaign-generic/hero/goals/CampaignProgress";
import { CampaignProgressForCampaignSaleCountGoal_CampaignSaleCountGoal$key } from "components/pages/campaign/campaign-v2/hero/goals/__generated__/CampaignProgressForCampaignSaleCountGoal_CampaignSaleCountGoal.graphql";
import { useFragment } from "react-relay";

const goalFragment = graphql`
  fragment CampaignProgressForCampaignSaleCountGoal_CampaignSaleCountGoal on CampaignSaleCountGoal {
    goalAmount
    currentAmount
  }
`;

type Props = {
  descriptionOverride?: string | JSX.Element;
  displayType?: CampaignProgressDisplayType;
  emojiMarker: string;
  goal: CampaignProgressForCampaignSaleCountGoal_CampaignSaleCountGoal$key;
};

export default function CampaignProgressForCampaignSaleCountGoal({
  descriptionOverride,
  displayType,
  goal,
  emojiMarker,
}: Props) {
  const campaignGoalData = useFragment(goalFragment, goal);
  const { currentAmount, goalAmount } = campaignGoalData;
  const progress = `${currentAmount} NFTs`;
  const goalDescription = `sold so far of ${goalAmount}`;

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
