import FlexBox from "components/layout/FlexBox";
import Divider from "components/misc/Divider";
import GenericModal from "components/modal/GenericModal";
import PostCommentsForCommentQueries from "components/posts/PostCommentsForCommentQueries";
import useCommentsForPost, {
  commentsForPostQuery,
} from "hooks/useCommentsForPost";
import { useCommentsForPostQuery } from "hooks/__generated__/useCommentsForPostQuery.graphql";
import { useEffect, useMemo, useRef } from "react";
import { useQueryLoader } from "react-relay";
import ColorClass from "types/enums/ColorClass";
import styles from "css/modal/PostCommentsModal.module.css";
import PostCommentInput from "components/posts/PostCommentInput";
import joinClasses from "utils/joinClasses";
import GlobalClass from "types/enums/GlobalClass";

type Props = {
  commentCount: number;
  isShown: boolean;
  onHide: () => void;
  postHeader: JSX.Element;
  postId: string;
};

function Content({
  commentCount,
  postHeader,
  postId,
}: {
  commentCount: number;
  postHeader: JSX.Element;
  postId: string;
}) {
  const { getInitialQueryRef, variables } = useCommentsForPost({ postId });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialQueryRef = useMemo(getInitialQueryRef, [variables]);
  const commentsContainerRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (commentsContainerRef.current != null) {
      commentsContainerRef.current.scrollTop =
        commentsContainerRef.current.scrollHeight;
    }
  };

  const [commentsForPostQueryRef, loadCommentsForPostQuery] =
    useQueryLoader<useCommentsForPostQuery>(
      commentsForPostQuery,
      initialQueryRef
    );

  useEffect(() => {
    loadCommentsForPostQuery(variables, { fetchPolicy: "store-and-network" });
  }, [variables, loadCommentsForPostQuery]);

  return commentsForPostQueryRef != null ? (
    <FlexBox flexDirection="column" gap={32}>
      {postHeader}
      <Divider colorClass={ColorClass.Tertiary} />
      <div
        className={joinClasses(
          styles.commentsContainer,
          GlobalClass.ThinScrollbar
        )}
        ref={commentsContainerRef}
      >
        <PostCommentsForCommentQueries
          count={commentCount}
          commentsForPostQueryRef={commentsForPostQueryRef}
          onLoadMore={() => {
            setTimeout(scrollToBottom, 0);
          }}
          postId={postId}
        />
      </div>
      <PostCommentInput onCompleted={scrollToBottom} postId={postId} />
    </FlexBox>
  ) : null;
}

export default function PostCommentsModal({
  commentCount,
  isShown,
  onHide,
  postHeader,
  postId,
}: Props): JSX.Element {
  return (
    <GenericModal className={styles.modal} isShown={isShown} onHide={onHide}>
      {isShown && (
        <Content
          commentCount={commentCount}
          postHeader={postHeader}
          postId={postId}
        />
      )}
    </GenericModal>
  );
}
