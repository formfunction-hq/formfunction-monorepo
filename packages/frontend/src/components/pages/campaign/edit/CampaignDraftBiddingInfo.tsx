import styles from "css/pages/campaign/edit/CampaignDraftBiddingInfo.module.css";
import ColorClass from "types/enums/ColorClass";
import Body2 from "components/text/Body2";
import graphql from "babel-plugin-relay/macro";
import { range } from "formfn-shared/dist/utils/range";
import { useFragment } from "react-relay";
import CampaignDraftCampaignProgressTowardsGoal from "components/pages/campaign/edit/CampaignDraftCampaignProgressTowardsGoal";
import { CampaignDraftBiddingInfo_CampaignV2$key } from "components/pages/campaign/edit/__generated__/CampaignDraftBiddingInfo_CampaignV2.graphql";
import useCampaignColorScheme from "hooks/useCampaignColorScheme";

const fragment = graphql`
  fragment CampaignDraftBiddingInfo_CampaignV2 on CampaignV2 {
    ...CampaignDraftCampaignProgressTowardsGoal_CampaignV2
  }
`;

type Props = {
  campaign: CampaignDraftBiddingInfo_CampaignV2$key;
};

function CampaignDraftBiddingInfoBars() {
  const colorScheme = useCampaignColorScheme();

  return (
    <>
      {range(4).map((i) => (
        <div
          key={i}
          style={{ border: `2px solid ${colorScheme.foreground.colorValue}` }}
          className={styles.bar}
        />
      ))}
    </>
  );
}

export default function CampaignDraftBiddingInfo({ campaign }: Props) {
  const campaignData = useFragment(fragment, campaign);

  return (
    <div className={styles.biddingInfoContainer}>
      <CampaignDraftCampaignProgressTowardsGoal campaign={campaignData} />
      <div className={styles.biddingInfoFillerContent}>
        <CampaignDraftBiddingInfoBars />
        <Body2 textAlign="center" colorClass={ColorClass.Secondary}>
          Bidding and buying info will appear here
        </Body2>
        <CampaignDraftBiddingInfoBars />
      </div>
    </div>
  );
}
