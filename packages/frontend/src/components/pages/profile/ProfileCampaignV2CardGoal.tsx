import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import ProfileCampaignCardMonetaryGoal from "components/pages/profile/ProfileCampaignCardMonetaryGoal";
import ProfileCampaignCardSaleCountGoal from "components/pages/profile/ProfileCampaignCardSaleCountGoal";
import { ProfileCampaignV2CardGoal_CampaignV2$key } from "components/pages/profile/__generated__/ProfileCampaignV2CardGoal_CampaignV2.graphql";

// TODO[@arcticmatt] refactor once Hasura bug is fixed, see https://github.com/hasura/graphql-engine/issues/9179
// Once the bug is fixed, this can be a fragment on CampaignGoal
const campaignFragment = graphql`
  fragment ProfileCampaignV2CardGoal_CampaignV2 on CampaignV2 {
    goal {
      __typename

      ... on CampaignMonetaryGoal {
        ...ProfileCampaignCardMonetaryGoal_CampaignMonetaryGoal
      }

      ... on CampaignSaleCountGoal {
        ...ProfileCampaignCardSaleCountGoal_CampaignSaleCountGoal
      }
    }
  }
`;

type Props = {
  campaign: ProfileCampaignV2CardGoal_CampaignV2$key;
};

export default function ProfileCampaignV2CardGoal({ campaign }: Props) {
  const campaignData = useFragment(campaignFragment, campaign);
  const { goal } = campaignData;

  switch (goal.__typename) {
    case "CampaignMonetaryGoal":
      return <ProfileCampaignCardMonetaryGoal goal={goal} />;
    case "CampaignSaleCountGoal":
      return <ProfileCampaignCardSaleCountGoal goal={goal} />;
    default:
      return null;
  }
}
