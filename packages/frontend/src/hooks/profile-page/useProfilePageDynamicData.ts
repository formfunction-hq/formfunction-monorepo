import graphql from "babel-plugin-relay/macro";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";
import { useProfilePageDynamicDataQuery } from "hooks/profile-page/__generated__/useProfilePageDynamicDataQuery.graphql";
import getSeriesQueryArgs from "utils/series/getSeriesQueryArgs";

export const profilePageDynamicDataQuery = graphql`
  query useProfilePageDynamicDataQuery(
    $where: User_bool_exp!
    $seriesWhere: Series_bool_exp!
    $seriesOrderBy: [Series_order_by!]
  ) {
    User(where: $where) {
      ...ProfilePageForUser_User
    }

    ...ProfilePageForUserSeries_Query
  }
`;

export default function useProfilePageDynamicData(username: string) {
  const initialQueryRef = useMemo(
    () =>
      loadQuery<useProfilePageDynamicDataQuery>(
        RelayEnvironment,
        profilePageDynamicDataQuery,
        {
          ...getSeriesQueryArgs(username),
          where: {
            _or: [
              {
                username: {
                  _eq: username,
                },
              },
              {
                id: {
                  _eq: username,
                },
              },
            ],
          },
        }
      ),
    [username]
  );

  const [profilePageDynamicDataQueryRef, loadProfilePageDynamicDataQuery] =
    useQueryLoader<useProfilePageDynamicDataQuery>(
      profilePageDynamicDataQuery,
      initialQueryRef
    );

  useEffect(() => {
    loadProfilePageDynamicDataQuery({
      ...getSeriesQueryArgs(username),
      where: {
        _or: [
          {
            username: {
              _eq: username,
            },
          },
          {
            id: {
              _eq: username,
            },
          },
        ],
      },
    });
  }, [loadProfilePageDynamicDataQuery, username]);

  return profilePageDynamicDataQueryRef;
}
