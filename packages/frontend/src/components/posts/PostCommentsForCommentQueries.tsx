import styles from "css/posts/PostCommentsForCommentQueries.module.css";
import graphql from "babel-plugin-relay/macro";
import TextButton from "components/buttons/TextButton";
import PostCommentForCommentExpress from "components/posts/PostCommentForCommentExpress";
import PostCommentsContainer from "components/posts/PostCommentsContainer";
import PostCommentSkeleton from "components/posts/skeletons/PostCommentSkeleton";
import { PostCommentsForCommentQueries_Query$key } from "components/posts/__generated__/PostCommentsForCommentQueries_Query.graphql";
import { CAMPAIGN_POST_COMMENTS_PAGE_SIZE } from "constants/PageSizes";
import SortOrder from "formfn-shared/dist/types/enums/SortOrder";
import { getCompareByProperty } from "formfn-shared/dist/utils/getCompareByProperty";
import { range } from "formfn-shared/dist/utils/range";
import { commentsForPostQuery } from "hooks/useCommentsForPost";
import useRelayConnectionIdsContext from "hooks/useRelayConnectionIdsContext";
import { useCommentsForPostQuery } from "hooks/__generated__/useCommentsForPostQuery.graphql";
import { Suspense, useEffect } from "react";
import {
  PreloadedQuery,
  usePaginationFragment,
  usePreloadedQuery,
} from "react-relay";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";

// Don't use more than 3, otherwise the skeletons will overlap with the sticky
// comment input for shorter screens.
const MAX_NUM_SKELETONS = 3;

const fragment = graphql`
  fragment PostCommentsForCommentQueries_Query on query_root
  @refetchable(queryName: "PostCommentsForCommentQueriesPaginationQuery") {
    CommentQueries {
      commentsForPost {
        comments(input: $input, after: $after, first: $first)
          @connection(key: "PostCommentsForCommentQueries_Query_comments") {
          __id
          edges {
            node {
              id
              # eslint-disable-next-line relay/unused-fields
              timeCreated
              ...PostCommentForCommentExpress_CommentExpress
            }
          }
        }
      }
    }
  }
`;

function Content({
  commentsForPost,
  onLoadMore,
  postId,
}: {
  commentsForPost: PostCommentsForCommentQueries_Query$key;
  onLoadMore: () => void;
  postId: string;
}) {
  const {
    data: commentsData,
    hasNext,
    isLoadingNext,
    loadNext,
  } = usePaginationFragment<
    useCommentsForPostQuery,
    PostCommentsForCommentQueries_Query$key
  >(fragment, commentsForPost);
  const {
    PostComments: { setConnectionId: setPostCommentsConnectionId },
  } = useRelayConnectionIdsContext();

  useEffect(() => {
    setPostCommentsConnectionId(
      postId,
      commentsData.CommentQueries?.commentsForPost?.comments.__id ?? ""
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const commentNodes =
    commentsData.CommentQueries?.commentsForPost?.comments.edges.map(
      ({ node }) => node
    );
  if (commentNodes == null) {
    return null;
  }

  return (
    <PostCommentsContainer>
      {commentNodes
        // Sort so that comments that get added locally show up at the bottom,
        // even if the user loads more comments
        .sort(getCompareByProperty("timeCreated", SortOrder.Asc))
        .map((comment) => (
          <PostCommentForCommentExpress key={comment.id} comment={comment} />
        ))}
      {isLoadingNext &&
        range(CAMPAIGN_POST_COMMENTS_PAGE_SIZE).map((index) => (
          <PostCommentSkeleton key={index} />
        ))}
      {hasNext && (
        <TextButton
          buttonThemeOrColorClass={ColorClass.Secondary}
          className={styles.loadMoreButton}
          disabled={isLoadingNext}
          fontClass={FontClass.Body1}
          onClick={() => {
            loadNext(CAMPAIGN_POST_COMMENTS_PAGE_SIZE);
            onLoadMore();
          }}
        >
          {isLoadingNext ? "Loading..." : "Load more"}
        </TextButton>
      )}
    </PostCommentsContainer>
  );
}

function DataLoader({
  commentsForPostQueryRef,
  onLoadMore,
  postId,
}: {
  commentsForPostQueryRef: PreloadedQuery<useCommentsForPostQuery>;
  onLoadMore: () => void;
  postId: string;
}) {
  const data = usePreloadedQuery<useCommentsForPostQuery>(
    commentsForPostQuery,
    commentsForPostQueryRef
  );

  return (
    <Content commentsForPost={data} onLoadMore={onLoadMore} postId={postId} />
  );
}

type Props = {
  commentsForPostQueryRef: PreloadedQuery<useCommentsForPostQuery>;
  count: number;
  onLoadMore: () => void;
  postId: string;
};

export default function PostCommentsForCommentQueries({
  commentsForPostQueryRef,
  count,
  onLoadMore,
  postId,
}: Props) {
  return (
    <Suspense
      fallback={
        <PostCommentsContainer>
          {range(Math.min(count, MAX_NUM_SKELETONS)).map((index) => (
            <PostCommentSkeleton key={index} />
          ))}
        </PostCommentsContainer>
      }
    >
      <DataLoader
        commentsForPostQueryRef={commentsForPostQueryRef}
        onLoadMore={onLoadMore}
        postId={postId}
      />
    </Suspense>
  );
}
