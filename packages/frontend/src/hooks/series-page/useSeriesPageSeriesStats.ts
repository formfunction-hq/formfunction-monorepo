import graphql from "babel-plugin-relay/macro";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import {
  SeriesStatsInput,
  useSeriesPageSeriesStatsQuery,
} from "hooks/series-page/__generated__/useSeriesPageSeriesStatsQuery.graphql";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";

export const seriesStatsQuery = graphql`
  query useSeriesPageSeriesStatsQuery($input: SeriesStatsInput!) {
    SeriesNamespace {
      ...SeriesStats_SeriesNamespaceResponse
    }
  }
`;

export default function useSeriesPageSeriesStats(
  seriesSlug: string,
  username: MaybeUndef<string>,
  userId: MaybeUndef<string>
) {
  const input: SeriesStatsInput = useMemo(
    () => ({
      // If username is populated, we don't care about userId
      creatorId: !isEmptyString(username) ? null : userId ?? "",
      creatorUsername: username || "",
      seriesSlug,
    }),
    [seriesSlug, userId, username]
  );

  const initialQueryRef = useMemo(
    () =>
      loadQuery<useSeriesPageSeriesStatsQuery>(
        RelayEnvironment,
        seriesStatsQuery,
        { input }
      ),
    [input]
  );

  const [seriesStatsQueryRef, loadSeriesStatsQuery] =
    useQueryLoader<useSeriesPageSeriesStatsQuery>(
      seriesStatsQuery,
      initialQueryRef
    );

  useEffect(() => {
    loadSeriesStatsQuery({ input });
  }, [input, loadSeriesStatsQuery]);

  return seriesStatsQueryRef;
}
