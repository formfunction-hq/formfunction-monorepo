import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import CampaignStatusExpress_enum from "types/relay/CampaignStatusExpress_enum";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";

export default function isUpdateBasicInfoAllowed(
  status: CampaignStatusExpress_enum
) {
  switch (status) {
    case "Draft":
    case "Approved":
      return true;
    case "Concluded":
    case "Pending":
    case "Published":
    case "Rejected":
    case RELAY_FUTURE_ADDED_VALUE:
      return false;
    default:
      return assertUnreachable(status);
  }
}
