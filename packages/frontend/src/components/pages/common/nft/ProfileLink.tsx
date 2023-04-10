import ProfilePhotoCircle from "components/images/ProfilePhotoCircle";
import ColorClass from "types/enums/ColorClass";
import formatUsername from "utils/formatUsername";
import shortenAddress from "utils/shortenAddress";
import FontClass from "types/enums/FontClass";
import GlobalClass from "types/enums/GlobalClass";
import joinClasses from "utils/joinClasses";
import { Maybe, Undef } from "formfn-shared/dist/types/UtilityTypes";
import getUserProfileLinkRelative from "formfn-shared/dist/utils/links/getUserProfileLinkRelative";
import ProfileLinkLayout from "components/pages/common/nft/ProfileLinkLayout";

export default function ProfileLink({
  className,
  hideProfilePhoto = false,
  isGradient = false,
  photoSrc,
  username,
  userAddress,
}: {
  className?: string;
  hideProfilePhoto?: Maybe<boolean>;
  isGradient?: boolean;
  photoSrc: Undef<string>;
  userAddress: string;
  username: Undef<string>;
}) {
  return (
    <ProfileLinkLayout
      profilePhoto={
        !hideProfilePhoto ? <ProfilePhotoCircle src={photoSrc} /> : null
      }
      usernameOrAddressSection={
        <div
          className={joinClasses(
            isGradient ? GlobalClass.GradientText : ColorClass.Primary,
            FontClass.Body1Medium,
            className
          )}
        >
          {username == null
            ? shortenAddress(userAddress)
            : `@${formatUsername(username)}`}
        </div>
      }
      linkTo={getUserProfileLinkRelative(username ?? userAddress)}
    />
  );
}
