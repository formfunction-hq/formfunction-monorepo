import { GraphQLObjectType } from "graphql";
import IPostGqlType, { IPOST_FIELDS } from "src/schema/interface/IPostGqlType";
import AssetGqlType from "src/schema/object/AssetGqlType";
import PollGqlType from "src/schema/object/posts/PollGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const PostWithPollGqlType = new GraphQLObjectType({
  description: "Post with a poll",
  fields: {
    ...IPOST_FIELDS,
    asset: {
      type: AssetGqlType,
    },
    poll: { type: gqlNonNull(PollGqlType) },
  },
  interfaces: [IPostGqlType],
  name: Typename.PostWithPoll,
});

export default PostWithPollGqlType;
