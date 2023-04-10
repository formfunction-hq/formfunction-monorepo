import graphql from "babel-plugin-relay/macro";
import { useNftPagePnftAuctionNftsQuery } from "hooks/nft-page/__generated__/useNftPagePnftAuctionNftsQuery.graphql";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";

export const pnftAuctionNftsQuery = graphql`
  query useNftPagePnftAuctionNftsQuery($input: PnftAuctionNftsInput!) {
    pnftAuctionNfts(input: $input) {
      # TODO[@][Relay]: Consider refactoring to use a fragment.
      # eslint-disable-next-line relay/unused-fields
      metadataAccounts {
        id
        assetHeight
        assetWidth

        nft {
          mint

          Creator {
            username
          }
        }

        data {
          name
        }
      }
    }
  }
`;

export default function useNftPagePnftAuctionNfts(mint: string) {
  const pnftAuctionNftsInitialQueryRef = useMemo(
    () =>
      loadQuery<useNftPagePnftAuctionNftsQuery>(
        RelayEnvironment,
        pnftAuctionNftsQuery,
        {
          input: { masterEditionPnftId: mint },
        }
      ),
    [mint]
  );

  const [pnftAuctionNftsQueryRef, loadPnftAuctionNftsQuery] =
    useQueryLoader<useNftPagePnftAuctionNftsQuery>(
      pnftAuctionNftsQuery,
      pnftAuctionNftsInitialQueryRef
    );

  useEffect(() => {
    loadPnftAuctionNftsQuery({
      input: { masterEditionPnftId: mint },
    });
  }, [loadPnftAuctionNftsQuery, mint]);

  return pnftAuctionNftsQueryRef;
}
