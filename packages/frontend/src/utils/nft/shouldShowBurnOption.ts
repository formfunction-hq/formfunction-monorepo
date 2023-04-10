import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import NftStatusExpress_enum from "types/relay/NftStatusExpress_enum";

export default function shouldShowBurnOption(
  status: NftStatusExpress_enum,
  numberOfStandardEditionsMinted: number
): boolean {
  switch (status) {
    case "Owned":
      return true;
    case "OwnedStoppedMintingForEditions":
      return numberOfStandardEditionsMinted === 0;
    case "AirdropCompleted":
    case "AirdropInProgress":
    case "Auction":
    case "Burned":
    case "Listed":
    case "ListedEditions":
    case "ListedInstantSale":
    case "ListingScheduled":
    case "SoldOutEditions":
    case RELAY_FUTURE_ADDED_VALUE:
      return false;
    default:
      return assertUnreachable(status);
  }
}
