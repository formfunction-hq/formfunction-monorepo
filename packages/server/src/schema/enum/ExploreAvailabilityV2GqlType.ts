import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

const ExploreAvailabilityV2GqlType = new GraphQLEnumType({
  name: Typename.ExploreAvailabilityV2,
  values: {
    Available: {
      description: "Used to show Editions that are available for primary sale.",
    },
    InstantSale: {},
    LiveAuction: {},
    LiveAuctionWithBids: {
      description: "Excludes scheduled auctions that have no bids",
    },
    LiveAuctionWithoutBids: {
      description: "Only shows scheduled auctions that have no bids",
    },
    ReservePrice: {},
    Sold: {},
    SoldOut: { description: "Used to show Editions that have sold out." },
  },
});

export default ExploreAvailabilityV2GqlType;
