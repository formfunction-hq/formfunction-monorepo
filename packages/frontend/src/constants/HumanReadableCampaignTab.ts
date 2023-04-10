import CampaignTab from "formfn-shared/dist/types/enums/CampaignTab";

const HUMAN_READABLE_CAMPAIGN_TAB: Record<CampaignTab, string> = {
  [CampaignTab.About]: "About the project",
  [CampaignTab.Community]: "Community",
  [CampaignTab.PublicUpdates]: "Public updates",
  [CampaignTab.Support]: "Support",
};

export default HUMAN_READABLE_CAMPAIGN_TAB;
