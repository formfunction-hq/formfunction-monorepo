import { GraphQLObjectType } from "graphql";
import IPostGqlType, { IPOST_FIELDS } from "src/schema/interface/IPostGqlType";
import NftAssetGqlType from "src/schema/object/NftAssetGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const PostWithAirdropGqlType = new GraphQLObjectType({
  description: "Post associated with an airdrop",
  fields: {
    ...IPOST_FIELDS,
    nftAsset: { type: gqlNonNull(NftAssetGqlType) },
  },
  interfaces: [IPostGqlType],
  name: Typename.PostWithAirdrop,
});

export default PostWithAirdropGqlType;
