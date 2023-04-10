import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { ProfileCampaignCardSaleCountGoal_CampaignSaleCountGoal$key } from "components/pages/profile/__generated__/ProfileCampaignCardSaleCountGoal_CampaignSaleCountGoal.graphql";
import ProfileCampaignCardGoalGeneric from "components/pages/profile/ProfileCampaignCardGoalGeneric";

const goalFragment = graphql`
  fragment ProfileCampaignCardSaleCountGoal_CampaignSaleCountGoal on CampaignSaleCountGoal {
    goalAmount
    currentAmount
  }
`;

type Props = {
  goal: ProfileCampaignCardSaleCountGoal_CampaignSaleCountGoal$key;
};

export default function ProfileCampaignCardSaleCountGoal({ goal }: Props) {
  const campaignGoalData = useFragment(goalFragment, goal);
  const { currentAmount, goalAmount } = campaignGoalData;
  const progress = `${currentAmount} NFTs`;
  const goalDescription = `sold so far of ${goalAmount}`;

  return (
    <ProfileCampaignCardGoalGeneric
      goalDescription={goalDescription}
      progressDescription={progress}
    />
  );
}
