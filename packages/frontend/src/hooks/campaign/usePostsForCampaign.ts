import graphql from "babel-plugin-relay/macro";
import { useEffect, useMemo } from "react";
import { loadQuery, useQueryLoader } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";
import {
  PostsForCampaignInput,
  usePostsForCampaignQuery,
} from "hooks/campaign/__generated__/usePostsForCampaignQuery.graphql";
import { CAMPAIGN_POSTS_PAGE_SIZE } from "constants/PageSizes";
import useViewerId from "hooks/useViewerId";

export const postsForCampaignQuery = graphql`
  query usePostsForCampaignQuery(
    $input: PostsForCampaignInput!
    $after: String
    $first: Int!
  ) {
    ...CampaignPosts_Query
  }
`;

export default function usePostsForCampaign(input: PostsForCampaignInput) {
  const viewerId = useViewerId();
  const variables = useMemo(
    () => ({
      after: null,
      first: CAMPAIGN_POSTS_PAGE_SIZE,
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
      loadQuery<usePostsForCampaignQuery>(
        RelayEnvironment,
        postsForCampaignQuery,
        variables
      ),
    [variables]
  );

  const [postsForCampaignQueryRef, loadPostsForCampaignQuery] =
    useQueryLoader<usePostsForCampaignQuery>(
      postsForCampaignQuery,
      initialQueryRef
    );

  useEffect(() => {
    loadPostsForCampaignQuery(variables, {
      fetchPolicy: "store-and-network",
    });
  }, [variables, loadPostsForCampaignQuery]);

  return postsForCampaignQueryRef;
}
