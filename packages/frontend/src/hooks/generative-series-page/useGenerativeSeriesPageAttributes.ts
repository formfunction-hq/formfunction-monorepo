import graphql from "babel-plugin-relay/macro";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import {
  AttributesForSeriesInput,
  useGenerativeSeriesPageAttributesQuery,
} from "hooks/generative-series-page/__generated__/useGenerativeSeriesPageAttributesQuery.graphql";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";

export const generativeSeriesAttributesQuery = graphql`
  query useGenerativeSeriesPageAttributesQuery(
    $input: AttributesForSeriesInput!
  ) {
    attributesForSeries(input: $input) {
      ...GenerativeSeriesFilters_AttributesForSeriesResponse
    }
  }
`;

export default function useGenerativeSeriesPageAttributes(
  userId: MaybeUndef<string>,
  username: MaybeUndef<string>,
  seriesSlug: string
) {
  const input: AttributesForSeriesInput = useMemo(
    () => ({
      // If username is populated, we don't care about creatorId
      creatorId: !isEmptyString(username) ? undefined : userId ?? "",
      creatorUsername: username,
      seriesSlug,
    }),
    [userId, username, seriesSlug]
  );

  const initialQueryRef = useMemo(
    () =>
      loadQuery<useGenerativeSeriesPageAttributesQuery>(
        RelayEnvironment,
        generativeSeriesAttributesQuery,
        {
          input,
        }
      ),
    [input]
  );

  const [attributesQueryRef, loadAttributesQuery] =
    useQueryLoader<useGenerativeSeriesPageAttributesQuery>(
      generativeSeriesAttributesQuery,
      initialQueryRef
    );

  useEffect(() => {
    loadAttributesQuery({
      input,
    });
  }, [input, loadAttributesQuery]);

  return attributesQueryRef;
}
