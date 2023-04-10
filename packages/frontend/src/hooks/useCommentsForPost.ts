import graphql from "babel-plugin-relay/macro";
import { useMemo } from "react";
import { loadQuery } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";
import {
  CommentsForPostInput,
  useCommentsForPostQuery,
} from "hooks/__generated__/useCommentsForPostQuery.graphql";
import { CAMPAIGN_POST_COMMENTS_PAGE_SIZE } from "constants/PageSizes";

export const commentsForPostQuery = graphql`
  query useCommentsForPostQuery(
    $input: CommentsForPostInput!
    $after: String
    $first: PaginationAmount!
  ) {
    ...PostCommentsForCommentQueries_Query
  }
`;

export default function useCommentsForPost(input: CommentsForPostInput) {
  const variables = useMemo(
    () => ({
      after: null,
      first: CAMPAIGN_POST_COMMENTS_PAGE_SIZE,
      input: {
        postId: input.postId,
      },
    }),
    [input.postId]
  );

  // NOTE: we intentionally do not pre-load this query since it should only
  // load when the comment modal is opened. This admittedly looks a bit
  // unnatural so if we determine that this query will never need to be
  // pre-loaded, we can remove this hook and just opt for lazy load queries instead
  //
  // Example where we might want to pre-load: hard-link to a specific post
  // that shows up in a modal/separate page
  return {
    getInitialQueryRef: () =>
      loadQuery<useCommentsForPostQuery>(
        RelayEnvironment,
        commentsForPostQuery,
        variables
      ),
    variables,
  };
}
