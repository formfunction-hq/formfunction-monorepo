import { GraphQLID, GraphQLInputObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const ShareInfoAndSwapForTooniesInputGqlType = new GraphQLInputObjectType({
  fields: {
    email: { type: gqlNonNull(GraphQLString) },
    name: { type: gqlNonNull(GraphQLString) },
    shippingAddress: { type: gqlNonNull(GraphQLString) },
    swapTxid: { type: gqlNonNull(GraphQLID) },
    swappedNftMint: { type: gqlNonNull(GraphQLID) },
  },
  name: Typename.ShareInfoAndSwapForTooniesInput,
});

export default ShareInfoAndSwapForTooniesInputGqlType;
