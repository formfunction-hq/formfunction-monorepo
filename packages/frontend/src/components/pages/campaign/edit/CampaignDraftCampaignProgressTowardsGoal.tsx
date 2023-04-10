import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import CampaignProgressForCampaignMonetaryGoal from "components/pages/campaign/campaign-v2/hero/goals/CampaignProgressForCampaignMonetaryGoal";
import RELAY_FUTURE_UNION_VALUE from "constants/RelayFutureUnionValue";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import CampaignProgressForCampaignSaleCountGoal from "components/pages/campaign/campaign-v2/hero/goals/CampaignProgressForCampaignSaleCountGoal";
import { CampaignDraftCampaignProgressTowardsGoal_CampaignV2$key } from "components/pages/campaign/edit/__generated__/CampaignDraftCampaignProgressTowardsGoal_CampaignV2.graphql";

const campaignFragment = graphql`
  fragment CampaignDraftCampaignProgressTowardsGoal_CampaignV2 on CampaignV2 {
    goalProgressSymbol
    goal {
      __typename

      ... on CampaignMonetaryGoal {
        ...CampaignProgressForCampaignMonetaryGoal_CampaignMonetaryGoal
      }

      ... on CampaignSaleCountGoal {
        ...CampaignProgressForCampaignSaleCountGoal_CampaignSaleCountGoal
      }
    }
  }
`;

type Props = {
  campaign: CampaignDraftCampaignProgressTowardsGoal_CampaignV2$key;
};

export default function CampaignDraftCampaignProgressTowardsGoal({
  campaign,
}: Props) {
  const campaignGoalData = useFragment(campaignFragment, campaign);
  const { goal, goalProgressSymbol } = campaignGoalData;
  const goalType = goal.__typename;

  switch (goalType) {
    case "CampaignMonetaryGoal":
      return (
        <CampaignProgressForCampaignMonetaryGoal
          goal={goal}
          emojiMarker={goalProgressSymbol!}
        />
      );
    case "CampaignSaleCountGoal":
      return (
        <CampaignProgressForCampaignSaleCountGoal
          goal={goal}
          emojiMarker={goalProgressSymbol!}
        />
      );
    case RELAY_FUTURE_UNION_VALUE:
      return null;
    default:
      return assertUnreachable(goalType);
  }
}
