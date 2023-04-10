import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import ArtistPillButtonForUserExpress from "components/buttons/ArtistPillButtonForUserExpress";
import { CampaignArtistPillButtons_CampaignV2$key } from "components/pages/campaign/campaign-v2/hero/__generated__/CampaignArtistPillButtons_CampaignV2.graphql";
import { nanoid } from "nanoid";
import styles from "css/pages/campaign/campaign-v2/hero/CampaignArtistPillButtons.module.css";

const fragment = graphql`
  fragment CampaignArtistPillButtons_CampaignV2 on CampaignV2 {
    creator {
      ...ArtistPillButtonForUserExpress_UserExpress
    }

    teamMembers {
      member {
        ...ArtistPillButtonForUserExpress_UserExpress
      }
    }
  }
`;
type Props = {
  campaign: CampaignArtistPillButtons_CampaignV2$key;
};

export default function CampaignArtistPillButtons({ campaign }: Props) {
  const campaignData = useFragment(fragment, campaign);

  // TODO(@bryancho): deal with cases where there are a lot of team members
  const artistPills = [
    campaignData.creator,
    ...(campaignData.teamMembers ?? []).map(({ member }) => member),
  ].map((user) => (
    <ArtistPillButtonForUserExpress key={nanoid()} user={user} />
  ));

  return <div className={styles.container}>{artistPills}</div>;
}
