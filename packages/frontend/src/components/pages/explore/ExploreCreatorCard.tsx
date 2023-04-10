import graphql from "babel-plugin-relay/macro";
import { ExploreCreatorCard_UserAndMetadataAccounts$key } from "components/pages/explore/__generated__/ExploreCreatorCard_UserAndMetadataAccounts.graphql";
import { useFragment } from "react-relay";
import styles from "css/pages/explore/ExploreCreatorCard.module.css";
import Header3 from "components/text/Header3";
import ColorClass from "types/enums/ColorClass";
import GlobalClass from "types/enums/GlobalClass";
import Subheader from "components/text/Subheader";
import { Link } from "react-router-dom";
import formatUsername from "utils/formatUsername";
import Imgix from "react-imgix";
import MaybeImgix from "components/images/MaybeImgix";
import joinClasses from "utils/joinClasses";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import getUserProfileLinkRelative from "formfn-shared/dist/utils/links/getUserProfileLinkRelative";
import useLazyLoadConfig from "hooks/useLazyLoadConfig";
import MaybeWrapWithLazyLoad from "components/containers/MaybeWrapWithLazyLoad";
import ExploreCardNftAsset from "components/pages/explore/ExploreCardNftAsset";

const fragment = graphql`
  fragment ExploreCreatorCard_UserAndMetadataAccounts on UserAndMetadataAccounts {
    user {
      bio
      displayName
      username

      ProfilePhoto {
        photoUrl
      }
    }

    metadataAccounts {
      ...ExploreCardNftAsset_MetadataAccount
    }
  }
`;

type Props = {
  userAndMetadataAccounts: ExploreCreatorCard_UserAndMetadataAccounts$key;
};

export default function ExploreCreatorCard({
  userAndMetadataAccounts,
}: Props): JSX.Element {
  const userAndMetadataAccountsData = useFragment(
    fragment,
    userAndMetadataAccounts
  );
  const { metadataAccounts, user } = userAndMetadataAccountsData;
  const lazyLoadConfigForProfilePhoto = useLazyLoadConfig(null);

  const bio = user.bio == null || user.bio.length === 0 ? null : user.bio;

  const profilePhoto =
    user.ProfilePhoto == null ? (
      <div className={styles.profilePhoto} />
    ) : (
      <MaybeWrapWithLazyLoad lazyLoadConfig={lazyLoadConfigForProfilePhoto}>
        <MaybeImgix src={user.ProfilePhoto.photoUrl}>
          <Imgix
            className={styles.profilePhoto}
            src={user.ProfilePhoto.photoUrl}
            width={100}
          />
          <img
            className={styles.profilePhoto}
            src={user.ProfilePhoto.photoUrl}
          />
        </MaybeImgix>
      </MaybeWrapWithLazyLoad>
    );

  return (
    <div className={joinClasses(styles.container, GlobalClass.CardAnimation)}>
      <Link
        className={styles.userSection}
        to={getUserProfileLinkRelative(user.username)}
      >
        {profilePhoto}
        <div className={styles.usernameAndBio}>
          <Header3 colorClass={ColorClass.Primary}>
            {!isEmptyString(user.displayName)
              ? user.displayName!
              : formatUsername(user.username)!}
          </Header3>
          {bio != null && (
            <Subheader colorClass={ColorClass.Secondary} truncateLines={3}>
              {bio}
            </Subheader>
          )}
        </div>
      </Link>
      <div className={styles.nftsSection}>
        {metadataAccounts.slice(0, 3).map((nft) => (
          <ExploreCardNftAsset metadataAccount={nft} />
        ))}
      </div>
    </div>
  );
}
