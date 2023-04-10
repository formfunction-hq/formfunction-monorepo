import { GraphQLObjectType } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import createCommentForPostResolver from "src/resolvers/mutation/comments/createCommentForPostResolver";
import deleteCommentForPostResolver from "src/resolvers/mutation/comments/deleteCommentForPostResolver";
import CreateCommentForPostInputGqlType from "src/schema/input/comments/CreateCommentForPostInputGqlType";
import DeleteCommentForPostInputGqlType from "src/schema/input/comments/DeleteCommentForPostInputGqlType";
import CreateCommentForPostResponseGqlType from "src/schema/object/response/comments/CreateCommentForPostResponseGqlType";
import DeleteCommentForPostResponseGqlType from "src/schema/object/response/comments/DeleteCommentForPostResponseGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  CreateCommentForPostInput,
  CreateCommentForPostResponse,
  DeleteCommentForPostInput,
  DeleteCommentForPostResponse,
} from "src/__generated__/generated";

const CommentMutationsMutationResponseGqlType = new GraphQLObjectType({
  fields: {
    createCommentForPost: {
      args: {
        input: { type: gqlNonNull(CreateCommentForPostInputGqlType) },
      },
      async resolve(
        _source,
        {
          input,
        }: {
          input: CreateCommentForPostInput;
        },
        context: MyContext
      ): Promise<CreateCommentForPostResponse> {
        return logErrorsForResolver(context.req, () =>
          createCommentForPostResolver(context, input)
        );
      },
      type: gqlNonNull(CreateCommentForPostResponseGqlType),
    },
    deleteCommentForPost: {
      args: {
        input: { type: gqlNonNull(DeleteCommentForPostInputGqlType) },
      },
      async resolve(
        _source,
        {
          input,
        }: {
          input: DeleteCommentForPostInput;
        },
        context: MyContext
      ): Promise<DeleteCommentForPostResponse> {
        return logErrorsForResolver(context.req, () =>
          deleteCommentForPostResolver(context, input)
        );
      },

      type: gqlNonNull(DeleteCommentForPostResponseGqlType),
    },
  },
  name: Typename.CommentMutationsMutationResponse,
});

export default CommentMutationsMutationResponseGqlType;
