import { GraphQLObjectType } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import userForIdResolver from "src/resolvers/query/nested/user/userForIdResolver";
import userSearchResolver from "src/resolvers/query/nested/user/userSearchResolver";
import UserForIdInputGqlType from "src/schema/input/user/UserForIdInputGqlType";
import UserSearchInputGqlType from "src/schema/input/user/UserSearchInputGqlType";
import UserForIdResponseGqlType from "src/schema/object/response/user/UserForIdResponseGqlType";
import UserSearchResponseGqlType from "src/schema/object/response/user/UserSearchResponseGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  UserForIdInput,
  UserForIdResponse,
  UserSearchInput,
  UserSearchResponse,
} from "src/__generated__/generated";

const UserQueriesQueryResponseGqlType = new GraphQLObjectType({
  fields: {
    userForId: {
      args: {
        input: { type: gqlNonNull(UserForIdInputGqlType) },
      },
      async resolve(
        _source,
        { input }: { input: UserForIdInput },
        context: MyContext
      ): Promise<UserForIdResponse> {
        return logErrorsForResolver(context.req, () =>
          userForIdResolver(context, input)
        );
      },
      type: gqlNonNull(UserForIdResponseGqlType),
    },
    userSearch: {
      args: {
        input: { type: gqlNonNull(UserSearchInputGqlType) },
      },
      async resolve(
        _source,
        { input }: { input: UserSearchInput },
        context: MyContext
      ): Promise<UserSearchResponse> {
        return logErrorsForResolver(context.req, () =>
          userSearchResolver(context, input)
        );
      },
      type: gqlNonNull(UserSearchResponseGqlType),
    },
  },
  name: Typename.UserQueriesQueryResponse,
});

export default UserQueriesQueryResponseGqlType;
