import graphql from "babel-plugin-relay/macro";
import { NFT_TRANSACTIONS_PAGE_SIZE } from "constants/PageSizes";
import { useNftPageOfferTxsQuery } from "hooks/nft-page/__generated__/useNftPageOfferTxsQuery.graphql";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";
import FetchGraphqlVariablesDenylist from "types/enums/FetchGraphqlVariablesDenylist";
import getFetchPolicyForFetchKey from "utils/relay/getFetchPolicyForFetchKey";
import useViewerId from "hooks/useViewerId";

export const offerTxsQuery = graphql`
  query useNftPageOfferTxsQuery(
    $after: String
    $first: Int!
    $input: NftOffersInput!
  ) {
    ...useNftPageOfferTxs_Query
  }
`;

// Keep connection key in sync with getNftOfferTransactionsConnection.ts
export const offerTxsFragment = graphql`
  fragment useNftPageOfferTxs_Query on query_root
  @refetchable(queryName: "NftOfferTransactionsPaginationQuery") {
    # TODO[@][Relay]: Consider refactoring to use a fragment.
    # eslint-disable-next-line relay/unused-fields
    nftOffers {
      nftOffers(after: $after, first: $first, input: $input)
        @connection(key: "NftOffers_Query_nftOffers") {
        __id
        edges {
          node {
            transaction {
              id
              fromAddress
              toAddress
              type

              ...NftOffer_NftTransactionExpress
              ...CancelOfferModal_NftTransactionExpress
            }

            expirationDate
            isValid
          }
        }
      }
    }
  }
`;

export default function useNftPageOfferTxs(mint: string, fetchKey: number) {
  const viewerId = useViewerId();
  const offerTxsInitialQueryRef = useMemo(
    () =>
      loadQuery<useNftPageOfferTxsQuery>(
        RelayEnvironment,
        offerTxsQuery,
        {
          first: NFT_TRANSACTIONS_PAGE_SIZE,
          // If this is updated, make sure to also update getNftOfferTransactionsConnection
          input: { mint, viewerId },
        },
        {
          fetchPolicy: "network-only",
        }
      ),
    [mint, viewerId]
  );

  const [nftOfferTxsQueryRef, loadNftOfferTxsQuery] =
    useQueryLoader<useNftPageOfferTxsQuery>(
      offerTxsQuery,
      offerTxsInitialQueryRef
    );

  useEffect(() => {
    loadNftOfferTxsQuery(
      {
        // @ts-ignore for logging purposes only, it gets ignored in fetchGraphql
        [FetchGraphqlVariablesDenylist.FetchKeyForLogging]: fetchKey,
        first: NFT_TRANSACTIONS_PAGE_SIZE,
        // If this is updated, make sure to also update getNftOfferTransactionsConnection
        input: { mint, viewerId },
      },
      {
        fetchKey,
        fetchPolicy: getFetchPolicyForFetchKey(fetchKey),
      }
    );
  }, [loadNftOfferTxsQuery, mint, fetchKey, viewerId]);

  return nftOfferTxsQueryRef;
}
