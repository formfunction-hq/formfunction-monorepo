import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { NftStatusExpress_Enum } from "src/__generated__/generated";

function isListed(status: NftStatusExpress_Enum) {
  switch (status) {
    case NftStatusExpress_Enum.Listed:
    case NftStatusExpress_Enum.ListedEditions:
    case NftStatusExpress_Enum.ListedInstantSale:
    case NftStatusExpress_Enum.ListingScheduled:
      return true;
    case NftStatusExpress_Enum.AirdropCompleted:
    case NftStatusExpress_Enum.AirdropInProgress:
    case NftStatusExpress_Enum.Auction:
    case NftStatusExpress_Enum.Burned:
    case NftStatusExpress_Enum.Owned:
    case NftStatusExpress_Enum.OwnedStoppedMintingForEditions:
    case NftStatusExpress_Enum.SoldOutEditions:
      return false;
    default:
      return assertUnreachable(status);
  }
}

const LISTED_NFT_STATUSES = Object.values(NftStatusExpress_Enum).filter(
  (status) => isListed(status)
);

export default LISTED_NFT_STATUSES;
