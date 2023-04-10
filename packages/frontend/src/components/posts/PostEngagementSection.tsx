import PostCommentsButton from "components/posts/PostCommentsButton";
import PostEngagementSectionLayout from "components/posts/PostEngagementSectionLayout";
import PostReactions, {
  PostReactionInfo,
} from "components/posts/PostReactions";

type Props = {
  commentTotalCount: number;
  onCommentButtonClick: () => void;
  postId: string;
  reactionInfo: PostReactionInfo;
};

export default function PostEngagementSection({
  commentTotalCount,
  onCommentButtonClick,
  postId,
  reactionInfo,
}: Props) {
  return (
    <PostEngagementSectionLayout
      postCommentsButton={
        <PostCommentsButton
          onClick={onCommentButtonClick}
          totalCount={commentTotalCount}
        />
      }
      postReactions={
        <PostReactions postId={postId} reactionInfo={reactionInfo} />
      }
    />
  );
}
