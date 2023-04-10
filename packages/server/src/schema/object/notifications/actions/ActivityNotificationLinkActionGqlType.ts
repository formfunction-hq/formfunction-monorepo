import { GraphQLObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const ActivityNotificationLinkActionGqlType = new GraphQLObjectType({
  fields: {
    href: { type: gqlNonNull(GraphQLString) },
    text: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.ActivityNotificationLinkAction,
});

export default ActivityNotificationLinkActionGqlType;
