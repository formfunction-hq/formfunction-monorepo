import CampaignPageV2 from "components/pages/campaign/campaign-v2/CampaignPage";
import DisconnectedPageContainer from "components/containers/DisconnectedPageContainer";

export default function CampaignPageForAdmin() {
  return (
    <DisconnectedPageContainer adminOnly>
      <CampaignPageV2 isAdminView />
    </DisconnectedPageContainer>
  );
}
