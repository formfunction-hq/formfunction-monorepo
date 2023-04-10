import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import CampaignProgressForCampaignMonetaryGoal from "components/pages/campaign/campaign-v2/hero/goals/CampaignProgressForCampaignMonetaryGoal";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import RELAY_FUTURE_UNION_VALUE from "constants/RelayFutureUnionValue";
import { CampaignProgressTowardsGoalForCampaignV2_CampaignV2$key } from "components/pages/campaign/campaign-v2/hero/goals/__generated__/CampaignProgressTowardsGoalForCampaignV2_CampaignV2.graphql";
import CampaignProgressForCampaignSaleCountGoal from "components/pages/campaign/campaign-v2/hero/goals/CampaignProgressForCampaignSaleCountGoal";
import { CampaignProgressDisplayType } from "components/pages/campaign/campaign-generic/hero/goals/CampaignProgress";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

const campaignFragment = graphql`
  fragment CampaignProgressTowardsGoalForCampaignV2_CampaignV2 on CampaignV2 {
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
  campaign: Maybe<CampaignProgressTowardsGoalForCampaignV2_CampaignV2$key>;
  descriptionOverride?: string | JSX.Element;
  displayType?: CampaignProgressDisplayType;
};

export default function CampaignProgressTowardsGoalForCampaignV2({
  campaign,
  descriptionOverride,
  displayType,
}: Props) {
  const campaignGoalData = useFragment(campaignFragment, campaign);
  if (campaignGoalData == null) {
    return null;
  }

  const { goal, goalProgressSymbol } = campaignGoalData;
  const goalType = goal.__typename;

  switch (goalType) {
    case "CampaignMonetaryGoal":
      return (
        <CampaignProgressForCampaignMonetaryGoal
          descriptionOverride={descriptionOverride}
          displayType={displayType}
          goal={goal}
          emojiMarker={goalProgressSymbol!}
        />
      );
    case "CampaignSaleCountGoal":
      return (
        <CampaignProgressForCampaignSaleCountGoal
          descriptionOverride={descriptionOverride}
          displayType={displayType}
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
