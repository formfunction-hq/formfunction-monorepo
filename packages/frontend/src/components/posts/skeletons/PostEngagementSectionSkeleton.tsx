import PostEngagementSectionLayout from "components/posts/PostEngagementSectionLayout";
import Skeleton from "react-loading-skeleton";
import ColorValue from "types/enums/ColorValue";

export default function PostEngagementSectionSkeleton() {
  return (
    <PostEngagementSectionLayout
      postReactions={
        <Skeleton baseColor={ColorValue.Ghost} width={90} height={22} />
      }
      postCommentsButton={
        <Skeleton baseColor={ColorValue.Ghost} width={140} height={22} />
      }
    />
  );
}
