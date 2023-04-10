import styles from "css/pages/common/nft/ProfileLinkLayout.module.css";
import { Link } from "react-router-dom";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export default function ProfileLinkLayout({
  linkTo,
  profilePhoto,
  usernameOrAddressSection,
}: {
  linkTo?: Maybe<string>;
  profilePhoto: Maybe<JSX.Element>;
  usernameOrAddressSection: JSX.Element;
}) {
  const profileLinkInner = (
    <>
      {profilePhoto}
      {usernameOrAddressSection}
    </>
  );

  return linkTo == null ? (
    <div className={styles.profileLink}>{profileLinkInner}</div>
  ) : (
    <Link className={styles.profileLink} to={linkTo}>
      {profileLinkInner}
    </Link>
  );
}
