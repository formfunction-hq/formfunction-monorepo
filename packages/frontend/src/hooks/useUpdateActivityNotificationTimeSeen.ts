import graphql from "babel-plugin-relay/macro";
import dayjs from "utils/dates/dayjsex";
import {
  useUpdateActivityNotificationTimeSeenMutation,
  useUpdateActivityNotificationTimeSeenMutation$data,
} from "hooks/__generated__/useUpdateActivityNotificationTimeSeenMutation.graphql";
import { useInView } from "react-intersection-observer";
import { useMutation } from "react-relay";
import logError from "utils/analytics/logError";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import { RecordSourceSelectorProxy } from "relay-runtime";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import useViewerId from "hooks/useViewerId";

/**
 * We perform this update so that the unseen indicator on each ActivityNotification
 * goes away when you view the notif.
 */
function updateTimeSeen(
  store: RecordSourceSelectorProxy<useUpdateActivityNotificationTimeSeenMutation$data>,
  activityNotificationId: string
) {
  const activityNotif = store.get(activityNotificationId);
  if (activityNotif == null) {
    logError(
      AnalyticsEvent.RelayUpdaterError,
      "activityNotif was null in useUpdateActivityNotificationTimeSeen Relay store update but it should not be",
      { activityNotificationId }
    );
    return;
  }

  activityNotif.setValue(dayjs().toString(), "timeSeen");
}

/**
 * We perform this update so that the unseen count on the ActivityButton updates
 * when you view notifs.
 */
function updateUnseenCount(
  store: RecordSourceSelectorProxy<useUpdateActivityNotificationTimeSeenMutation$data>,
  activityNotificationId: string,
  viewerId: MaybeUndef<string>
) {
  const root = store.getRoot();
  const unseenActivityNotificationsCountForViewer = root
    .getLinkedRecord("NotificationsNamespace")
    ?.getLinkedRecord("unseenActivityNotificationsCountForViewer", {
      input: {
        viewerId,
      },
    });
  if (unseenActivityNotificationsCountForViewer == null) {
    logError(
      AnalyticsEvent.RelayUpdaterError,
      "unseenActivityNotificationsCountForViewer was null in useUpdateActivityNotificationTimeSeen Relay store update but it should not be",
      { activityNotificationId }
    );
    return;
  }

  // TODO: since the set and get are not atomic, I think this is suspectible to race conditions
  const newCount = Math.max(
    Number(
      unseenActivityNotificationsCountForViewer.getValue(
        "unseenActivityNotificationsCount"
      )
    ) - 1,
    // TODO: this is to prevent the count from going negative. Not actually sure why this is happening,
    // so this is a temp fix
    0
  );
  unseenActivityNotificationsCountForViewer.setValue(
    newCount,
    "unseenActivityNotificationsCount"
  );
}

const mutation = graphql`
  mutation useUpdateActivityNotificationTimeSeenMutation(
    $set: ActivityNotification_set_input!
    $pkColumns: ActivityNotification_pk_columns_input!
  ) {
    update_ActivityNotification_by_pk(_set: $set, pk_columns: $pkColumns) {
      __typename
    }
  }
`;

export default function useUpdateActivityNotificationTimeSeen(
  activityNotificationId: string,
  shouldUpdate: boolean
) {
  const viewerId = useViewerId();
  const [commit] =
    useMutation<useUpdateActivityNotificationTimeSeenMutation>(mutation);

  const { ref } = useInView({
    onChange: (inView) => {
      if (!inView || !shouldUpdate) {
        return;
      }

      commit({
        updater: (store) => {
          updateUnseenCount(store, activityNotificationId, viewerId);
          updateTimeSeen(store, activityNotificationId);
        },
        variables: {
          pkColumns: {
            id: activityNotificationId,
          },
          set: {
            timeSeen: dayjs().toString(),
          },
        },
      });
    },
    threshold: 1,
    triggerOnce: true,
  });

  return ref;
}
