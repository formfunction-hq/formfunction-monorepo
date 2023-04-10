import graphql from "babel-plugin-relay/macro";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";
import FetchGraphqlVariablesDenylist from "types/enums/FetchGraphqlVariablesDenylist";
import getFetchPolicyForFetchKey from "utils/relay/getFetchPolicyForFetchKey";
import {
  CampaignV2ForSlugInput,
  useCampaignPageCampaignV2DraftQuery,
} from "hooks/campaign-page/v2/__generated__/useCampaignPageCampaignV2DraftQuery.graphql";

export const campaignDraftQuery = graphql`
  query useCampaignPageCampaignV2DraftQuery($input: CampaignV2ForSlugInput!) {
    CampaignsNamespace {
      # eslint-disable-next-line relay/unused-fields
      campaignV2ForSlug(input: $input) {
        campaign {
          ...CampaignPageDraftModeContent_CampaignV2
        }
      }
    }
  }
`;

export default function useCampaignPageCampaignV2Draft(
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
      loadQuery<useCampaignPageCampaignV2DraftQuery>(
        RelayEnvironment,
        campaignDraftQuery,
        variables
      ),
    [variables]
  );

  const [campaignDraftQueryRef, loadCampaignDraftQuery] =
    useQueryLoader<useCampaignPageCampaignV2DraftQuery>(
      campaignDraftQuery,
      initialQueryRef
    );

  useEffect(() => {
    loadCampaignDraftQuery(
      {
        // @ts-ignore for logging purposes only, it gets ignored in fetchGraphql
        [FetchGraphqlVariablesDenylist.FetchKeyForLogging]: fetchKey,
        ...variables,
      },
      { fetchPolicy: getFetchPolicyForFetchKey(fetchKey) }
    );
  }, [loadCampaignDraftQuery, variables, fetchKey]);

  return { campaignDraftQueryRef, loadCampaignDraftQuery };
}
