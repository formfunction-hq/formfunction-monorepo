import graphql from "babel-plugin-relay/macro";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";
import { useProfilePageMetadataAccountsQuery } from "hooks/profile-page/__generated__/useProfilePageMetadataAccountsQuery.graphql";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { COLLECTED_TAB_PAGE_SIZE } from "constants/PageSizes";

// NOTE: must be leq than the max specified in PaginationAmountGqlType
const CREATED_FIRST = 750;

export const profilePageMetadataAccountsQuery = graphql`
  query useProfilePageMetadataAccountsQuery(
    # For metadataAccountsCollected
    $metadataAccountsCollectedAfter: String
    $metadataAccountsCollectedFirst: Int!
    $metadataAccountsCollectedAndListedAfter: String
    $metadataAccountsCollectedAndListedFirst: Int!
    $metadataAccountsCollectedInput: MetadataAccountsCollectedInput!
    # For metadataAccountsCreated
    $metadataAccountsCreatedAfter: String
    $metadataAccountsCreatedFirst: PaginationAmount!
    $metadataAccountsCreatedInput: MetadataAccountsCreatedInput!
  ) {
    ...ProfilePageForUserMetadataAccounts_Query
    ...ProfilePageForUserMetadataAccountsCollected_Query
    ...ProfilePageForUserMetadataAccountsCollectedAndListed_Query
  }
`;

export default function useProfilePageMetadataAccounts(
  userId: Maybe<string>,
  username: Maybe<string>
) {
  const initialQueryRef = useMemo(
    () =>
      loadQuery<useProfilePageMetadataAccountsQuery>(
        RelayEnvironment,
        profilePageMetadataAccountsQuery,
        {
          metadataAccountsCollectedAfter: null,
          metadataAccountsCollectedAndListedAfter: null,
          metadataAccountsCollectedAndListedFirst: COLLECTED_TAB_PAGE_SIZE,
          metadataAccountsCollectedFirst: COLLECTED_TAB_PAGE_SIZE,
          metadataAccountsCollectedInput: {
            collectorAddress: userId,
            collectorUsername: username,
          },
          metadataAccountsCreatedAfter: null,
          metadataAccountsCreatedFirst: CREATED_FIRST,
          metadataAccountsCreatedInput: {
            creatorAddress: userId,
            creatorUsername: username,
          },
        }
      ),
    [userId, username]
  );

  const [
    profilePageMetadataAccountsQueryRef,
    loadProfilePageMetadataAccountsQuery,
  ] = useQueryLoader<useProfilePageMetadataAccountsQuery>(
    profilePageMetadataAccountsQuery,
    initialQueryRef
  );

  useEffect(() => {
    loadProfilePageMetadataAccountsQuery({
      metadataAccountsCollectedAndListedFirst: COLLECTED_TAB_PAGE_SIZE,
      metadataAccountsCollectedFirst: COLLECTED_TAB_PAGE_SIZE,
      metadataAccountsCollectedInput: {
        collectorAddress: userId,
        collectorUsername: username,
      },
      metadataAccountsCreatedAfter: null,
      metadataAccountsCreatedFirst: CREATED_FIRST,
      metadataAccountsCreatedInput: {
        creatorAddress: userId,
        creatorUsername: username,
      },
    });
  }, [loadProfilePageMetadataAccountsQuery, userId, username]);

  return profilePageMetadataAccountsQueryRef;
}
