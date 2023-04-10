import { GraphQLInputObjectType, GraphQLInt, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const AssetDimensionsGqlType = new GraphQLInputObjectType({
  fields: {
    height: { type: gqlNonNull(GraphQLInt) },
    width: { type: gqlNonNull(GraphQLInt) },
  },
  name: Typename.AssetDimensionsInput,
});

const AssetInputGqlType = new GraphQLInputObjectType({
  fields: {
    arweaveTxid: {
      description:
        "The Arweave txid, non-null if this asset has been (or will be) uploaded to Arweave",
      type: GraphQLString,
    },
    contentType: { type: gqlNonNull(GraphQLString) },
    dimensions: { type: AssetDimensionsGqlType },
    downloadUrl: {
      type: gqlNonNull(GraphQLString),
    },
    path: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.AssetInput,
});

export default AssetInputGqlType;
