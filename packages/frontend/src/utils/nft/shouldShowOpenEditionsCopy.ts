import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import NftStatusExpress_enum from "types/relay/NftStatusExpress_enum";

export default function shouldShowOpenEditionsCopy(
  status: NftStatusExpress_enum
): boolean {
  switch (status) {
    case "Owned":
    case "AirdropCompleted":
    case "AirdropInProgress":
    case "Auction":
    case "Burned":
    case "Listed":
    case "ListedEditions":
    case "ListedInstantSale":
    case "ListingScheduled":
      return true;
    case "OwnedStoppedMintingForEditions":
    case "SoldOutEditions":
    case RELAY_FUTURE_ADDED_VALUE:
      return false;
    default:
      return assertUnreachable(status);
  }
}
