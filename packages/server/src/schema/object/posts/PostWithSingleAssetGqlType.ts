import { GraphQLObjectType } from "graphql";
import IPostGqlType, { IPOST_FIELDS } from "src/schema/interface/IPostGqlType";
import AssetGqlType from "src/schema/object/AssetGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const PostWithSingleAssetGqlType = new GraphQLObjectType({
  description: "Post with a single asset attachment",
  fields: {
    ...IPOST_FIELDS,
    asset: {
      type: gqlNonNull(AssetGqlType),
    },
  },
  interfaces: [IPostGqlType],
  name: Typename.PostWithSingleAsset,
});

export default PostWithSingleAssetGqlType;
