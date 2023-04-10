import graphql from "babel-plugin-relay/macro";
import { NFT_PAGE_NEXT_IN_THIS_SERIES_PAGE_SIZE } from "constants/PageSizes";
import { useNftPageNextInThisSeriesQuery } from "hooks/nft-page/__generated__/useNftPageNextInThisSeriesQuery.graphql";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";

export const nextInThisSeriesQuery = graphql`
  query useNftPageNextInThisSeriesQuery(
    $after: String
    $first: Int!
    $input: MetadataAccountsForSeriesInput!
  ) {
    ...NftPageNextInThisSeriesSection_Query
  }
`;

export default function useNftPageNextInThisSeries(
  mint: string,
  seriesId: string
) {
  const nextInThisSeriesInitialQueryRef = useMemo(
    () =>
      loadQuery<useNftPageNextInThisSeriesQuery>(
        RelayEnvironment,
        nextInThisSeriesQuery,
        {
          after: mint,
          first: NFT_PAGE_NEXT_IN_THIS_SERIES_PAGE_SIZE,
          input: {
            mint,
            seriesId,
            shouldLoop: true,
          },
        }
      ),
    [mint, seriesId]
  );

  const [nextInThisSeriesQueryRef, loadNextInThisSeriesQuery] =
    useQueryLoader<useNftPageNextInThisSeriesQuery>(
      nextInThisSeriesQuery,
      nextInThisSeriesInitialQueryRef
    );

  useEffect(() => {
    loadNextInThisSeriesQuery({
      after: mint,
      first: NFT_PAGE_NEXT_IN_THIS_SERIES_PAGE_SIZE,
      input: {
        mint,
        seriesId,
        shouldLoop: true,
      },
    });
  }, [loadNextInThisSeriesQuery, mint, seriesId]);

  return nextInThisSeriesQueryRef;
}
