import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import usersForExploreConnectionResolver from "src/resolvers/query/nested/usersForExploreConnectionResolver";
import UsersForExploreInputGqlType from "src/schema/input/UsersForExploreInputGqlType";
import UserAndMetadataAccountsConnectionGqlType from "src/schema/object/pagination/UserAndMetadataAccountsConnectionGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  UserAndMetadataAccountsConnection,
  UsersForExploreInput,
} from "src/__generated__/generated";

const UsersForExploreResponseGqlType = new GraphQLObjectType({
  fields: {
    users: {
      args: {
        // Connection-specific
        after: { type: GraphQLString },
        first: { type: gqlNonNull(GraphQLInt) },

        // Application-specific
        input: { type: gqlNonNull(UsersForExploreInputGqlType) },
      },
      async resolve(
        _source,
        {
          after,
          first,
          input,
        }: {
          after?: Maybe<string>;
          first?: number;
          input?: UsersForExploreInput;
        },
        context: MyContext
      ): Promise<UserAndMetadataAccountsConnection> {
        return logErrorsForResolver(context.req, () =>
          usersForExploreConnectionResolver(
            context,
            after ?? null,
            first!,
            input!
          )
        );
      },
      type: gqlNonNull(UserAndMetadataAccountsConnectionGqlType),
    },
  },
  name: Typename.UsersForExploreResponse,
});

export default UsersForExploreResponseGqlType;
