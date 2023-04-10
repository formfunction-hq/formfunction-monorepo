import graphql from "babel-plugin-relay/macro";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";
import { useNotificationUserPreferencesQuery } from "hooks/__generated__/useNotificationUserPreferencesQuery.graphql";

export const notificationUserPreferencesQuery = graphql`
  query useNotificationUserPreferencesQuery(
    $where: NotificationUserPreference_bool_exp!
  ) {
    NotificationUserPreference(where: $where) {
      ...ChangeNotificationUserPreferencesModal_NotificationUserPreference
    }
  }
`;

export default function useNotificationUserPreferences(
  userId: string,
  fetchKey: number
) {
  const initialQueryRef = useMemo(
    () =>
      loadQuery<useNotificationUserPreferencesQuery>(
        RelayEnvironment,
        notificationUserPreferencesQuery,
        {
          where: {
            userId: {
              _eq: userId,
            },
          },
        }
      ),
    [userId]
  );

  const [
    notificationUserPreferencesQueryRef,
    loadNotificationUserPreferencesQuery,
  ] = useQueryLoader<useNotificationUserPreferencesQuery>(
    notificationUserPreferencesQuery,
    initialQueryRef
  );

  useEffect(() => {
    loadNotificationUserPreferencesQuery(
      {
        where: {
          userId: {
            _eq: userId,
          },
        },
      },
      {
        fetchPolicy: "network-only",
      }
    );
  }, [loadNotificationUserPreferencesQuery, fetchKey, userId]);

  return notificationUserPreferencesQueryRef;
}
