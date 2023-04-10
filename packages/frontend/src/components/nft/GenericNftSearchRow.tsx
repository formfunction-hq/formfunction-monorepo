import NftAssetSize from "types/enums/NftAssetSize";
import graphql from "babel-plugin-relay/macro";
import styles from "css/series/SeriesNftRow.module.css";
import { useFragment } from "react-relay";
import Body1 from "components/text/Body1";
import joinClasses from "utils/joinClasses";
import PlainButton from "components/buttons/PlainButton";
import NftAssetForMetadataAccount from "components/images/NftAssetForMetadataAccount";
import ColorClass from "types/enums/ColorClass";
import { GenericNftSearchRow_MetadataAccount$key } from "components/nft/__generated__/GenericNftSearchRow_MetadataAccount.graphql";

const fragment = graphql`
  fragment GenericNftSearchRow_MetadataAccount on MetadataAccount {
    id
    data {
      name
    }
    ...NftAssetForMetadataAccount_MetadataAccount
  }
`;

export default function GenericNftSearchRow({
  className,
  onClick,
  metadataAccount,
}: {
  className?: string;
  metadataAccount: GenericNftSearchRow_MetadataAccount$key;
  onClick?: () => void;
}) {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const body = (
    <div
      key={metadataAccountData.id}
      className={joinClasses(styles.container, className)}
    >
      <NftAssetForMetadataAccount
        className={styles.nftPhoto}
        metadataAccount={metadataAccountData}
        size={NftAssetSize.Size72}
      />
      <Body1 colorClass={ColorClass.Primary} textAlign="left">
        {metadataAccountData.data.name}
      </Body1>
    </div>
  );

  return onClick != null ? (
    <PlainButton onClick={onClick}>{body}</PlainButton>
  ) : (
    body
  );
}
