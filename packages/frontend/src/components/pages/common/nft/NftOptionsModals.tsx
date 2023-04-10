import graphql from "babel-plugin-relay/macro";
import BurnModal from "components/modal/BurnModal";
import DeleteModal from "components/modal/DeleteModal";
import RefreshMetadataModal from "components/modal/RefreshMetadataModal";
import TransferModal from "components/modal/TransferModal";
import { useFragment } from "react-relay";
import { NftOptionsModals_MetadataAccount$key } from "components/pages/common/nft/__generated__/NftOptionsModals_MetadataAccount.graphql";

const fragment = graphql`
  fragment NftOptionsModals_MetadataAccount on MetadataAccount {
    ...BurnModal_MetadataAccount
    ...RefreshMetadataModal_MetadataAccount
    ...TransferModal_MetadataAccount
    ...DeleteModal_MetadataAccount
  }
`;

type Props = {
  isBurnModalShown: boolean;
  isDeleteModalShown: boolean;
  isRefreshMetadataModalShown: boolean;
  isTransferModalShown: boolean;
  metadataAccount: NftOptionsModals_MetadataAccount$key;
  setIsBurnModalShown: (val: boolean) => void;
  setIsDeleteModalShown: (val: boolean) => void;
  setIsRefreshMetadataModalShown: (val: boolean) => void;
  setIsTransferModalShown: (val: boolean) => void;
};

export default function NftOptionsModals({
  isBurnModalShown,
  isDeleteModalShown,
  isRefreshMetadataModalShown,
  isTransferModalShown,
  metadataAccount,
  setIsBurnModalShown,
  setIsDeleteModalShown,
  setIsRefreshMetadataModalShown,
  setIsTransferModalShown,
}: Props) {
  const metadataAccountData = useFragment(fragment, metadataAccount);

  return (
    <>
      <BurnModal
        isShown={isBurnModalShown}
        metadataAccount={metadataAccountData}
        onHide={() => setIsBurnModalShown(false)}
      />
      <DeleteModal
        isShown={isDeleteModalShown}
        metadataAccount={metadataAccountData}
        onHide={() => setIsDeleteModalShown(false)}
      />
      <RefreshMetadataModal
        isShown={isRefreshMetadataModalShown}
        metadataAccount={metadataAccountData}
        onHide={() => setIsRefreshMetadataModalShown(false)}
      />
      <TransferModal
        isShown={isTransferModalShown}
        metadataAccount={metadataAccountData}
        onHide={() => setIsTransferModalShown(false)}
      />
    </>
  );
}
