import CAMPAIGN_STATUSES from "constants/CampaignStatuses";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import CampaignStatusExpress_enum from "types/relay/CampaignStatusExpress_enum";

function isCampaignDashboardAvailable(status: CampaignStatusExpress_enum) {
  switch (status) {
    case "Published":
    case "Concluded":
      return true;
    case "Approved":
    case "Draft":
    case "Pending":
    case "Rejected":
    case RELAY_FUTURE_ADDED_VALUE:
      return false;
    default:
      return assertUnreachable(status);
  }
}

const CAMPAIGN_DASHBOARD_AVAILABLE_STATUSES: Array<CampaignStatusExpress_enum> =
  CAMPAIGN_STATUSES.filter((status) => isCampaignDashboardAvailable(status));

export default CAMPAIGN_DASHBOARD_AVAILABLE_STATUSES;
