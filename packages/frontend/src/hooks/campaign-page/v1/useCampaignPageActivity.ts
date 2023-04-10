import graphql from "babel-plugin-relay/macro";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";
import {
  CampaignActivityForSlugInput,
  useCampaignPageActivityQuery,
} from "hooks/campaign-page/v1/__generated__/useCampaignPageActivityQuery.graphql";
import FetchGraphqlVariablesDenylist from "types/enums/FetchGraphqlVariablesDenylist";
import getFetchPolicyForFetchKey from "utils/relay/getFetchPolicyForFetchKey";

export const CAMPAIGN_PAGE_ACTIVITY_FIRST = 30;

export const campaignActivityQuery = graphql`
  query useCampaignPageActivityQuery(
    $input: CampaignActivityForSlugInput!
    $first: PaginationAmount!
  ) {
    campaignActivityForSlug {
      # eslint-disable-next-line relay/unused-fields
      campaignActivity(first: $first, input: $input) {
        edges {
          node {
            id
            ...CampaignActivityItemForNftTransaction_NftTransactionExpress
          }
        }
      }
    }
  }
`;

export default function useCampaignPageActivity(
  input: CampaignActivityForSlugInput,
  fetchKey: number
) {
  const initialQueryRef = useMemo(
    () =>
      loadQuery<useCampaignPageActivityQuery>(
        RelayEnvironment,
        campaignActivityQuery,
        {
          first: CAMPAIGN_PAGE_ACTIVITY_FIRST,
          input: {
            campaignSlug: input.campaignSlug,
            creatorUsername: input.creatorUsername,
          },
        }
      ),
    [input.campaignSlug, input.creatorUsername]
  );

  const [campaignActivityQueryRef, loadCampaignActivityQuery] =
    useQueryLoader<useCampaignPageActivityQuery>(
      campaignActivityQuery,
      initialQueryRef
    );

  useEffect(() => {
    loadCampaignActivityQuery(
      {
        // @ts-ignore for logging purposes only, it gets ignored in fetchGraphql
        [FetchGraphqlVariablesDenylist.FetchKeyForLogging]: fetchKey,
        first: CAMPAIGN_PAGE_ACTIVITY_FIRST,
        input: {
          campaignSlug: input.campaignSlug,
          creatorUsername: input.creatorUsername,
        },
      },
      {
        fetchPolicy: getFetchPolicyForFetchKey(fetchKey),
      }
    );
  }, [
    loadCampaignActivityQuery,
    input.campaignSlug,
    input.creatorUsername,
    fetchKey,
  ]);

  return { campaignActivityQueryRef, loadCampaignActivityQuery };
}
