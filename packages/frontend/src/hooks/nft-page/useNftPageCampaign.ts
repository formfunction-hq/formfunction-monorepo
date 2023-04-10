import graphql from "babel-plugin-relay/macro";
import { useNftPageCampaignQuery } from "hooks/nft-page/__generated__/useNftPageCampaignQuery.graphql";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";

export const nftCampaignQuery = graphql`
  query useNftPageCampaignQuery($input: CampaignForNftInput!) {
    CampaignsNamespace {
      ...CampaignInfoCard_CampaignsNamespaceQueryResponse
      ...useNftPageLoadCampaign_CampaignsNamespaceQueryResponse
      ...CampaignBenefitsSection_CampaignsNamespaceQueryResponse
    }
  }
`;

export default function useNftPageCampaign(mint: string) {
  const initialQueryRef = useMemo(
    () =>
      loadQuery<useNftPageCampaignQuery>(RelayEnvironment, nftCampaignQuery, {
        input: { mint },
      }),
    [mint]
  );

  const [nftCampaignQueryRef, loadNftCampaignQuery] =
    useQueryLoader<useNftPageCampaignQuery>(nftCampaignQuery, initialQueryRef);

  useEffect(() => {
    loadNftCampaignQuery({
      input: { mint },
    });
  }, [loadNftCampaignQuery, mint]);

  return { loadNftCampaignQuery, nftCampaignQueryRef };
}
