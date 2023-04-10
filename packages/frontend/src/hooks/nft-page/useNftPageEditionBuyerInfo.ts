import graphql from "babel-plugin-relay/macro";
import { useNftPageEditionBuyerInfoQuery } from "hooks/nft-page/__generated__/useNftPageEditionBuyerInfoQuery.graphql";
import useViewerId from "hooks/useViewerId";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";

export const editionBuyerInfoQuery = graphql`
  query useNftPageEditionBuyerInfoQuery($input: EditionBuyerInfoInput!) {
    editionBuyerInfo(input: $input) {
      ...BuyEditionModal_EditionBuyerInfoResponse
      ...NftActionButton_EditionBuyerInfoResponse
      ...NftAllowlistInfo_EditionBuyerInfoResponse
    }
  }
`;

export default function useNftPageEditionBuyerInfo(mint: string) {
  const viewerId = useViewerId();

  const editionBuyerInfoInitialQueryRef = useMemo(
    () =>
      loadQuery<useNftPageEditionBuyerInfoQuery>(
        RelayEnvironment,
        editionBuyerInfoQuery,
        {
          input: { mint, viewerId },
        }
      ),
    [mint, viewerId]
  );

  const [editionBuyerInfoQueryRef, loadEditionBuyerInfoQuery] =
    useQueryLoader<useNftPageEditionBuyerInfoQuery>(
      editionBuyerInfoQuery,
      editionBuyerInfoInitialQueryRef
    );

  useEffect(() => {
    loadEditionBuyerInfoQuery({ input: { mint, viewerId } });
  }, [mint, viewerId, loadEditionBuyerInfoQuery]);

  return { editionBuyerInfoQueryRef, loadEditionBuyerInfoQuery };
}
