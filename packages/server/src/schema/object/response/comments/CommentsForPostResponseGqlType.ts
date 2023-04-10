import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { GraphQLObjectType } from "graphql";
import DEFAULT_CONNECTION_PARAMS_V2 from "src/constants/graphql/DefaultConnectionParamsV2";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import commentsForPostConnectionResolver from "src/resolvers/query/nested/comments/commentsForPostConnectionResolver";
import CommentsForPostInputGqlType from "src/schema/input/comments/CommentsForPostInputGqlType";
import CommentsConnectionGqlType from "src/schema/object/pagination/CommentsConnectionGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  CommentsConnection,
  CommentsForPostInput,
} from "src/__generated__/generated";

const CommentsForPostResponseGqlType = new GraphQLObjectType({
  fields: {
    comments: {
      args: {
        ...DEFAULT_CONNECTION_PARAMS_V2,
        input: { type: gqlNonNull(CommentsForPostInputGqlType) },
      },
      async resolve(
        _source,
        {
          after,
          first,
          input,
        }: { after: Maybe<string>; first: number; input: CommentsForPostInput },
        context: MyContext
      ): Promise<CommentsConnection> {
        return logErrorsForResolver(context.req, () =>
          commentsForPostConnectionResolver(context, after, first, input)
        );
      },
      type: gqlNonNull(CommentsConnectionGqlType),
    },
  },
  name: Typename.CommentsForPostResponse,
});

export default CommentsForPostResponseGqlType;
