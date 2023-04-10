import { GraphQLObjectType } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import createReactionForPostResolver from "src/resolvers/mutation/reactions/createReactionForPostResolver";
import deleteReactionForPostResolver from "src/resolvers/mutation/reactions/deleteReactionForPostResolver";
import CreateReactionForPostInputGqlType from "src/schema/input/reactions/CreateReactionForPostInputGqlType";
import DeleteReactionForPostInputGqlType from "src/schema/input/reactions/DeleteReactionForPostInputGqlType";
import CreateReactionForPostResponseGqlType from "src/schema/object/response/reactions/CreateReactionForPostResponseGqlType";
import DeleteReactionForPostResponseGqlType from "src/schema/object/response/reactions/DeleteReactionForPostResponseGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  CreateReactionForPostInput,
  CreateReactionForPostResponse,
  DeleteReactionForPostInput,
  DeleteReactionForPostResponse,
} from "src/__generated__/generated";

const ReactionMutationsMutationResponseGqlType = new GraphQLObjectType({
  fields: {
    createReactionForPost: {
      args: {
        input: { type: gqlNonNull(CreateReactionForPostInputGqlType) },
      },
      async resolve(
        _source,
        {
          input,
        }: {
          input: CreateReactionForPostInput;
        },
        context: MyContext
      ): Promise<CreateReactionForPostResponse> {
        return logErrorsForResolver(context.req, () =>
          createReactionForPostResolver(context, input)
        );
      },
      type: gqlNonNull(CreateReactionForPostResponseGqlType),
    },
    deleteReactionForPost: {
      args: {
        input: { type: gqlNonNull(DeleteReactionForPostInputGqlType) },
      },
      async resolve(
        _source,
        {
          input,
        }: {
          input: DeleteReactionForPostInput;
        },
        context: MyContext
      ): Promise<DeleteReactionForPostResponse> {
        return logErrorsForResolver(context.req, () =>
          deleteReactionForPostResolver(context, input)
        );
      },
      type: gqlNonNull(DeleteReactionForPostResponseGqlType),
    },
  },
  name: Typename.ReactionMutationsMutationResponse,
});

export default ReactionMutationsMutationResponseGqlType;
