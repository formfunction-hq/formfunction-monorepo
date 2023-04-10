import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const CandyMachineMerkleAllowlistInfoForViewerGqlType = new GraphQLObjectType({
  fields: {
    amountAllowed: { type: gqlNonNull(GraphQLInt) },
    amountMinted: {
      description: "How many NFTs the viewer minted in the allowlist phase.",
      type: gqlNonNull(GraphQLInt),
    },
    merkleRootIndexForProof: { type: gqlNonNull(GraphQLInt) },
    proof: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.CandyMachineMerkleAllowlistInfoForViewer,
});

export default CandyMachineMerkleAllowlistInfoForViewerGqlType;
