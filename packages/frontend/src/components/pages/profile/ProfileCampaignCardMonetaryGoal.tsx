import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { ProfileCampaignCardMonetaryGoal_CampaignMonetaryGoal$key } from "components/pages/profile/__generated__/ProfileCampaignCardMonetaryGoal_CampaignMonetaryGoal.graphql";
import formatDecimals from "formfn-shared/dist/utils/formatDecimals";
import ProfileCampaignCardGoalGeneric from "components/pages/profile/ProfileCampaignCardGoalGeneric";

const goalFragment = graphql`
  fragment ProfileCampaignCardMonetaryGoal_CampaignMonetaryGoal on CampaignMonetaryGoal {
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
  goal: ProfileCampaignCardMonetaryGoal_CampaignMonetaryGoal$key;
};

export default function ProfileCampaignCardMonetaryGoal({ goal }: Props) {
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
    <ProfileCampaignCardGoalGeneric
      goalDescription={goalDescription}
      progressDescription={progress}
    />
  );
}
