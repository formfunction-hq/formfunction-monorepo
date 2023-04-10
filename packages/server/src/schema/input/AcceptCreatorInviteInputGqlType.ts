import { GraphQLInputObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const AcceptCreatorInviteInputGqlType = new GraphQLInputObjectType({
  fields: {
    inviteLinkToken: {
      type: gqlNonNull(GraphQLString),
    },
    username: {
      type: gqlNonNull(GraphQLString),
    },
  },
  name: Typename.AcceptCreatorInviteInput,
});

export default AcceptCreatorInviteInputGqlType;
