import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import ALL_TRANSACTION_TYPES from "constants/transactions/AllTransactionTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import NftTransactionTypeExpress_enum from "types/relay/NftTransactionTypeExpress_enum";

function isSoldTransactionType(txType: NftTransactionTypeExpress_enum) {
  switch (txType) {
    case "Sold":
    case "SoldAcceptedOffer":
    case "SoldEditionPrimary":
    case "SoldGenerativeMint":
    case "SoldInstantSale":
      return true;
    case "AuctionWon":
    case "Bid":
    case "Burned":
    case "ChangePriceForEditions":
    case "ClaimedPnft":
    case "HolaplexRedeemBid":
    case "HolaplexRedeemFullRightsTransferBid":
    case "HolaplexRedeemPrintingV2Bid":
    case "Imported":
    case "Listed":
    case "ListedEditions":
    case "ListedInstantSale":
    case "ListingCancelled":
    case "Minted":
    case "Offer":
    case "OfferCancelled":
    case "Refunded":
    case "StoppedMintingForEditions":
    case "Transferred":
    case RELAY_FUTURE_ADDED_VALUE:
      return false;
    default:
      return assertUnreachable(txType);
  }
}

const SOLD_TRANSACTION_TYPES = ALL_TRANSACTION_TYPES.filter((txType) =>
  isSoldTransactionType(txType)
);

export default SOLD_TRANSACTION_TYPES;
