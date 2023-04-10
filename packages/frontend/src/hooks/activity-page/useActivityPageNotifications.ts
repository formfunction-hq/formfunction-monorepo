import graphql from "babel-plugin-relay/macro";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";
import { useActivityPageNotificationsQuery } from "hooks/activity-page/__generated__/useActivityPageNotificationsQuery.graphql";
import { ACTIVITY_NOTIFICATIONS_PAGE_SIZE } from "constants/PageSizes";

export const notificationsQuery = graphql`
  query useActivityPageNotificationsQuery($after: String, $first: Int!) {
    ...ActivityNotifications_Query
  }
`;

export default function useActivityPageNotifications() {
  const notificationsInitialQueryRef = useMemo(
    () =>
      loadQuery<useActivityPageNotificationsQuery>(
        RelayEnvironment,
        notificationsQuery,
        {
          first: ACTIVITY_NOTIFICATIONS_PAGE_SIZE,
        },
        {
          fetchPolicy: "network-only",
        }
      ),
    []
  );

  const [notificationsQueryRef, loadNotificationsQuery] =
    useQueryLoader<useActivityPageNotificationsQuery>(
      notificationsQuery,
      notificationsInitialQueryRef
    );

  useEffect(() => {
    loadNotificationsQuery(
      {
        first: ACTIVITY_NOTIFICATIONS_PAGE_SIZE,
      },
      {
        fetchPolicy: "network-only",
      }
    );
  }, [loadNotificationsQuery]);

  return notificationsQueryRef;
}
