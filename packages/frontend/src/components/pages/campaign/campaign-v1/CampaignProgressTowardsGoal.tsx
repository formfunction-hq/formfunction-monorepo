import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { CampaignProgressTowardsGoal_CampaignExpress$key } from "components/pages/campaign/campaign-v1/__generated__/CampaignProgressTowardsGoal_CampaignExpress.graphql";
import CampaignProgressForCampaignMonetaryGoal from "components/pages/campaign/campaign-v2/hero/goals/CampaignProgressForCampaignMonetaryGoal";
import RELAY_FUTURE_UNION_VALUE from "constants/RelayFutureUnionValue";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import CampaignProgressForCampaignSaleCountGoal from "components/pages/campaign/campaign-v2/hero/goals/CampaignProgressForCampaignSaleCountGoal";

const campaignFragment = graphql`
  fragment CampaignProgressTowardsGoal_CampaignExpress on CampaignExpress {
    emojiMarker
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
  campaign: CampaignProgressTowardsGoal_CampaignExpress$key;
};

export default function CampaignProgressTowardsGoal({ campaign }: Props) {
  const campaignGoalData = useFragment(campaignFragment, campaign);
  const { goal, emojiMarker } = campaignGoalData;
  const goalType = goal.__typename;

  switch (goalType) {
    case "CampaignMonetaryGoal":
      return (
        <CampaignProgressForCampaignMonetaryGoal
          goal={goal}
          emojiMarker={emojiMarker!}
        />
      );
    case "CampaignSaleCountGoal":
      return (
        <CampaignProgressForCampaignSaleCountGoal
          goal={goal}
          emojiMarker={emojiMarker!}
        />
      );
    case RELAY_FUTURE_UNION_VALUE:
      return null;
    default:
      return assertUnreachable(goalType);
  }
}
