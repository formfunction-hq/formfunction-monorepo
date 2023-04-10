import graphql from "babel-plugin-relay/macro";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";
import FetchGraphqlVariablesDenylist from "types/enums/FetchGraphqlVariablesDenylist";
import {
  CampaignV2ActivityForSlugInput,
  useCampaignPageActivityV2Query,
} from "hooks/campaign-page/v2/__generated__/useCampaignPageActivityV2Query.graphql";

export const CAMPAIGN_PAGE_ACTIVITY_FIRST = 30;

export const campaignActivityV2Query = graphql`
  query useCampaignPageActivityV2Query(
    $input: CampaignV2ActivityForSlugInput!
    $first: PaginationAmount!
  ) {
    CampaignsNamespace {
      ...CampaignActivityForCampaignsNamespace_CampaignsNamespaceQueryResponse
    }
  }
`;

export default function useCampaignPageActivityV2(
  input: CampaignV2ActivityForSlugInput,
  fetchKey: number
) {
  const variables = useMemo(
    () => ({
      first: CAMPAIGN_PAGE_ACTIVITY_FIRST,
      input: {
        campaignSlug: input.campaignSlug,
        creatorUsername: input.creatorUsername,
      },
    }),
    [input.campaignSlug, input.creatorUsername]
  );

  const initialQueryRef = useMemo(
    () =>
      loadQuery<useCampaignPageActivityV2Query>(
        RelayEnvironment,
        campaignActivityV2Query,
        variables
      ),
    [variables]
  );

  const [campaignActivityQueryRef, loadCampaignActivityQuery] =
    useQueryLoader<useCampaignPageActivityV2Query>(
      campaignActivityV2Query,
      initialQueryRef
    );

  useEffect(() => {
    loadCampaignActivityQuery(
      {
        // @ts-ignore for logging purposes only, it gets ignored in fetchGraphql
        [FetchGraphqlVariablesDenylist.FetchKeyForLogging]: fetchKey,
        ...variables,
      },
      {
        fetchPolicy: "network-only",
      }
    );
  }, [fetchKey, loadCampaignActivityQuery, variables]);

  return { campaignActivityQueryRef, loadCampaignActivityQuery };
}
