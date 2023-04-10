import { GraphQLObjectType } from "graphql";
import CommentGqlType from "src/schema/object/CommentGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const CreateCommentForPostResponseGqlType = new GraphQLObjectType({
  fields: {
    comment: { type: gqlNonNull(CommentGqlType) },
  },
  name: Typename.CreateCommentForPostResponse,
});

export default CreateCommentForPostResponseGqlType;
