import { GraphQLObjectType } from "graphql";
import UserGqlType from "src/schema/object/UserGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

const UserSearchResponseGqlType = new GraphQLObjectType({
  fields: {
    users: { type: gqlNonNullListOfNonNull(UserGqlType) },
  },
  name: Typename.UserSearchResponse,
});

export default UserSearchResponseGqlType;
