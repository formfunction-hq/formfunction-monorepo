import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import SpotlightExpressStatus_enum from "types/relay/SpotlightExpressStatus_enum";

const SPOTLIGHT_STATUS_HUMAN_READABLE: Record<
  SpotlightExpressStatus_enum,
  Maybe<string>
> = {
  Available: "Available",
  Ended: "Ended",
  Override: null,
  [RELAY_FUTURE_ADDED_VALUE]: null,
  Sold: "Sold",
  SoldOut: "Sold Out",
};

export default SPOTLIGHT_STATUS_HUMAN_READABLE;
