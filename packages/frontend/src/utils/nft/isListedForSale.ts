import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import NftStatusExpress_enum from "types/relay/NftStatusExpress_enum";

export default function isListedForSale(
  status: NftStatusExpress_enum
): boolean {
  switch (status) {
    case "Listed":
    case "ListedInstantSale":
    case "ListedEditions":
    case "ListingScheduled":
      return true;
    case "Auction":
    case "AirdropCompleted":
    case "AirdropInProgress":
    case "Burned":
    case "SoldOutEditions":
    case "Owned":
    case "OwnedStoppedMintingForEditions":
    case RELAY_FUTURE_ADDED_VALUE:
      return false;
    default:
      return assertUnreachable(status);
  }
}
