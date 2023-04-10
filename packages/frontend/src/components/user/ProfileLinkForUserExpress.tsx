import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { ProfileLinkForUserExpress_UserExpress$key } from "components/user/__generated__/ProfileLinkForUserExpress_UserExpress.graphql";
import ProfileLink from "components/pages/common/nft/ProfileLink";

const fragment = graphql`
  fragment ProfileLinkForUserExpress_UserExpress on UserExpress {
    id
    username

    ProfilePhoto {
      photoUrl
    }
  }
`;

export default function ProfileLinkForUserExpress({
  className,
  hideProfilePhoto = false,
  isGradient = false,
  user,
}: {
  className?: string;
  hideProfilePhoto?: Maybe<boolean>;
  isGradient?: boolean;
  user: ProfileLinkForUserExpress_UserExpress$key;
}) {
  const {
    ProfilePhoto,
    username,
    id: userAddress,
  } = useFragment(fragment, user);
  const { photoUrl: photoSrc } = ProfilePhoto ?? {};

  return (
    <ProfileLink
      className={className}
      hideProfilePhoto={hideProfilePhoto}
      isGradient={isGradient}
      photoSrc={photoSrc}
      username={username}
      userAddress={userAddress}
    />
  );
}
