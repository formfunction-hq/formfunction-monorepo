import graphql from "babel-plugin-relay/macro";
import TextButton from "components/buttons/TextButton";
import PostCommentForCommentExpress from "components/posts/PostCommentForCommentExpress";
import PostCommentsContainer from "components/posts/PostCommentsContainer";
import { PostPreviewComments_PostComments$key } from "components/posts/__generated__/PostPreviewComments_PostComments.graphql";
import { useFragment } from "react-relay";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";

const fragment = graphql`
  fragment PostPreviewComments_PostComments on PostComments {
    totalCount
    previewComments {
      id
      ...PostCommentForCommentExpress_CommentExpress
    }
  }
`;

type Props = {
  comments: PostPreviewComments_PostComments$key;
  onClickSeeMore: () => void;
};

export default function PostPreviewComments({
  comments,
  onClickSeeMore,
}: Props) {
  const previewCommentsData = useFragment(fragment, comments);
  const { totalCount: commentCount, previewComments } = previewCommentsData;

  if (previewComments.length === 0) {
    return null;
  }

  return (
    <PostCommentsContainer>
      {previewComments.map((comment) => (
        <PostCommentForCommentExpress key={comment.id} comment={comment} />
      ))}
      {commentCount > previewComments.length ? (
        <TextButton
          buttonThemeOrColorClass={ColorClass.Secondary}
          fontClass={FontClass.Body1}
          onClick={onClickSeeMore}
        >
          See more comments...
        </TextButton>
      ) : null}
    </PostCommentsContainer>
  );
}
