import graphql from "babel-plugin-relay/macro";
import { useNftPageNftQuery } from "hooks/nft-page/__generated__/useNftPageNftQuery.graphql";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";
import FetchGraphqlVariablesDenylist from "types/enums/FetchGraphqlVariablesDenylist";
import getFetchPolicyForFetchKey from "utils/relay/getFetchPolicyForFetchKey";
import useViewerId from "hooks/useViewerId";

export const nftQuery = graphql`
  query useNftPageNftQuery(
    $input: MetadataAccountForMintInput!
    $mint: PublicKey!
    $unlockableWinnerUserEmailInput: UnlockableWinnerUserEmailInput!
  ) {
    metadataAccountForMint(input: $input) {
      # TODO[@][Relay]: Consider refactoring to use a fragment.
      # eslint-disable-next-line relay/unused-fields
      data {
        name
      }

      ...NftPageContent_MetadataAccount
    }

    ...NftPageContent_QueryRoot
  }
`;

export default function useNftPageNft(mint: string, fetchKey: number) {
  const viewerId = useViewerId();
  const initialQueryRef = useMemo(
    () =>
      loadQuery<useNftPageNftQuery>(RelayEnvironment, nftQuery, {
        input: { mint },
        mint,
        unlockableWinnerUserEmailInput: {
          viewerId,
        },
      }),
    [mint, viewerId]
  );

  const [nftQueryRef, loadNftQuery] = useQueryLoader<useNftPageNftQuery>(
    nftQuery,
    initialQueryRef
  );

  useEffect(() => {
    loadNftQuery(
      {
        // @ts-ignore for logging purposes only, it gets ignored in fetchGraphql
        [FetchGraphqlVariablesDenylist.FetchKeyForLogging]: fetchKey,
        input: { mint },
        mint,
        unlockableWinnerUserEmailInput: {
          viewerId,
        },
      },
      {
        fetchPolicy: getFetchPolicyForFetchKey(fetchKey),
      }
    );
  }, [loadNftQuery, mint, fetchKey, viewerId]);

  return { loadNftQuery, nftQueryRef };
}
