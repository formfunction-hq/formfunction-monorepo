import graphql from "babel-plugin-relay/macro";
import AddToAllowlistModal from "components/modal/AddToAllowlistModal";
import AuctionSettingsModal from "components/modal/AuctionSettingsModal";
import CancelListingModal from "components/modal/CancelListingModal";
import ChangePriceForEditionsModal from "components/modal/ChangePriceForEditionsModal";
import ChangePriceModal from "components/modal/ChangePriceModal";
import DeleteModal from "components/modal/DeleteModal";
import EditTagsModal from "components/modal/EditTagsModal";
import RefreshMetadataModal from "components/modal/RefreshMetadataModal";
import StopMintingModal from "components/modal/StopMintingModal";
import { NftListedOptionsModals_MetadataAccount$key } from "components/pages/common/nft/__generated__/NftListedOptionsModals_MetadataAccount.graphql";
import { useFragment } from "react-relay";

const fragment = graphql`
  fragment NftListedOptionsModals_MetadataAccount on MetadataAccount {
    ...AddToAllowlistModal_MetadataAccount
    ...AuctionSettingsModal_MetadataAccount
    ...EditTagsModal_MetadataAccount
    ...CancelListingModal_MetadataAccount
    ...ChangePriceModal_MetadataAccount
    ...ChangePriceForEditionsModal_MetadataAccount
    ...RefreshMetadataModal_MetadataAccount
    ...StopMintingModal_MetadataAccount
    ...DeleteModal_MetadataAccount
  }
`;

type Props = {
  isAddToAllowlistModalShown: boolean;
  isAuctionSettingsModalShown: boolean;
  isCancelListingModalShown: boolean;
  isChangePriceForEditionsModalShown: boolean;
  isChangePriceModalShown: boolean;
  isDeleteModalShown: boolean;
  isEditTagsModalShown: boolean;
  isRefreshMetadataModalShown: boolean;
  isStopMintingModalShown: boolean;
  metadataAccount: NftListedOptionsModals_MetadataAccount$key;
  setIsAddToAllowlistModalShown: (val: boolean) => void;
  setIsAuctionSettingsModalShown: (val: boolean) => void;
  setIsCancelListingModalShown: (val: boolean) => void;
  setIsChangePriceForEditionsModalShown: (val: boolean) => void;
  setIsChangePriceModalShown: (val: boolean) => void;
  setIsDeleteModalShown: (val: boolean) => void;
  setIsEditTagsModalShown: (val: boolean) => void;
  setIsRefreshMetadataModalShown: (val: boolean) => void;
  setIsStopMintingModalShown: (val: boolean) => void;
};

export default function NftListedOptionsModals({
  isAddToAllowlistModalShown,
  isAuctionSettingsModalShown,
  isCancelListingModalShown,
  isChangePriceForEditionsModalShown,
  isChangePriceModalShown,
  isDeleteModalShown,
  isEditTagsModalShown,
  isRefreshMetadataModalShown,
  isStopMintingModalShown,
  metadataAccount,
  setIsAddToAllowlistModalShown,
  setIsAuctionSettingsModalShown,
  setIsCancelListingModalShown,
  setIsChangePriceForEditionsModalShown,
  setIsChangePriceModalShown,
  setIsDeleteModalShown,
  setIsEditTagsModalShown,
  setIsRefreshMetadataModalShown,
  setIsStopMintingModalShown,
}: Props) {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  return (
    <>
      <AddToAllowlistModal
        isShown={isAddToAllowlistModalShown}
        metadataAccount={metadataAccountData}
        onHide={() => setIsAddToAllowlistModalShown(false)}
      />
      <DeleteModal
        isShown={isDeleteModalShown}
        metadataAccount={metadataAccountData}
        onHide={() => setIsDeleteModalShown(false)}
      />
      <AuctionSettingsModal
        isShown={isAuctionSettingsModalShown}
        metadataAccount={metadataAccountData}
        onHide={() => setIsAuctionSettingsModalShown(false)}
      />
      <EditTagsModal
        isShown={isEditTagsModalShown}
        metadataAccount={metadataAccountData}
        onHide={() => setIsEditTagsModalShown(false)}
      />
      <CancelListingModal
        isShown={isCancelListingModalShown}
        metadataAccount={metadataAccountData}
        onHide={() => setIsCancelListingModalShown(false)}
      />
      <ChangePriceModal
        isShown={isChangePriceModalShown}
        metadataAccount={metadataAccountData}
        onHide={() => setIsChangePriceModalShown(false)}
      />
      <ChangePriceForEditionsModal
        isShown={isChangePriceForEditionsModalShown}
        metadataAccount={metadataAccountData}
        onHide={() => setIsChangePriceForEditionsModalShown(false)}
      />
      <StopMintingModal
        isShown={isStopMintingModalShown}
        metadataAccount={metadataAccountData}
        onHide={() => setIsStopMintingModalShown(false)}
      />
      <RefreshMetadataModal
        isShown={isRefreshMetadataModalShown}
        metadataAccount={metadataAccountData}
        onHide={() => setIsRefreshMetadataModalShown(false)}
      />
    </>
  );
}
