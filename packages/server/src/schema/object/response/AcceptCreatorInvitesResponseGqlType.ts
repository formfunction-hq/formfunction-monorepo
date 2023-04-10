import { GraphQLObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const AcceptCreatorInviteResponseGqlType = new GraphQLObjectType({
  fields: {
    username: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.AcceptCreatorInviteResponse,
});

export default AcceptCreatorInviteResponseGqlType;
