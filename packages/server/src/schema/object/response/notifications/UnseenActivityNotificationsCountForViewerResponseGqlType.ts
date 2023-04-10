import { GraphQLInt, GraphQLObjectType } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const UnseenActivityNotificationsCountForViewerResponseGqlType =
  new GraphQLObjectType({
    fields: {
      unseenActivityNotificationsCount: {
        type: gqlNonNull(GraphQLInt),
      },
    },
    name: Typename.UnseenActivityNotificationsCountForViewerResponse,
  });

export default UnseenActivityNotificationsCountForViewerResponseGqlType;
