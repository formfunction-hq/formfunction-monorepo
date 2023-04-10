import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import CampaignStatusExpress_enum from "types/relay/CampaignStatusExpress_enum";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";

export default function isDeleteFundingTierAllowed(
  status: CampaignStatusExpress_enum
) {
  switch (status) {
    case "Draft":
    case "Approved":
    case "Published":
      return true;
    case "Concluded":
    case "Pending":
    case "Rejected":
    case RELAY_FUTURE_ADDED_VALUE:
      return false;
    default:
      return assertUnreachable(status);
  }
}
