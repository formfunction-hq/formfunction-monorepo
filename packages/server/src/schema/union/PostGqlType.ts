import { GraphQLUnionType } from "graphql";
import PostTextOnlyGqlType from "src/schema/object/posts/PostTextOnlyGqlType";
import PostWithAirdropGqlType from "src/schema/object/posts/PostWithAirdropGqlType";
import PostWithPollGqlType from "src/schema/object/posts/PostWithPollGqlType";
import PostWithSingleAssetGqlType from "src/schema/object/posts/PostWithSingleAssetGqlType";
import Typename from "src/types/enums/Typename";

const PostGqlType = new GraphQLUnionType({
  name: Typename.Post,
  types: [
    PostWithSingleAssetGqlType,
    PostTextOnlyGqlType,
    PostWithPollGqlType,
    PostWithAirdropGqlType,
  ],
});

export default PostGqlType;
