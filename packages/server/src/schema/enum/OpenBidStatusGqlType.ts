import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

const OpenBidStatusGqlType = new GraphQLEnumType({
  name: Typename.OpenBidStatus,
  values: {
    HighestBid: {},
    Outbid: {},
    Refund: {},
    Won: {},
  },
});

export default OpenBidStatusGqlType;
