import graphql from "babel-plugin-relay/macro";
import { SERIES_PAGE_NFTS_PAGE_SIZE } from "constants/PageSizes";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import { useSeriesPageMetadataAccountsQuery } from "hooks/series-page/__generated__/useSeriesPageMetadataAccountsQuery.graphql";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";

export const seriesMetadataAccountsQuery = graphql`
  query useSeriesPageMetadataAccountsQuery(
    $after: String
    $first: Int!
    $input: MetadataAccountsForSeriesInput!
  ) {
    metadataAccountsForSeries {
      # TODO[@][Relay]: Consider refactoring to use a fragment.
      # eslint-disable-next-line relay/unused-fields
      metadataAccounts(after: $after, first: $first, input: $input)
        @connection(key: "SeriesPage_MetadataAccounts_Query_metadataAccounts") {
        edges {
          node {
            id
          }
        }
      }
    }

    ...useSeriesPageMetadataAccounts_Query
  }
`;

// The names and data being fetched must be kept in sync with the
// usage in ManageSeriesPiecesModal.tsx
// TODO: replace with a fragment using plural directive and use in places
// that pull `Series`
export const seriesMetadataAccountsFragment = graphql`
  fragment useSeriesPageMetadataAccounts_Query on query_root
  @refetchable(queryName: "SeriesPageMetadataAccountsPaginationQuery") {
    # TODO[@][Relay]: Consider refactoring to use a fragment.
    # eslint-disable-next-line relay/unused-fields
    metadataAccountsForSeries {
      metadataAccounts(after: $after, first: $first, input: $input)
        @connection(key: "SeriesPage_MetadataAccounts_Query_metadataAccounts") {
        edges {
          node {
            id
            mint

            nft {
              id
              creatorId
              isOffPlatform
              ownerId

              Series {
                id
              }
            }

            ...GenericNftSearchRow_MetadataAccount
            ...GenericNftSearchDndRow_MetadataAccount
            ...ListingCardForMetadata_MetadataAccount
          }
        }
      }
    }
  }
`;

export default function useSeriesPageMetadataAccounts(
  userId: MaybeUndef<string>,
  username: MaybeUndef<string>,
  seriesSlug: string
) {
  // IMPORTANT: This needs to stay in sync with the input used in ManageSeriesPiecesModal
  const input = useMemo(
    () => ({
      slugInput: {
        // If username is populated, we don't care about creatorId
        creatorId: !isEmptyString(username) ? undefined : userId ?? "",
        creatorUsername: username,
        seriesSlug,
      },
    }),
    [seriesSlug, userId, username]
  );

  const initialQueryRef = useMemo(
    () =>
      loadQuery<useSeriesPageMetadataAccountsQuery>(
        RelayEnvironment,
        seriesMetadataAccountsQuery,
        {
          after: null,
          first: SERIES_PAGE_NFTS_PAGE_SIZE,
          input,
        }
      ),
    [input]
  );

  const [metadataAccountsQueryRef, loadMetadataAccountsQuery] =
    useQueryLoader<useSeriesPageMetadataAccountsQuery>(
      seriesMetadataAccountsQuery,
      initialQueryRef
    );

  useEffect(() => {
    loadMetadataAccountsQuery({
      first: SERIES_PAGE_NFTS_PAGE_SIZE,
      input,
    });
  }, [input, loadMetadataAccountsQuery]);

  return metadataAccountsQueryRef;
}
