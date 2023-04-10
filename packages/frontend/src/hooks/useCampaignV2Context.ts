import {
  CampaignV2Context,
  CampaignV2ContextData,
} from "context/CampaignV2Context";

import { useContext } from "react";

export default function useCampaignV2Context(): CampaignV2ContextData {
  return useContext(CampaignV2Context);
}
