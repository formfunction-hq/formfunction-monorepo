import SaleType from "@formfunction-hq/formfunction-auction-house/dist/types/enum/SaleType";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";

export default function getSoldTransactionTypeFromSaleType(saleType: SaleType) {
  switch (saleType) {
    case SaleType.Offer:
      return NftTransactionTypeExpress_Enum.SoldAcceptedOffer;
    case SaleType.InstantSale:
      return NftTransactionTypeExpress_Enum.SoldInstantSale;
    case SaleType.Auction:
      return NftTransactionTypeExpress_Enum.Sold;
    default:
      return assertUnreachable(saleType);
  }
}
