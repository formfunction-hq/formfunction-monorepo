import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import { ActivityNotificationsConnection } from "src/__generated__/generated";
import ActivityNotificationsConnectionGqlType from "src/schema/object/pagination/ActivityNotificationsConnectionGqlType";
import activityNotificationsForViewerConnectionResolver from "src/resolvers/query/nested/notifications/activityNotificationsForViewerConnectionResolver";

const ActivityNotificationsForViewerResponseGqlType = new GraphQLObjectType({
  fields: {
    activityNotifications: {
      args: {
        // Connection-specific
        after: { type: GraphQLString },
        first: { type: gqlNonNull(GraphQLInt) },
      },
      async resolve(
        _source,
        {
          after,
          first,
        }: {
          after?: Maybe<string>;
          first: number;
        },
        context: MyContext
      ): Promise<ActivityNotificationsConnection> {
        return logErrorsForResolver<ActivityNotificationsConnection>(
          context.req,
          () =>
            activityNotificationsForViewerConnectionResolver(
              context,
              after ?? null,
              first
            )
        );
      },
      type: gqlNonNull(ActivityNotificationsConnectionGqlType),
    },
  },
  name: Typename.ActivityNotificationsForViewerResponse,
});

export default ActivityNotificationsForViewerResponseGqlType;
