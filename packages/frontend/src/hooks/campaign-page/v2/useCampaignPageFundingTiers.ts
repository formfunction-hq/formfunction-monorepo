import graphql from "babel-plugin-relay/macro";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";
import FetchGraphqlVariablesDenylist from "types/enums/FetchGraphqlVariablesDenylist";
import getFetchPolicyForFetchKey from "utils/relay/getFetchPolicyForFetchKey";
import {
  CampaignFundingTiersForSlugInput,
  useCampaignPageFundingTiersQuery,
} from "hooks/campaign-page/v2/__generated__/useCampaignPageFundingTiersQuery.graphql";

export const FIRST_FOR_FUNDING_TIER_NFTS = 100;
const FIRST_FOR_PREVIEW_NFTS = 3;

export const campaignFundingTiersQuery = graphql`
  query useCampaignPageFundingTiersQuery(
    $firstForFundingTierNfts: PaginationAmount!
    $firstForPreviewNfts: PaginationAmount!
    $input: CampaignFundingTiersForSlugInput!
  ) {
    CampaignsNamespace {
      ...CampaignFundingTierPreviewsForCampaignsNamespaceFundingTiers_CampaignsNamespaceQueryResponse
      ...CampaignFundingTiersForCampaignsNamespace_CampaignsNamespaceQueryResponse
    }
  }
`;

export default function useCampaignPageFundingTiers(
  input: CampaignFundingTiersForSlugInput,
  fetchKey: number
) {
  const initialQueryRef = useMemo(
    () =>
      loadQuery<useCampaignPageFundingTiersQuery>(
        RelayEnvironment,
        campaignFundingTiersQuery,
        {
          firstForFundingTierNfts: FIRST_FOR_FUNDING_TIER_NFTS,
          firstForPreviewNfts: FIRST_FOR_PREVIEW_NFTS,
          input: {
            campaignSlug: input.campaignSlug,
            creatorUsername: input.creatorUsername,
          },
        }
      ),
    [input.campaignSlug, input.creatorUsername]
  );

  const [campaignFundingTiersQueryRef, loadCampaignFundingTiersQuery] =
    useQueryLoader<useCampaignPageFundingTiersQuery>(
      campaignFundingTiersQuery,
      initialQueryRef
    );

  useEffect(() => {
    loadCampaignFundingTiersQuery(
      {
        // @ts-ignore for logging purposes only, it gets ignored in fetchGraphql
        [FetchGraphqlVariablesDenylist.FetchKeyForLogging]: fetchKey,
        firstForFundingTierNfts: FIRST_FOR_FUNDING_TIER_NFTS,
        firstForPreviewNfts: FIRST_FOR_PREVIEW_NFTS,
        input: {
          campaignSlug: input.campaignSlug,
          creatorUsername: input.creatorUsername,
        },
      },
      { fetchPolicy: getFetchPolicyForFetchKey(fetchKey) }
    );
  }, [
    loadCampaignFundingTiersQuery,
    input.campaignSlug,
    input.creatorUsername,
    fetchKey,
  ]);

  return { campaignFundingTiersQueryRef, loadCampaignFundingTiersQuery };
}
