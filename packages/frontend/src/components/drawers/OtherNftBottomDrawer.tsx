import graphql from "babel-plugin-relay/macro";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import BottomDrawer from "components/drawers/BottomDrawer";
import { OtherNftBottomDrawer_MetadataAccount$key } from "components/drawers/__generated__/OtherNftBottomDrawer_MetadataAccount.graphql";
import NftOptions from "components/pages/common/nft/NftOptions";
import NftOptionsModals from "components/pages/common/nft/NftOptionsModals";
import styles from "css/drawers/OwnedNftBottomDrawer.module.css";
import { useState } from "react";
import { useFragment } from "react-relay";

const fragment = graphql`
  fragment OtherNftBottomDrawer_MetadataAccount on MetadataAccount {
    ...NftOptions_MetadataAccount
    ...NftOptionsModals_MetadataAccount
  }
`;

type Props = {
  isShown: boolean;
  metadataAccount: OtherNftBottomDrawer_MetadataAccount$key;
  onHide: () => void;
};

export default function OtherNftBottomDrawer({
  isShown,
  metadataAccount,
  onHide,
}: Props): JSX.Element {
  const [isBurnModalShown, setIsBurnModalShown] = useState(false);
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
  const [isRefreshMetadataModalShown, setIsRefreshMetadataModalShown] =
    useState(false);
  const [isTransferModalShown, setIsTransferModalShown] = useState(false);

  const metadataAccountData = useFragment(fragment, metadataAccount);

  return (
    <>
      <NftOptionsModals
        isBurnModalShown={isBurnModalShown}
        isDeleteModalShown={isDeleteModalShown}
        isRefreshMetadataModalShown={isRefreshMetadataModalShown}
        isTransferModalShown={isTransferModalShown}
        metadataAccount={metadataAccountData}
        setIsBurnModalShown={setIsBurnModalShown}
        setIsDeleteModalShown={setIsDeleteModalShown}
        setIsRefreshMetadataModalShown={setIsRefreshMetadataModalShown}
        setIsTransferModalShown={setIsTransferModalShown}
      />
      <BottomDrawer isShown={isShown} onHide={onHide} title="Options">
        <ResponsiveContainer className={styles.body}>
          <NftOptions
            metadataAccount={metadataAccountData}
            onClickOption={onHide}
            setIsBurnModalShown={setIsBurnModalShown}
            setIsDeleteModalShown={setIsDeleteModalShown}
            setIsRefreshMetadataModalShown={setIsRefreshMetadataModalShown}
            setIsTransferModalShown={setIsTransferModalShown}
          />
        </ResponsiveContainer>
      </BottomDrawer>
    </>
  );
}
