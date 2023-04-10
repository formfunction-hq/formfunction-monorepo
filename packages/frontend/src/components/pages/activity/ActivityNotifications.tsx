import graphql from "babel-plugin-relay/macro";
import { ActivityNotifications_Query$key } from "components/pages/activity/__generated__/ActivityNotifications_Query.graphql";
import useActivityPageNotifications, {
  notificationsQuery,
} from "hooks/activity-page/useActivityPageNotifications";
import { useActivityPageNotificationsQuery } from "hooks/activity-page/__generated__/useActivityPageNotificationsQuery.graphql";
import {
  PreloadedQuery,
  usePaginationFragment,
  usePreloadedQuery,
} from "react-relay";
import styles from "css/pages/activity/ActivityNotifications.module.css";
import ActivityNotification from "components/pages/activity/ActivityNotification";
import { ACTIVITY_NOTIFICATIONS_PAGE_SIZE } from "constants/PageSizes";
import LoadingSpinner from "components/loading/LoadingSpinner";
import ColorValue from "types/enums/ColorValue";
import useLoadNextOnBottomScroll from "hooks/useLoadNextOnBottomScroll";

const notificationsFragment = graphql`
  fragment ActivityNotifications_Query on query_root
  @refetchable(queryName: "ActivityNotificationsPaginationQuery") {
    NotificationsNamespace {
      activityNotificationsForViewer {
        activityNotifications(after: $after, first: $first)
          @connection(
            key: "ActivityNotifications_Query_activityNotifications"
          ) {
          edges {
            node {
              ... on IActivityNotification {
                id
              }
            }
            ...ActivityNotification_ActivityNotificationsEdge
          }
        }
      }
    }
  }
`;

function FragmentLoader({
  notifications,
}: {
  notifications: ActivityNotifications_Query$key;
}) {
  const {
    data: notificationsData,
    hasNext,
    loadNext,
    isLoadingNext,
  } = usePaginationFragment(notificationsFragment, notifications);

  const notificationElems =
    notificationsData.NotificationsNamespace.activityNotificationsForViewer.activityNotifications.edges.map(
      (edge) => (
        <ActivityNotification
          key={edge.node.id!}
          activityNotificationsEdge={edge}
        />
      )
    );

  useLoadNextOnBottomScroll(
    hasNext && !isLoadingNext,
    loadNext,
    ACTIVITY_NOTIFICATIONS_PAGE_SIZE
  );

  return (
    <div className={styles.notifications}>
      {notificationElems}
      {isLoadingNext && <LoadingSpinner colorValue={ColorValue.BrightPurple} />}
    </div>
  );
}

function QueryLoader({
  notificationsQueryRef,
}: {
  notificationsQueryRef: PreloadedQuery<useActivityPageNotificationsQuery>;
}) {
  const notificationsQueryData = usePreloadedQuery(
    notificationsQuery,
    notificationsQueryRef
  );

  return <FragmentLoader notifications={notificationsQueryData} />;
}

export default function ActivityNotifications() {
  const notificationsQueryRef = useActivityPageNotifications();

  if (notificationsQueryRef == null) {
    return null;
  }

  return <QueryLoader notificationsQueryRef={notificationsQueryRef} />;
}
