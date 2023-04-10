import graphql from "babel-plugin-relay/macro";
import { useNftPageEditionsQuery } from "hooks/nft-page/__generated__/useNftPageEditionsQuery.graphql";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import getLdBootstrap from "utils/launch-darkly/getLdBootstrap";
import getFetchPolicyForFetchKey from "utils/relay/getFetchPolicyForFetchKey";
import RelayEnvironment from "utils/relay/RelayEnvironment";

export const editionsQuery = graphql`
  query useNftPageEditionsQuery(
    $after: String
    $first: Int!
    $input: EditionsForMasterEditionMintInput!
  ) {
    ...NftEditionsTableEditionsForMasterEditionMint_Query
  }
`;

/**
 * Paginating the GraphQL Connection (using traditional pages) is particularly
 * tricky. For now we default to fetching as many editions as exist to make
 * pagination in the UI easy.
 *
 * We use LD to control this in case fetching all the editions gets too expensive,
 * and we need to reduce load on our servers/DB.
 */
const INITIAL_FETCH_SIZE = getLdBootstrap()?.nftPageEditionsFetchSize ?? 1000;

export default function useNftPageEditions(mint: string, fetchKey: number) {
  const editionsInitialQueryRef = useMemo(
    () =>
      loadQuery<useNftPageEditionsQuery>(RelayEnvironment, editionsQuery, {
        first: INITIAL_FETCH_SIZE,
        input: { masterEditionMint: mint },
      }),
    [mint]
  );

  const [editionsQueryRef, loadEditionsQuery] =
    useQueryLoader<useNftPageEditionsQuery>(
      editionsQuery,
      editionsInitialQueryRef
    );

  useEffect(() => {
    loadEditionsQuery(
      {
        first: INITIAL_FETCH_SIZE,
        input: { masterEditionMint: mint },
      },
      {
        fetchPolicy: getFetchPolicyForFetchKey(fetchKey),
      }
    );
  }, [fetchKey, loadEditionsQuery, mint]);

  return editionsQueryRef;
}
