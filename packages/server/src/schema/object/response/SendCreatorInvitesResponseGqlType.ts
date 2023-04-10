import { GraphQLObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

const SendCreatorInvitesResponseGqlType = new GraphQLObjectType({
  fields: {
    convertedUserIds: {
      type: gqlNonNullListOfNonNull(GraphQLString),
    },
    sentEmails: {
      type: gqlNonNullListOfNonNull(GraphQLString),
    },
  },
  name: Typename.SendCreatorInvitesResponse,
});

export default SendCreatorInvitesResponseGqlType;
