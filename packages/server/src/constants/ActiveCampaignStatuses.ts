import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { CampaignStatusExpress_Enum } from "src/__generated__/generated";

function isActive(status: CampaignStatusExpress_Enum) {
  switch (status) {
    case CampaignStatusExpress_Enum.Approved:
    case CampaignStatusExpress_Enum.Draft:
    case CampaignStatusExpress_Enum.Pending:
    case CampaignStatusExpress_Enum.Published:
      return true;
    case CampaignStatusExpress_Enum.Concluded:
    case CampaignStatusExpress_Enum.Rejected:
      return false;
    default:
      return assertUnreachable(status);
  }
}

const ACTIVE_CAMPAIGN_STATUSES = Object.values(
  CampaignStatusExpress_Enum
).filter((status) => isActive(status));

export default ACTIVE_CAMPAIGN_STATUSES;
