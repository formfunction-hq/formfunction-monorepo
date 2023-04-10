import graphql from "babel-plugin-relay/macro";
import styles from "css/modal/unlockables/UnlockableInfoModal.module.css";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import { useFragment } from "react-relay";
import NftAsset from "components/images/NftAsset";
import NftAssetSize from "types/enums/NftAssetSize";
import getImgixUrl from "utils/getImgixUrl";
import Header3 from "components/text/Header3";
import UnlockableTinyLabel from "components/unlockables/UnlockableTinyLabel";
import UnlockableInfoModalCtaLabel from "components/modal/unlockables/UnlockableDetailsModalCtaLabel";
import { UnlockableDetailsModalContent_MetadataAccount$key } from "components/modal/unlockables/__generated__/UnlockableDetailsModalContent_MetadataAccount.graphql";

const fragment = graphql`
  fragment UnlockableDetailsModalContent_MetadataAccount on MetadataAccount {
    unlockable {
      category
      description
      name

      asset {
        contentType
        path
      }
      ...UnlockableTinyLabel_UnlockableExpress
    }

    ...UnlockableDetailsModalCtaLabel_MetadataAccount
  }
`;

type Props = {
  metadataAccount: UnlockableDetailsModalContent_MetadataAccount$key;
};

export default function UnlockableDetailsModalContent({
  metadataAccount,
}: Props) {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { unlockable } = metadataAccountData;
  if (unlockable == null) {
    return null;
  }

  const { category, description, name } = unlockable;

  return (
    <div className={styles.body}>
      <div className={styles.imageContainer}>
        <NftAsset
          assetSrc={getImgixUrl(unlockable.asset.path)}
          contentType={unlockable.asset.contentType}
          noBorderRadius
          playbackId={undefined}
          size={NftAssetSize.Size234}
        />
      </div>
      <div className={styles.content}>
        <UnlockableTinyLabel unlockable={unlockable} category={category} />
        <Header3 colorClass={ColorClass.Primary}>{name}</Header3>
        {description != null && (
          <Body1 colorClass={ColorClass.Primary}>{description}</Body1>
        )}
      </div>
      <UnlockableInfoModalCtaLabel metadataAccount={metadataAccountData} />
    </div>
  );
}
