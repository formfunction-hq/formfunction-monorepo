import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const EditionsMerkleAllowlistInfoGqlType = new GraphQLObjectType({
  fields: {
    amountAllowed: { type: gqlNonNull(GraphQLInt) },
    amountMinted: { type: gqlNonNull(GraphQLInt) },
    id: { type: gqlNonNull(GraphQLID) },
    proof: { type: gqlNonNull(GraphQLString) },
    rootIndex: { type: gqlNonNull(GraphQLInt) },
  },
  name: Typename.EditionsMerkleAllowlistInfo,
});

export default EditionsMerkleAllowlistInfoGqlType;
