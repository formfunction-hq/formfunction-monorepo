import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import arrayOfUnionType from "formfn-shared/dist/utils/array/arrayOfUnionType";
import NftTransactionTypeExpress_enum from "types/relay/NftTransactionTypeExpress_enum";

const arrayOfTransactionTypes =
  arrayOfUnionType<NftTransactionTypeExpress_enum>();

const ALL_TRANSACTION_TYPES: Array<NftTransactionTypeExpress_enum> =
  arrayOfTransactionTypes([
    "AuctionWon",
    "Bid",
    "Burned",
    "ChangePriceForEditions",
    "ClaimedPnft",
    "HolaplexRedeemBid",
    "HolaplexRedeemFullRightsTransferBid",
    "HolaplexRedeemPrintingV2Bid",
    "Imported",
    "Listed",
    "ListedEditions",
    "ListedInstantSale",
    "ListingCancelled",
    "Minted",
    "Offer",
    "OfferCancelled",
    "Refunded",
    "Sold",
    "SoldAcceptedOffer",
    "SoldEditionPrimary",
    "SoldGenerativeMint",
    "SoldInstantSale",
    "StoppedMintingForEditions",
    "Transferred",
    RELAY_FUTURE_ADDED_VALUE,
  ]);

export default ALL_TRANSACTION_TYPES;
