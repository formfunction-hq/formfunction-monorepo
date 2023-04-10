import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

const ExploreSortOrderGqlType = new GraphQLEnumType({
  name: Typename.ExploreSortOrder,
  values: {
    AuctionEndEarliest: {},
    AuctionEndLatest: {},
    FewestPieces: {},
    HighestPrice: {},
    LeastRecentlyAddedTo: {},
    LowestPrice: {},
    MostPieces: {},
    MostRecentlyAddedTo: {},
    MostRecentlySold: {},
    NameAscending: {},
    NameDescending: {},
    Newest: {},
    Oldest: {},
    RarityHighest: {},
    RarityLowest: {},
  },
});

export default ExploreSortOrderGqlType;
