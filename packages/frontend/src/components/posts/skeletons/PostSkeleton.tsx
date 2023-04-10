import PostCommentsContainer from "components/posts/PostCommentsContainer";
import PostLayout from "components/posts/PostLayout";
import PostCommentSkeleton from "components/posts/skeletons/PostCommentSkeleton";
import PostEngagementSectionSkeleton from "components/posts/skeletons/PostEngagementSectionSkeleton";
import PostHeaderSkeleton from "components/posts/skeletons/PostHeaderSkeleton";
import Skeleton from "react-loading-skeleton";
import ColorValue from "types/enums/ColorValue";

export default function PostSkeleton() {
  return (
    <PostLayout
      asset={
        <Skeleton baseColor={ColorValue.Ghost} width="100%" height={400} />
      }
      body={<Skeleton baseColor={ColorValue.Ghost} width={280} height={18} />}
      comments={
        <PostCommentsContainer>
          <PostCommentSkeleton />
        </PostCommentsContainer>
      }
      postEngagementSection={<PostEngagementSectionSkeleton />}
      postHeader={<PostHeaderSkeleton />}
      title={<Skeleton baseColor={ColorValue.Ghost} width={120} height={30} />}
    />
  );
}
