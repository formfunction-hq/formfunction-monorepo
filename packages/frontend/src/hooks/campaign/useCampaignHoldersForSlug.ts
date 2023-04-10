import graphql from "babel-plugin-relay/macro";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";
import {
  CampaignHoldersForSlugInput,
  useCampaignHoldersForSlugQuery,
} from "hooks/campaign/__generated__/useCampaignHoldersForSlugQuery.graphql";
import { CAMPAIGN_HOLDERS_PAGE_SIZE } from "constants/PageSizes";
import useViewerId from "hooks/useViewerId";

export const campaignHoldersQuery = graphql`
  query useCampaignHoldersForSlugQuery(
    $input: CampaignHoldersForSlugInput!
    $after: String
    $first: PaginationAmount!
  ) {
    ...CampaignHolders_Query
  }
`;

export default function useCampaignHoldersForSlug(
  input: CampaignHoldersForSlugInput
) {
  const viewerId = useViewerId();
  const variables = useMemo(
    () => ({
      after: null,
      first: CAMPAIGN_HOLDERS_PAGE_SIZE,
      input: {
        campaignSlug: input.campaignSlug,
        creatorUsername: input.creatorUsername,
        viewerId,
      },
    }),
    [input.campaignSlug, input.creatorUsername, viewerId]
  );
  const initialQueryRef = useMemo(
    () =>
      loadQuery<useCampaignHoldersForSlugQuery>(
        RelayEnvironment,
        campaignHoldersQuery,
        variables
      ),
    [variables]
  );

  const [campaignHoldersQueryRef, loadCampaignHoldersQuery] =
    useQueryLoader<useCampaignHoldersForSlugQuery>(
      campaignHoldersQuery,
      initialQueryRef
    );

  useEffect(() => {
    loadCampaignHoldersQuery(variables, {
      fetchPolicy: "store-and-network",
    });
  }, [variables, loadCampaignHoldersQuery]);

  return { campaignHoldersQueryRef, loadCampaignHoldersQuery };
}
