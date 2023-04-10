import { GraphQLInt, GraphQLObjectType } from "graphql";
import EditionsMerkleAllowlistInfoGqlType from "src/schema/object/nft/EditionsMerkleAllowlistInfoGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const EditionBuyerInfoResponseGqlType = new GraphQLObjectType({
  fields: {
    merkleAllowlistInfo: {
      type: EditionsMerkleAllowlistInfoGqlType,
    },
    numberBought: {
      description:
        "Total number of editions purchased (includes both allowlist and public sale phases)",
      type: gqlNonNull(GraphQLInt),
    },
  },
  name: Typename.EditionBuyerInfoResponse,
});

export default EditionBuyerInfoResponseGqlType;
