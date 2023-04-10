import SaleType from "types/enums/SaleType";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";

export default function getSoldTransactionTypeForSaleType(saleType: SaleType) {
  switch (saleType) {
    case SaleType.Auction:
      return "Sold";
    case SaleType.InstantSale:
      return "SoldInstantSale";
    case SaleType.Offer:
      return "SoldAcceptedOffer";
    default:
      return assertUnreachable(saleType);
  }
}
