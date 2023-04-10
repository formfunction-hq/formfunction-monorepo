import { GraphQLID, GraphQLInputObjectType } from "graphql";
import Typename from "src/types/enums/Typename";

const UnseenActivityNotificationsCountForViewerInputGqlType =
  new GraphQLInputObjectType({
    fields: {
      viewerId: {
        type: GraphQLID,
      },
    },
    name: Typename.UnseenActivityNotificationsCountForViewerInput,
  });

export default UnseenActivityNotificationsCountForViewerInputGqlType;
