import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { ProfileCampaignCardGoal_CampaignExpress$key } from "components/pages/profile/__generated__/ProfileCampaignCardGoal_CampaignExpress.graphql";
import ProfileCampaignCardMonetaryGoal from "components/pages/profile/ProfileCampaignCardMonetaryGoal";
import ProfileCampaignCardSaleCountGoal from "components/pages/profile/ProfileCampaignCardSaleCountGoal";

const campaignFragment = graphql`
  fragment ProfileCampaignCardGoal_CampaignExpress on CampaignExpress {
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
  campaign: ProfileCampaignCardGoal_CampaignExpress$key;
};

export default function ProfileCampaignCardGoal({ campaign }: Props) {
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
