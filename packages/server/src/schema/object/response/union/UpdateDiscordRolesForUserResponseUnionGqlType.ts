import { GraphQLUnionType } from "graphql";
import UpdateDiscordRolesForUserResponseSuccessGqlType from "src/schema/object/response/UpdateDiscordRolesForUserResponseSuccessGqlType";
import UpdateDiscordRolesForUserResponseFailureGqlType from "src/schema/object/response/UpdateDiscordRolesForUserResponseFailureGqlType";
import Typename from "src/types/enums/Typename";

const UpdateDiscordRolesForUserResponseUnionGqlType = new GraphQLUnionType({
  description:
    "Adds any applicable Discord roles to a user and returns all the role IDs they have afterwards.",
  name: Typename.UpdateDiscordRolesForUserResponse,
  types: [
    UpdateDiscordRolesForUserResponseSuccessGqlType,
    UpdateDiscordRolesForUserResponseFailureGqlType,
  ],
});

export default UpdateDiscordRolesForUserResponseUnionGqlType;
