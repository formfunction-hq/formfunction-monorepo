import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import HeliusContext from "src/types/enums/helius/HeliusContext";
import HeliusTransactionType from "src/types/enums/helius/HeliusTransactionType";
import HeliusTransaction from "src/types/HeliusTransaction";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";

export default function getHeliusTransactionNftTransactionType(
  tx: HeliusTransaction
): Maybe<NftTransactionTypeExpress_Enum> {
  switch (tx.type) {
    case HeliusTransactionType.NftSale:
      switch (tx.context) {
        case HeliusContext.Auction:
          return NftTransactionTypeExpress_Enum.Sold;
        case HeliusContext.InstantSale:
          return NftTransactionTypeExpress_Enum.SoldInstantSale;
        case HeliusContext.Offer:
          return NftTransactionTypeExpress_Enum.SoldAcceptedOffer;
        default:
          // NOTE: we do not use assertUnreachable because HeliusContext is not exhaustive,
          // and there are other cases which are covered by "default".
          return null;
      }
    case HeliusTransactionType.NftBid:
      switch (tx.context) {
        case HeliusContext.Auction:
          return NftTransactionTypeExpress_Enum.Bid;
        case HeliusContext.Offer:
          // We don't want to import offers
          return null;
        default:
          // NOTE: we do not use assertUnreachable because HeliusContext is not exhaustive,
          // and there are other cases which are covered by "default".
          return null;
      }
    default:
      // NOTE: we do not use assertUnreachable because HeliusTransactionType is not exhaustive,
      // and there are other cases which are covered by "default".
      return null;
  }
}
