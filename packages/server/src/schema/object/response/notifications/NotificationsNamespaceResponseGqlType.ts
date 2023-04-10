import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import { GraphQLObjectType } from "graphql";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import unseenActivityNotificationsCountForViewerResolver from "src/resolvers/query/nested/notifications/unseenActivityNotificationsCountForViewerResolver";
import UnseenActivityNotificationsCountForViewerInputGqlType from "src/schema/input/notifications/UnseenActivityNotificationsCountForViewerInputGqlType";
import ActivityNotificationsForViewerResponseGqlType from "src/schema/object/response/notifications/ActivityNotificationsForViewerResponseGqlType";
import UnseenActivityNotificationsCountForViewerResponseGqlType from "src/schema/object/response/notifications/UnseenActivityNotificationsCountForViewerResponseGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  UnseenActivityNotificationsCountForViewerInput,
  UnseenActivityNotificationsCountForViewerResponse,
} from "src/__generated__/generated";

const NotificationsNamespaceResponseGqlType = new GraphQLObjectType({
  fields: {
    activityNotificationsForViewer: {
      resolve: () => ({}),
      type: gqlNonNull(ActivityNotificationsForViewerResponseGqlType),
    },
    unseenActivityNotificationsCountForViewer: {
      args: {
        // TODO[@arcticmatt]: make input required once all clients have switched to passing up the input
        input: { type: UnseenActivityNotificationsCountForViewerInputGqlType },
      },
      async resolve(
        _source,
        {
          input,
        }: {
          input: MaybeUndef<UnseenActivityNotificationsCountForViewerInput>;
        },
        context: MyContext
      ): Promise<UnseenActivityNotificationsCountForViewerResponse> {
        return logErrorsForResolver(context.req, () =>
          unseenActivityNotificationsCountForViewerResolver(
            context,
            input ?? null
          )
        );
      },
      type: gqlNonNull(
        UnseenActivityNotificationsCountForViewerResponseGqlType
      ),
    },
  },
  name: Typename.NotificationsNamespaceResponse,
});

export default NotificationsNamespaceResponseGqlType;
