import graphql from "babel-plugin-relay/macro";
import { useEffect, useMemo } from "react";
import { FetchPolicy, loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";
import { CampaignV2ForSlugInput } from "hooks/campaign-page/v2/__generated__/useCampaignPageCampaignV2Query.graphql";
import { useCampaignPageCampaignV2GoalQuery } from "hooks/campaign-page/v2/__generated__/useCampaignPageCampaignV2GoalQuery.graphql";

export const campaignGoalQuery = graphql`
  query useCampaignPageCampaignV2GoalQuery($input: CampaignV2ForSlugInput!) {
    CampaignsNamespace {
      # eslint-disable-next-line relay/unused-fields
      campaignV2ForSlug(input: $input) {
        campaign {
          ...CampaignProgressTowardsGoalForCampaignV2_CampaignV2
        }
      }
    }
  }
`;

export default function useCampaignPageCampaignV2Goal(
  input: CampaignV2ForSlugInput,
  fetchPolicy?: FetchPolicy
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
      loadQuery<useCampaignPageCampaignV2GoalQuery>(
        RelayEnvironment,
        campaignGoalQuery,
        variables
      ),
    [variables]
  );

  const [campaignGoalQueryRef, loadCampaignGoalQuery] =
    useQueryLoader<useCampaignPageCampaignV2GoalQuery>(
      campaignGoalQuery,
      initialQueryRef
    );

  useEffect(() => {
    loadCampaignGoalQuery(
      variables,
      fetchPolicy != null ? { fetchPolicy } : undefined
    );
  }, [loadCampaignGoalQuery, variables, fetchPolicy]);

  return { campaignGoalQueryRef, loadCampaignGoalQuery };
}
