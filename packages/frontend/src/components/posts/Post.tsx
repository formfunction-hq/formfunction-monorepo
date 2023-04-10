import PostCommentsModal from "components/modal/PostCommentsModal";
import PostCommentInput from "components/posts/PostCommentInput";
import PostEngagementSection from "components/posts/PostEngagementSection";
import PostLayout from "components/posts/PostLayout";
import { PostReactionInfo } from "components/posts/PostReactions";
import ArtName from "components/text/ArtName";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import ColorClass from "types/enums/ColorClass";

type Props = {
  asset?: Maybe<JSX.Element>;
  body: Maybe<JSX.Element>;
  bottomLink?: Maybe<JSX.Element>;
  commentInfo: {
    comments: Maybe<JSX.Element>;
    totalCount: number;
  };
  isCommentModalOpen: boolean;
  postHeader: JSX.Element;
  postId: string;
  reactionInfo: PostReactionInfo;
  setIsCommentModalOpen: (val: boolean) => void;
  title: string;
  topLink?: Maybe<JSX.Element>;
  topSection?: JSX.Element;
};

export default function Post({
  asset,
  body,
  bottomLink,
  commentInfo,
  topSection,
  isCommentModalOpen,
  topLink,
  postHeader,
  postId,
  reactionInfo,
  setIsCommentModalOpen,
  title,
}: Props) {
  const { comments, totalCount: commentCount } = commentInfo;

  return (
    <>
      <PostCommentsModal
        commentCount={commentCount}
        isShown={isCommentModalOpen}
        onHide={() => setIsCommentModalOpen(false)}
        postHeader={postHeader}
        postId={postId}
      />
      <PostLayout
        asset={asset}
        body={body}
        comments={comments}
        topSection={topSection}
        topLink={topLink ?? null}
        bottomLink={bottomLink ?? null}
        postCommentInput={<PostCommentInput postId={postId} />}
        postEngagementSection={
          <PostEngagementSection
            commentTotalCount={commentCount}
            onCommentButtonClick={() => setIsCommentModalOpen(true)}
            postId={postId}
            reactionInfo={reactionInfo}
          />
        }
        postHeader={postHeader}
        title={
          !isEmptyString(title) ? (
            <ArtName colorClass={ColorClass.Primary}>{title}</ArtName>
          ) : null
        }
      />
    </>
  );
}
