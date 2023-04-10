import ProfilePhotoCircle from "components/images/ProfilePhotoCircle";
import PostCommentLayout from "components/posts/PostCommentLayout";
import Skeleton from "react-loading-skeleton";
import ColorValue from "types/enums/ColorValue";

export default function PostCommentSkeleton() {
  return (
    <PostCommentLayout
      comment={
        <Skeleton baseColor={ColorValue.Ghost} width={280} height={18} />
      }
      usernameLink={
        <Skeleton baseColor={ColorValue.Ghost} width={120} height={18} />
      }
      profilePicCircle={<ProfilePhotoCircle src={null} hideIcon />}
      timeCreated={
        <Skeleton baseColor={ColorValue.Ghost} width={180} height={16} />
      }
    />
  );
}
