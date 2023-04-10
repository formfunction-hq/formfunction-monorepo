import ProfilePhotoCircle from "components/images/ProfilePhotoCircle";
import ProfileLinkLayout from "components/pages/common/nft/ProfileLinkLayout";
import Skeleton from "react-loading-skeleton";
import ColorValue from "types/enums/ColorValue";

export default function ProfileLinkSkeleton() {
  return (
    <ProfileLinkLayout
      profilePhoto={<ProfilePhotoCircle src={null} />}
      usernameOrAddressSection={
        <Skeleton baseColor={ColorValue.Ghost} width={80} />
      }
    />
  );
}
