import graphql from "babel-plugin-relay/macro";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";
import { useProfilePageDataQuery } from "hooks/profile-page/__generated__/useProfilePageDataQuery.graphql";
import getSeriesQueryArgs from "utils/series/getSeriesQueryArgs";

export const profilePageDataQuery = graphql`
  query useProfilePageDataQuery(
    $userId: String!
    $seriesWhere: Series_bool_exp!
    $seriesOrderBy: [Series_order_by!]
  ) {
    User_by_pk(id: $userId) {
      # eslint-disable-next-line relay/unused-fields
      id

      ...ProfilePageForUser_User
    }

    ...ProfilePageForUserSeries_Query
  }
`;

export default function useProfilePageData(userId: string) {
  const initialQueryRef = useMemo(
    () =>
      loadQuery<useProfilePageDataQuery>(
        RelayEnvironment,
        profilePageDataQuery,
        {
          userId,
          ...getSeriesQueryArgs(userId),
        }
      ),
    [userId]
  );

  const [profilePageDataQueryRef, loadProfilePageDataQuery] =
    useQueryLoader<useProfilePageDataQuery>(
      profilePageDataQuery,
      initialQueryRef
    );

  useEffect(() => {
    loadProfilePageDataQuery({
      userId,
      ...getSeriesQueryArgs(userId),
    });
  }, [loadProfilePageDataQuery, userId]);

  return profilePageDataQueryRef;
}
