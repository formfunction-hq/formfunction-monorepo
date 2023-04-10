import graphql from "babel-plugin-relay/macro";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";
import {
  CampaignForSlugInput,
  useCampaignPageCampaignQuery,
} from "hooks/campaign-page/v1/__generated__/useCampaignPageCampaignQuery.graphql";
import FetchGraphqlVariablesDenylist from "types/enums/FetchGraphqlVariablesDenylist";
import getFetchPolicyForFetchKey from "utils/relay/getFetchPolicyForFetchKey";

export const campaignQuery = graphql`
  query useCampaignPageCampaignQuery($input: CampaignForSlugInput!) {
    campaignForSlug(input: $input) {
      # eslint-disable-next-line relay/unused-fields
      campaign {
        ...CampaignAbout_CampaignExpress
        ...CampaignHero_CampaignExpress
      }
    }
  }
`;

export default function useCampaignPageCampaign(
  input: CampaignForSlugInput,
  fetchKey: number
) {
  const initialQueryRef = useMemo(
    () =>
      loadQuery<useCampaignPageCampaignQuery>(RelayEnvironment, campaignQuery, {
        input: {
          campaignSlug: input.campaignSlug,
          creatorUsername: input.creatorUsername,
        },
      }),
    [input.campaignSlug, input.creatorUsername]
  );

  const [campaignQueryRef, loadCampaignQuery] =
    useQueryLoader<useCampaignPageCampaignQuery>(
      campaignQuery,
      initialQueryRef
    );

  useEffect(() => {
    loadCampaignQuery(
      {
        // @ts-ignore for logging purposes only, it gets ignored in fetchGraphql
        [FetchGraphqlVariablesDenylist.FetchKeyForLogging]: fetchKey,
        input: {
          campaignSlug: input.campaignSlug,
          creatorUsername: input.creatorUsername,
        },
      },
      { fetchPolicy: getFetchPolicyForFetchKey(fetchKey) }
    );
  }, [loadCampaignQuery, input.campaignSlug, input.creatorUsername, fetchKey]);

  return { campaignQueryRef, loadCampaignQuery };
}
