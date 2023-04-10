/* TODO[@][Relay]: Consider refactoring to use a fragment. */
/* eslint-disable relay/unused-fields */
import graphql from "babel-plugin-relay/macro";
import { useNftPageClaimsQuery } from "hooks/nft-page/__generated__/useNftPageClaimsQuery.graphql";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";

export const claimsQuery = graphql`
  query useNftPageClaimsQuery($auctionNftId: String!, $userId: String!) {
    Claim_by_pk(auctionNftId: $auctionNftId, userId: $userId) {
      claimTransactionId
      proof
      timeCreated

      NftTransaction {
        timeCreated
      }

      ...ClaimPnftModal_Claim
    }
  }
`;

export default function useNftPageClaims(mint: string, userId: string) {
  const claimsInitialQueryRef = useMemo(
    () =>
      loadQuery<useNftPageClaimsQuery>(RelayEnvironment, claimsQuery, {
        auctionNftId: mint,
        userId,
      }),
    [mint, userId]
  );

  const [claimsQueryRef, loadClaimsQuery] =
    useQueryLoader<useNftPageClaimsQuery>(claimsQuery, claimsInitialQueryRef);

  useEffect(() => {
    loadClaimsQuery({
      auctionNftId: mint,
      userId,
    });
  }, [mint, userId, loadClaimsQuery]);

  return {
    claimsQueryRef,
    loadClaimsQuery,
  };
}
