import graphql from "babel-plugin-relay/macro";
import AssetForAssetExpress from "components/assets/AssetForAssetExpress";
import Post from "components/posts/Post";
import PostHeaderForPostExpress from "components/posts/PostHeaderForPostExpress";
import { PostForPostWithSingleAsset_PostWithSingleAsset$key } from "components/posts/__generated__/PostForPostWithSingleAsset_PostWithSingleAsset.graphql";
import { useFragment } from "react-relay";
import PostLink from "components/posts/PostLink";
import PostPreviewComments from "components/posts/PostPreviewComments";
import { useState } from "react";
import HideIfEmpty from "components/containers/HideIfEmpty";
import PostBody from "components/posts/PostBody";

const fragment = graphql`
  fragment PostForPostWithSingleAsset_PostWithSingleAsset on PostWithSingleAsset {
    id
    title
    body

    asset {
      ...AssetForAssetExpress_AssetExpress
    }

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
  post: PostForPostWithSingleAsset_PostWithSingleAsset$key;
};

export default function PostForPostWithSingleAsset({ post }: Props) {
  const postData = useFragment(fragment, post);
  const {
    asset,
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
      asset={
        <AssetForAssetExpress
          controls
          showOverlay
          showShimmer={false}
          asset={asset}
          height="100%"
          width="100%"
          objectFit="contain"
        />
      }
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
