import { GraphQLInputObjectType, GraphQLString } from "graphql";
import PaginationAmountGqlType from "src/schema/scalar/PaginationAmountGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const UserSearchInputGqlType = new GraphQLInputObjectType({
  fields: {
    first: { type: gqlNonNull(PaginationAmountGqlType) },
    usernameOrUserId: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.UserSearchInput,
});

export default UserSearchInputGqlType;
