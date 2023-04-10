import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import NftStatusExpress_enum from "types/relay/NftStatusExpress_enum";

// We don't want to let people delete NFTs when it may affect others,
// e.g. if someone has already listed it on Formfunction or an auction is ongoing.
export default function shouldShowDeleteOption(
  status: NftStatusExpress_enum
): boolean {
  switch (status) {
    case "AirdropCompleted":
    case "AirdropInProgress":
    case "Owned":
    case "OwnedStoppedMintingForEditions":
    case "SoldOutEditions":
      return true;
    case "Auction":
    case "Burned":
    case "Listed":
    case "ListedEditions":
    case "ListedInstantSale":
    case "ListingScheduled":
    case RELAY_FUTURE_ADDED_VALUE:
      return false;
    default:
      return assertUnreachable(status);
  }
}
