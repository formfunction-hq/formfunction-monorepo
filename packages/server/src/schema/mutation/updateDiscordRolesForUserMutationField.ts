import { GraphQLFieldConfig } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import updateDiscordRolesForUserResolver from "src/resolvers/mutation/updateDiscordRolesForUserResolver";
import UpdateDiscordRolesForUserResponseGqlType from "src/schema/object/response/union/UpdateDiscordRolesForUserResponseUnionGqlType";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import { UpdateDiscordRolesForUserResponse } from "src/__generated__/generated";

const updateDiscordRolesForUserMutationField: GraphQLFieldConfig<unknown, any> =
  {
    async resolve(
      _source,
      _input,
      context: MyContext
    ): Promise<UpdateDiscordRolesForUserResponse> {
      return logErrorsForResolver(context.req, () =>
        updateDiscordRolesForUserResolver(context)
      );
    },
    type: gqlNonNull(UpdateDiscordRolesForUserResponseGqlType),
  };

export default updateDiscordRolesForUserMutationField;
