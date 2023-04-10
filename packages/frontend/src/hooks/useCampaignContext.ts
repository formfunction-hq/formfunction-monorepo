import { CampaignContext, CampaignContextData } from "context/CampaignContext";

import { useContext } from "react";

export default function useCampaignContext(): CampaignContextData {
  return useContext(CampaignContext);
}
