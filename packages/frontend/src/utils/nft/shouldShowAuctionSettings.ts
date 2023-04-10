import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import NftStatusExpress_enum from "types/relay/NftStatusExpress_enum";

export default function shouldShowAuctionSettings(
  status: NftStatusExpress_enum
): boolean {
  switch (status) {
    case "Listed":
    case "ListingScheduled":
      return true;
    case "AirdropCompleted":
    case "AirdropInProgress":
    case "ListedEditions":
    case "ListedInstantSale":
    case "Auction":
    case "Burned":
    case "Owned":
    case "OwnedStoppedMintingForEditions":
    case "SoldOutEditions":
    case RELAY_FUTURE_ADDED_VALUE:
      return false;
    default:
      return assertUnreachable(status);
  }
}
