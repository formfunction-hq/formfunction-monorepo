import graphql from "babel-plugin-relay/macro";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";
import FetchGraphqlVariablesDenylist from "types/enums/FetchGraphqlVariablesDenylist";
import getFetchPolicyForFetchKey from "utils/relay/getFetchPolicyForFetchKey";
import {
  CampaignV2ForSlugInput,
  useCampaignPageCampaignV2Query,
} from "hooks/campaign-page/v2/__generated__/useCampaignPageCampaignV2Query.graphql";

export const campaignQuery = graphql`
  query useCampaignPageCampaignV2Query($input: CampaignV2ForSlugInput!) {
    CampaignsNamespace {
      ...CampaignHeroForCampaignsNamespace_CampaignsNamespaceQueryResponse
      ...CampaignAboutForCampaignsNamespace_CampaignsNamespaceQueryResponse
      ...CampaignCommunityTabButton_CampaignsNamespaceQueryResponse
      ...CampaignPage_CampaignsNamespaceQueryResponse
      ...CampaignSubmissionReviewActionsBanner_CampaignsNamespaceQueryResponse
      ...CampaignFundingTierPreviewsForCampaignsNamespaceCampaign_CampaignsNamespaceQueryResponse
    }
  }
`;

export default function useCampaignPageCampaignV2(
  input: CampaignV2ForSlugInput,
  fetchKey: number
) {
  const variables = useMemo(
    () => ({
      input: {
        campaignSlug: input.campaignSlug,
        creatorUsername: input.creatorUsername,
      },
    }),
    [input.campaignSlug, input.creatorUsername]
  );

  const initialQueryRef = useMemo(
    () =>
      loadQuery<useCampaignPageCampaignV2Query>(
        RelayEnvironment,
        campaignQuery,
        variables
      ),
    [variables]
  );

  const [campaignQueryRef, loadCampaignQuery] =
    useQueryLoader<useCampaignPageCampaignV2Query>(
      campaignQuery,
      initialQueryRef
    );

  useEffect(() => {
    loadCampaignQuery(
      {
        // @ts-ignore for logging purposes only, it gets ignored in fetchGraphql
        [FetchGraphqlVariablesDenylist.FetchKeyForLogging]: fetchKey,
        ...variables,
      },
      { fetchPolicy: getFetchPolicyForFetchKey(fetchKey) }
    );
  }, [loadCampaignQuery, variables, fetchKey]);

  return { campaignQueryRef, loadCampaignQuery };
}
