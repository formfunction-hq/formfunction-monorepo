import { Currency } from "@prisma/client";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import {
  CurrencyNameExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";

export default function getCurrencyNameForTxType(
  txType: NftTransactionTypeExpress_Enum,
  listingCurrency: MaybeUndef<Currency>,
  currencyName: MaybeUndef<CurrencyNameExpress_Enum>
): Maybe<CurrencyNameExpress_Enum> {
  switch (txType) {
    case NftTransactionTypeExpress_Enum.Bid:
    case NftTransactionTypeExpress_Enum.Sold:
    case NftTransactionTypeExpress_Enum.SoldInstantSale:
    case NftTransactionTypeExpress_Enum.AuctionWon:
    case NftTransactionTypeExpress_Enum.Refunded:
    case NftTransactionTypeExpress_Enum.ChangePriceForEditions:
      return listingCurrency?.name as Maybe<CurrencyNameExpress_Enum>;
    case NftTransactionTypeExpress_Enum.Listed:
    case NftTransactionTypeExpress_Enum.ListedEditions:
    case NftTransactionTypeExpress_Enum.ListedInstantSale:
    case NftTransactionTypeExpress_Enum.Offer:
    case NftTransactionTypeExpress_Enum.SoldAcceptedOffer:
    case NftTransactionTypeExpress_Enum.SoldEditionPrimary:
    case NftTransactionTypeExpress_Enum.SoldGenerativeMint:
      // Provided by client
      return currencyName!;
    case NftTransactionTypeExpress_Enum.Burned:
    case NftTransactionTypeExpress_Enum.Transferred:
    case NftTransactionTypeExpress_Enum.ClaimedPnft:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemBid:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemFullRightsTransferBid:
    case NftTransactionTypeExpress_Enum.HolaplexRedeemPrintingV2Bid:
    case NftTransactionTypeExpress_Enum.Imported:
    case NftTransactionTypeExpress_Enum.ListingCancelled:
    case NftTransactionTypeExpress_Enum.Minted:
    case NftTransactionTypeExpress_Enum.OfferCancelled:
    case NftTransactionTypeExpress_Enum.StoppedMintingForEditions:
      // These all have null price fields so the currency is not important
      return null;
    default:
      return assertUnreachable(txType);
  }
}
