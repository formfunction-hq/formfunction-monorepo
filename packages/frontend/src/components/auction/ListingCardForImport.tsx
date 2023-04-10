import styles from "css/auction/ListingCardForImport.module.css";
import graphql from "babel-plugin-relay/macro";
import ListingCardForMetadata from "components/auction/ListingCardForMetadata";
import { ListingCardForImport_MetadataAccount$key } from "components/auction/__generated__/ListingCardForImport_MetadataAccount.graphql";
import ViewerArtistPillButton from "components/buttons/ViewerArtistPillButton";
import { useFragment } from "react-relay";
import PlainButton from "components/buttons/PlainButton";
import CrossIcon from "components/icons/CrossIcon";
import ColorValue from "types/enums/ColorValue";
import useImportContext from "hooks/useImportContext";
import Body2 from "components/text/Body2";
import ColorClass from "types/enums/ColorClass";
import { useState } from "react";
import NftHistoryModal from "components/modal/NftHistoryModal";

const fragment = graphql`
  fragment ListingCardForImport_MetadataAccount on MetadataAccount {
    mint

    ...ListingCardForMetadata_MetadataAccount
  }
`;

type Props = {
  metadataAccount: ListingCardForImport_MetadataAccount$key;
};

export default function ListingCardForImport({
  metadataAccount,
}: Props): JSX.Element {
  const { setRemovedMintAddresses } = useImportContext();
  const [isModalShown, setIsModalShown] = useState(false);
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const artistPillButton = <ViewerArtistPillButton />;

  return (
    <>
      <NftHistoryModal
        isShown={isModalShown}
        mintAddress={metadataAccountData.mint}
        onHide={() => setIsModalShown(false)}
      />
      <div className={styles.container}>
        <PlainButton
          className={styles.historyButton}
          onClick={() => setIsModalShown(true)}
        >
          <Body2 colorClass={ColorClass.White}>NFT History</Body2>
        </PlainButton>
        <PlainButton
          className={styles.removeButton}
          onClick={() =>
            setRemovedMintAddresses(
              (curr) => new Set([...curr, metadataAccountData.mint])
            )
          }
        >
          <CrossIcon colorValue={ColorValue.White} />
        </PlainButton>
        <ListingCardForMetadata
          artistPillButtonOverride={artistPillButton}
          disableLink
          metadataAccount={metadataAccountData}
        />
      </div>
    </>
  );
}
