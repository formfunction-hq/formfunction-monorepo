import { GraphQLID, GraphQLInputObjectType } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const UserForIdInputGqlType = new GraphQLInputObjectType({
  fields: {
    id: { type: gqlNonNull(GraphQLID) },
  },
  name: Typename.UserForIdInput,
});

export default UserForIdInputGqlType;
