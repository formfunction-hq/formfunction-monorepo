import graphql from "babel-plugin-relay/macro";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import { useSeriesPageSeriesInfoQuery } from "hooks/series-page/__generated__/useSeriesPageSeriesInfoQuery.graphql";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import SeriesType_enum from "types/relay/SeriesType_enum";
import RelayEnvironment from "utils/relay/RelayEnvironment";

export const seriesInfoQuery = graphql`
  query useSeriesPageSeriesInfoQuery(
    $userId: String
    $username: String
    $seriesSlug: String!
    $type: SeriesType_enum!
  ) {
    User(
      where: {
        _or: [{ id: { _eq: $userId } }, { username: { _eq: $username } }]
      }
    ) {
      # eslint-disable-next-line relay/unused-fields
      id

      ...SeriesPageContents_User
    }

    Series(
      where: {
        _or: [
          {
            _and: {
              creatorId: { _eq: $userId }
              slug: { _eq: $seriesSlug }
              type: { _eq: $type }
            }
          }
          {
            _and: {
              Creator: { username: { _eq: $username } }
              slug: { _eq: $seriesSlug }
              type: { _eq: $type }
            }
          }
        ]
      }
    ) {
      # eslint-disable-next-line relay/unused-fields
      id
      # TODO[@][Relay]: Consider refactoring to use a fragment.
      # eslint-disable-next-line relay/unused-fields
      name
      # eslint-disable-next-line relay/unused-fields
      creatorId
      # eslint-disable-next-line relay/unused-fields
      Creator {
        username
      }

      ...GenerativeSeriesPageContent_Series
      ...SeriesPageContents_Series
    }
  }
`;

export default function useSeriesPageSeriesInfo(
  seriesSlug: string,
  username: MaybeUndef<string>,
  userId: MaybeUndef<string>,
  type: SeriesType_enum = "UserCurated"
) {
  const input = useMemo(
    () => ({
      seriesSlug,

      type,
      // If username is populated, we don't care about userId
      userId: !isEmptyString(username) ? "" : userId ?? "",
      username: username || "",
    }),
    [seriesSlug, type, userId, username]
  );

  const initialQueryRef = useMemo(
    () =>
      loadQuery<useSeriesPageSeriesInfoQuery>(
        RelayEnvironment,
        seriesInfoQuery,
        input
      ),
    [input]
  );

  const [seriesInfoQueryRef, loadSeriesInfoQuery] =
    useQueryLoader<useSeriesPageSeriesInfoQuery>(
      seriesInfoQuery,
      initialQueryRef
    );

  useEffect(() => {
    loadSeriesInfoQuery(input);
  }, [input, loadSeriesInfoQuery]);

  return seriesInfoQueryRef;
}
