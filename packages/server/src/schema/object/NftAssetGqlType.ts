import { GraphQLObjectType, GraphQLString } from "graphql";
import AssetGqlType from "src/schema/object/AssetGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const NftAssetNftInfoGqlType = new GraphQLObjectType({
  fields: {
    mint: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.NftAssetNftInfo,
});

const NftAssetGqlType = new GraphQLObjectType({
  fields: {
    asset: { type: gqlNonNull(AssetGqlType) },
    nftInfo: { type: gqlNonNull(NftAssetNftInfoGqlType) },
  },
  name: Typename.NftAsset,
});

export default NftAssetGqlType;
