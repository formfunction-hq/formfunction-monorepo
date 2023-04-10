import ArtistPillLoadingSkeleton from "components/auction/ArtistPillLoadingSkeleton";
import PostHeaderLayout from "components/posts/PostHeaderLayout";
import Skeleton from "react-loading-skeleton";
import ColorValue from "types/enums/ColorValue";

export default function PostHeaderSkeleton() {
  return (
    <PostHeaderLayout
      artistPillButton={<ArtistPillLoadingSkeleton />}
      postVisibilitySection={
        <Skeleton baseColor={ColorValue.Ghost} width={24} height={22} />
      }
      postTimeCreated={
        <Skeleton baseColor={ColorValue.Ghost} width={240} height={22} />
      }
    />
  );
}
