import graphql from "babel-plugin-relay/macro";
import PostComment from "components/posts/PostComment";
import { PostCommentForCommentExpress_CommentExpress$key } from "components/posts/__generated__/PostCommentForCommentExpress_CommentExpress.graphql";
import { useFragment } from "react-relay";
import dayjs from "utils/dates/dayjsex";

const fragment = graphql`
  fragment PostCommentForCommentExpress_CommentExpress on CommentExpress {
    comment
    timeCreated

    commenter {
      username

      ProfilePhoto {
        photoUrl
      }
    }
  }
`;

type Props = {
  comment: PostCommentForCommentExpress_CommentExpress$key;
};

export default function PostCommentForCommentExpress({ comment }: Props) {
  const {
    comment: commentText,
    timeCreated,
    commenter: { username, ProfilePhoto },
  } = useFragment(fragment, comment);
  const { photoUrl: profilePhotoSrc } = ProfilePhoto ?? { photoUrl: null };

  return (
    <PostComment
      comment={commentText}
      commenterInfo={{ profilePhotoSrc, username }}
      timeCreated={dayjs(timeCreated)}
    />
  );
}
