import {
  GraphQLInputObjectType,
  GraphQLInputType,
  GraphQLString,
} from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

const SendCreatorInvitesInputGqlType = new GraphQLInputObjectType({
  fields: {
    emails: {
      description: "List of emails to send email invites to",
      type: gqlNonNullListOfNonNull(GraphQLString) as GraphQLInputType,
    },
    userIdsOrUsernames: {
      description:
        "User IDs or usernames to be used for converting existing users to creators using an invite",
      type: gqlNonNullListOfNonNull(GraphQLString) as GraphQLInputType,
    },
  },
  name: Typename.SendCreatorInvitesInput,
});

export default SendCreatorInvitesInputGqlType;
