import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const CandyMachineTokenAllowlistInfoForViewerGqlType = new GraphQLObjectType({
  fields: {
    allowlistTokenAccount: {
      description:
        "The viewer's token account for the allowlist mint. If the viewer has multiple " +
        "token accounts for the same mint, this field may differ over time for the same viewer.",
      type: GraphQLString,
    },
    allowlistTokenAmount: {
      description: "How many tokens the viewer owns.",
      type: gqlNonNull(GraphQLInt),
    },
    allowlistTokenMint: { type: gqlNonNull(GraphQLString) },
    amountMinted: {
      description: "How many NFTs the viewer minted in the allowlist phase.",
      type: gqlNonNull(GraphQLInt),
    },
  },
  name: Typename.CandyMachineTokenAllowlistInfoForViewer,
});

export default CandyMachineTokenAllowlistInfoForViewerGqlType;
