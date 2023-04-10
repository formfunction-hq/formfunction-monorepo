import graphql from "babel-plugin-relay/macro";
import { ActivityButtonIndicatorQuery } from "components/activity/__generated__/ActivityButtonIndicatorQuery.graphql";
import styles from "css/activity/ActivityButtonIndicator.module.css";
import useViewerId from "hooks/useViewerId";
import { Suspense } from "react";
import { useLazyLoadQuery } from "react-relay";
import joinClasses from "utils/joinClasses";

const MAX_UNSEEN_NOTIF_COUNT = 9;

const query = graphql`
  query ActivityButtonIndicatorQuery(
    $input: UnseenActivityNotificationsCountForViewerInput!
  ) {
    NotificationsNamespace {
      unseenActivityNotificationsCountForViewer(input: $input) {
        unseenActivityNotificationsCount
      }
    }
  }
`;

function Inner() {
  const viewerId = useViewerId();
  const data = useLazyLoadQuery<ActivityButtonIndicatorQuery>(query, {
    input: {
      viewerId,
    },
  });
  const count =
    data.NotificationsNamespace.unseenActivityNotificationsCountForViewer
      .unseenActivityNotificationsCount;
  const overMaxUnseenNotifCount = count > MAX_UNSEEN_NOTIF_COUNT;

  return count === 0 ? null : (
    <div
      className={joinClasses(
        styles.indicator,
        overMaxUnseenNotifCount ? styles.indicatorWide : null
      )}
    >
      <div className={styles.indicatorCount}>
        {Math.min(count, MAX_UNSEEN_NOTIF_COUNT)}
        {overMaxUnseenNotifCount ? "+" : ""}
      </div>
    </div>
  );
}

export default function ActivityButtonIndicator() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  );
}
