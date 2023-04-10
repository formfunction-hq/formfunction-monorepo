import ListingType from "types/enums/ListingType";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";

export default function getListingTransactionTypeForListingType(
  listingType: ListingType
) {
  switch (listingType) {
    case ListingType.Auction:
      return "Listed";
    case ListingType.InstantSale:
      return "ListedInstantSale";
    default:
      return assertUnreachable(listingType);
  }
}
