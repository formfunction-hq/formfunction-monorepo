import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import UnlockableSeeInfoModal from "components/modal/unlockables/UnlockableSeeInfoModalContent";
import UnlockableShareInfoModal from "components/modal/unlockables/UnlockableShareInfoModalContent";
import UnlockableDetailsModal from "components/modal/unlockables/UnlockableDetailsModalContent";
import GenericModal from "components/modal/GenericModal";
import useUnlockableModalContext from "hooks/useUnlockableModalContext";
import UnlockableModalType from "types/enums/UnlockableModalType";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { UnlockableModalContainer_MetadataAccount$key } from "components/modal/unlockables/__generated__/UnlockableModalContainer_MetadataAccount.graphql";
import useNftKind from "hooks/useNftKind";
import getUnlockableWinner from "utils/unlockables/getUnlockableWinner";

const fragment = graphql`
  fragment UnlockableModalContainer_MetadataAccount on MetadataAccount {
    unlockable {
      unlockableWinners {
        userEmail(input: $unlockableWinnerUserEmailInput)
      }
    }

    ...useNftKind_MetadataAccount
    ...UnlockableShareInfoModalContent_MetadataAccount
    ...UnlockableSeeInfoModalContent_MetadataAccount
    ...UnlockableDetailsModalContent_MetadataAccount
  }
`;

function getModalTitle(
  modalType: UnlockableModalType,
  buyerHasSharedInfo: boolean
) {
  switch (modalType) {
    case UnlockableModalType.ShareInfo:
      return buyerHasSharedInfo ? "Info shared!" : "Share info for unlockable";
    case UnlockableModalType.SeeInfo:
      return "Buyer info";
    case UnlockableModalType.UnlockableDetails:
      return "Unlockable details";
    default:
      return assertUnreachable(modalType);
  }
}

function getModalBodyComponent(modalType: UnlockableModalType) {
  switch (modalType) {
    case UnlockableModalType.ShareInfo:
      return UnlockableShareInfoModal;
    case UnlockableModalType.SeeInfo:
      return UnlockableSeeInfoModal;
    case UnlockableModalType.UnlockableDetails:
      return UnlockableDetailsModal;
    default:
      return assertUnreachable(modalType);
  }
}

type Props = {
  metadataAccount: UnlockableModalContainer_MetadataAccount$key;
};

export default function UnlockableModalContainer({ metadataAccount }: Props) {
  const { modalType, isModalShown, onHide } = useUnlockableModalContext();
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const nftKind = useNftKind(metadataAccountData);

  if (modalType == null) {
    return null;
  }

  const unlockableWinner = getUnlockableWinner(
    metadataAccountData.unlockable?.unlockableWinners,
    nftKind
  );
  const hasBuyerSharedInfo = unlockableWinner?.userEmail != null;

  const ModalBody = getModalBodyComponent(modalType);

  return (
    <GenericModal
      isShown={isModalShown}
      onHide={onHide}
      title={getModalTitle(modalType, hasBuyerSharedInfo)}
    >
      <ModalBody metadataAccount={metadataAccountData} />
    </GenericModal>
  );
}
