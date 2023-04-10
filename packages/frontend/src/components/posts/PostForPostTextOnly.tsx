import graphql from "babel-plugin-relay/macro";
import Post from "components/posts/Post";
import PostHeaderForPostExpress from "components/posts/PostHeaderForPostExpress";
import PostLink from "components/posts/PostLink";
import PostPreviewComments from "components/posts/PostPreviewComments";
import { PostForPostTextOnly_PostTextOnly$key } from "components/posts/__generated__/PostForPostTextOnly_PostTextOnly.graphql";
import { useState } from "react";
import { useFragment } from "react-relay";
import HideIfEmpty from "components/containers/HideIfEmpty";
import PostBody from "components/posts/PostBody";

const fragment = graphql`
  fragment PostForPostTextOnly_PostTextOnly on PostTextOnly {
    id
    title
    body

    reactions {
      totalCount
      viewerReactionType
    }

    comments {
      totalCount
      ...PostPreviewComments_PostComments
    }

    ...PostHeaderForPostExpress_PostExpress
    ...PostLink_IPost
  }
`;

type Props = {
  post: PostForPostTextOnly_PostTextOnly$key;
};

export default function PostForPostTextOnly({ post }: Props) {
  const postData = useFragment(fragment, post);
  const {
    body,
    id,
    title,
    reactions: { totalCount, viewerReactionType },
    comments,
  } = postData;
  const { totalCount: commentCount } = comments;
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const postComments = (
    <PostPreviewComments
      comments={comments}
      onClickSeeMore={() => setIsCommentModalOpen(true)}
    />
  );

  return (
    <Post
      body={<PostBody>{body}</PostBody>}
      commentInfo={{ comments: postComments, totalCount: commentCount }}
      isCommentModalOpen={isCommentModalOpen}
      topLink={
        <HideIfEmpty>
          <PostLink post={postData} />
        </HideIfEmpty>
      }
      postHeader={<PostHeaderForPostExpress post={postData} />}
      postId={id}
      reactionInfo={{ totalCount, viewerReactionType }}
      setIsCommentModalOpen={setIsCommentModalOpen}
      title={title}
    />
  );
}
