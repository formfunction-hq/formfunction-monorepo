import { GraphQLObjectType } from "graphql";
import UserGqlType from "src/schema/object/UserGqlType";
import Typename from "src/types/enums/Typename";

const UserForIdResponseGqlType = new GraphQLObjectType({
  fields: {
    user: { type: UserGqlType },
  },
  name: Typename.UserForIdResponse,
});

export default UserForIdResponseGqlType;
