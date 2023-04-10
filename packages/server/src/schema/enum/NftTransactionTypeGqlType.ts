import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

/**
 * IMPORTANT: keep values in sync with the NftTransactionType DB table.
 */
const NftTransactionTypeGqlType = new GraphQLEnumType({
  name: Typename.NftTransactionType,
  values: {
    AuctionWon: {},
    Bid: {},
    Burned: {},
    ChangePriceForEditions: {},
    ClaimedPnft: {},
    // These do not map to values in the NftTransactionType DB table, and should not
    // be displayed in our UI. They are for importing purposes only.
    HolaplexRedeemBid: {},
    HolaplexRedeemFullRightsTransferBid: {},
    HolaplexRedeemPrintingV2Bid: {},
    Imported: {},
    Listed: {},
    ListedEditions: {},
    ListedInstantSale: {},
    ListingCancelled: {},
    Minted: {},
    Offer: {},
    // NOTE: not inserted into our DB
    OfferCancelled: {},
    Refunded: {},
    Sold: {},
    SoldAcceptedOffer: {},
    SoldEditionPrimary: {},
    SoldGenerativeMint: {},
    SoldInstantSale: {},
    StoppedMintingForEditions: {},
    Transferred: {},
  },
});

export default NftTransactionTypeGqlType;
