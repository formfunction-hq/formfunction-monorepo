import graphql from "babel-plugin-relay/macro";
import GenericNftSearchRow from "components/nft/GenericNftSearchRow";
import styles from "css/modal/generic-manage-nft-modal/GenericNftDndRow.module.css";
import VerticalEllipsisIcon from "components/icons/VerticalEllipsisIcon";
import ColorValue from "types/enums/ColorValue";
import CrossIcon from "components/icons/CrossIcon";
import { useFragment } from "react-relay";
import PlainButton from "components/buttons/PlainButton";
import joinClasses from "utils/joinClasses";
import { GenericNftSearchDndRow_MetadataAccount$key } from "components/nft/__generated__/GenericNftSearchDndRow_MetadataAccount.graphql";
import useFundingTierNftsContext from "hooks/useFundingTierNftsContext";

const fragment = graphql`
  fragment GenericNftSearchDndRow_MetadataAccount on MetadataAccount {
    id

    ...GenericNftSearchRow_MetadataAccount
  }
`;

type Props = {
  metadataAccount: GenericNftSearchDndRow_MetadataAccount$key;
  onRemove: (metadataAccountId: string) => void;
};

export default function GenericNftSearchDndRow({
  onRemove,
  metadataAccount,
}: Props) {
  const data = useFragment(fragment, metadataAccount);
  const { allowDelete, locallyAddedItems } = useFundingTierNftsContext();
  const isLocallyAddedItem = locallyAddedItems.find(
    (item) => item.metadataAccountId === data.id
  );

  return (
    <div className={joinClasses(styles.rowContainer)}>
      <div className={styles.rowInnerContainer}>
        <VerticalEllipsisIcon colorValue={ColorValue.Ghost} />
        <GenericNftSearchRow
          className={styles.rowContent}
          metadataAccount={data}
        />
        {allowDelete || isLocallyAddedItem ? (
          <PlainButton
            className={styles.crossIcon}
            onClick={() => {
              onRemove(data.id);
            }}
          >
            <CrossIcon colorValue={ColorValue.Ghost} />
          </PlainButton>
        ) : null}
      </div>
    </div>
  );
}
