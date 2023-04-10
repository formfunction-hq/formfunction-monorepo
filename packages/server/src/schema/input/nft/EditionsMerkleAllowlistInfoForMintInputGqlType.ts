import { GraphQLID, GraphQLInputObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const EditionsMerkleAllowlistInfoForMintInputGqlType =
  new GraphQLInputObjectType({
    fields: {
      mint: { type: gqlNonNull(GraphQLString) },
      viewerId: { type: GraphQLID },
    },
    name: Typename.EditionsMerkleAllowlistInfoForMintInput,
  });

export default EditionsMerkleAllowlistInfoForMintInputGqlType;
