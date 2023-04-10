import { GraphQLObjectType, GraphQLID } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

const UpdateDiscordRolesForUserResponseSuccessGqlType = new GraphQLObjectType({
  fields: {
    roleIds: {
      type: gqlNonNullListOfNonNull(GraphQLID),
    },
  },
  name: Typename.UpdateDiscordRolesForUserResponseSuccess,
});

export default UpdateDiscordRolesForUserResponseSuccessGqlType;
