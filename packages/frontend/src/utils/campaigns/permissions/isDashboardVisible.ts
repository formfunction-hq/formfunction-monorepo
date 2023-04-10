import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import CampaignStatusExpress_enum from "types/relay/CampaignStatusExpress_enum";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";

export default function isDashboardVisible(status: CampaignStatusExpress_enum) {
  switch (status) {
    case "Concluded":
    case "Published":
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
