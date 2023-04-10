import { GraphQLObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const UpdateDiscordRolesForUserResponseFailureGqlType = new GraphQLObjectType({
  fields: {
    reason: {
      type: gqlNonNull(GraphQLString),
    },
  },
  name: Typename.UpdateDiscordRolesForUserResponseFailure,
});

export default UpdateDiscordRolesForUserResponseFailureGqlType;
