import graphql from "babel-plugin-relay/macro";
import { useNftPageTxsQuery } from "hooks/nft-page/__generated__/useNftPageTxsQuery.graphql";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";
import FetchGraphqlVariablesDenylist from "types/enums/FetchGraphqlVariablesDenylist";
import getFetchPolicyForFetchKey from "utils/relay/getFetchPolicyForFetchKey";

// Load all
const FIRST = 500;

export const txsQuery = graphql`
  query useNftPageTxsQuery(
    $after: String
    $first: Int!
    $input: NftTransactionsInput!
  ) {
    ...useNftPageTxs_Query
  }
`;

export const txsFragment = graphql`
  fragment useNftPageTxs_Query on query_root
  @refetchable(queryName: "NftTransactionsPaginationQuery") {
    # TODO[@][Relay]: Consider refactoring to use a fragment.
    # eslint-disable-next-line relay/unused-fields
    nftTransactions {
      nftTransactions(after: $after, first: $first, input: $input)
        @connection(key: "NftTransactions_Query_nftTransactions") {
        __id
        edges {
          node {
            id
            fromAddress
            toAddress
            type

            ...NftTransaction_NftTransactionExpress
          }
        }
      }
    }
  }
`;

export default function useNftPageTxs(mint: string, fetchKey: number) {
  const txsInitialQueryRef = useMemo(
    () =>
      loadQuery<useNftPageTxsQuery>(
        RelayEnvironment,
        txsQuery,
        {
          first: FIRST,
          input: { mint },
        },
        {
          fetchPolicy: "network-only",
        }
      ),
    [mint]
  );

  const [nftTxsQueryRef, loadNftTxsQuery] = useQueryLoader<useNftPageTxsQuery>(
    txsQuery,
    txsInitialQueryRef
  );

  useEffect(() => {
    loadNftTxsQuery(
      {
        // @ts-ignore for logging purposes only, it gets ignored in fetchGraphql
        [FetchGraphqlVariablesDenylist.FetchKeyForLogging]: fetchKey,
        first: FIRST,
        input: { mint },
      },
      {
        fetchPolicy: getFetchPolicyForFetchKey(fetchKey),
      }
    );
  }, [loadNftTxsQuery, mint, fetchKey]);

  return nftTxsQueryRef;
}
