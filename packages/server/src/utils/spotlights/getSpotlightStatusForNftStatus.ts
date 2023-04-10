import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import {
  NftStatusExpress_Enum,
  SpotlightExpressStatus_Enum,
} from "src/__generated__/generated";

export default function getSpotlightStatusForNftStatus(
  nftStatus: NftStatusExpress_Enum
): SpotlightExpressStatus_Enum {
  switch (nftStatus) {
    case NftStatusExpress_Enum.Auction:
    case NftStatusExpress_Enum.Listed:
    case NftStatusExpress_Enum.ListedEditions:
    case NftStatusExpress_Enum.ListedInstantSale:
    case NftStatusExpress_Enum.ListingScheduled:
    case NftStatusExpress_Enum.Owned:
      return SpotlightExpressStatus_Enum.Available;
    case NftStatusExpress_Enum.Burned:
    case NftStatusExpress_Enum.AirdropCompleted:
    case NftStatusExpress_Enum.AirdropInProgress:
      // Should never hit this case
      return SpotlightExpressStatus_Enum.Ended;
    case NftStatusExpress_Enum.OwnedStoppedMintingForEditions:
    case NftStatusExpress_Enum.SoldOutEditions:
      return SpotlightExpressStatus_Enum.SoldOut;
    default:
      return assertUnreachable(nftStatus);
  }
}
