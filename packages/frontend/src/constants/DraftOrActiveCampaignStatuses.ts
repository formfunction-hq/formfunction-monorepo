import CAMPAIGN_STATUSES from "constants/CampaignStatuses";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import CampaignStatusExpress_enum from "types/relay/CampaignStatusExpress_enum";

function isDraftOrActiveCampaignStatus(status: CampaignStatusExpress_enum) {
  switch (status) {
    case "Approved":
    case "Draft":
    case "Pending":
    case "Published":
      return true;
    case "Concluded":
    case "Rejected":
      return false;
    case RELAY_FUTURE_ADDED_VALUE:
      return false;
    default:
      return assertUnreachable(status);
  }
}

const DRAFT_OR_ACTIVE_CAMPAIGN_STATUSES: Array<CampaignStatusExpress_enum> =
  CAMPAIGN_STATUSES.filter((status) => isDraftOrActiveCampaignStatus(status));

export default DRAFT_OR_ACTIVE_CAMPAIGN_STATUSES;
