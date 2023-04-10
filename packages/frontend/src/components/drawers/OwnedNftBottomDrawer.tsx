import graphql from "babel-plugin-relay/macro";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import BottomDrawer from "components/drawers/BottomDrawer";
import { OwnedNftBottomDrawer_MetadataAccount$key } from "components/drawers/__generated__/OwnedNftBottomDrawer_MetadataAccount.graphql";
import NftListedOptions from "components/pages/common/nft/NftListedOptions";
import NftListedOptionsModals from "components/pages/common/nft/NftListedOptionsModals";
import styles from "css/drawers/OwnedNftBottomDrawer.module.css";
import { useState } from "react";
import { useFragment } from "react-relay";

const fragment = graphql`
  fragment OwnedNftBottomDrawer_MetadataAccount on MetadataAccount {
    ...NftListedOptions_MetadataAccount
    ...NftListedOptionsModals_MetadataAccount
  }
`;

type Props = {
  isShown: boolean;
  metadataAccount: OwnedNftBottomDrawer_MetadataAccount$key;
  onHide: () => void;
};

export default function OwnedNftBottomDrawer({
  isShown,
  metadataAccount,
  onHide,
}: Props): JSX.Element {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const [isAuctionSettingsModalShown, setIsAuctionSettingsModalShown] =
    useState(false);
  const [isEditTagsModalShown, setIsEditTagsModalShown] = useState(false);
  const [isCancelListingModalShown, setIsCancelListingModalShown] =
    useState(false);
  const [isChangePriceModalShown, setIsChangePriceModalShown] = useState(false);
  const [
    isChangePriceForEditionsModalShown,
    setIsChangePriceForEditionsModalShown,
  ] = useState(false);
  const [isRefreshMetadataModalShown, setIsRefreshMetadataModalShown] =
    useState(false);
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
  const [isStopMintingModalShown, setIsStopMintingModalShown] = useState(false);
  const [isAddToAllowlistModalShown, setIsAddToAllowlistModalShown] =
    useState(false);

  return (
    <>
      <NftListedOptionsModals
        isAddToAllowlistModalShown={isAddToAllowlistModalShown}
        isAuctionSettingsModalShown={isAuctionSettingsModalShown}
        isCancelListingModalShown={isCancelListingModalShown}
        isChangePriceForEditionsModalShown={isChangePriceForEditionsModalShown}
        isChangePriceModalShown={isChangePriceModalShown}
        isDeleteModalShown={isDeleteModalShown}
        isEditTagsModalShown={isEditTagsModalShown}
        isRefreshMetadataModalShown={isRefreshMetadataModalShown}
        isStopMintingModalShown={isStopMintingModalShown}
        metadataAccount={metadataAccountData}
        setIsAddToAllowlistModalShown={setIsAddToAllowlistModalShown}
        setIsAuctionSettingsModalShown={setIsAuctionSettingsModalShown}
        setIsCancelListingModalShown={setIsCancelListingModalShown}
        setIsChangePriceForEditionsModalShown={
          setIsChangePriceForEditionsModalShown
        }
        setIsChangePriceModalShown={setIsChangePriceModalShown}
        setIsDeleteModalShown={setIsDeleteModalShown}
        setIsEditTagsModalShown={setIsEditTagsModalShown}
        setIsRefreshMetadataModalShown={setIsRefreshMetadataModalShown}
        setIsStopMintingModalShown={setIsStopMintingModalShown}
      />
      <BottomDrawer isShown={isShown} onHide={onHide} title="Options">
        <ResponsiveContainer className={styles.body}>
          <NftListedOptions
            metadataAccount={metadataAccountData}
            onClickOption={onHide}
            setIsAddToAllowlistModalShown={setIsAddToAllowlistModalShown}
            setIsAuctionSettingsModalShown={setIsAuctionSettingsModalShown}
            setIsCancelListingModalShown={setIsCancelListingModalShown}
            setIsChangePriceForEditionsModalShown={
              setIsChangePriceForEditionsModalShown
            }
            setIsChangePriceModalShown={setIsChangePriceModalShown}
            setIsDeleteModalShown={setIsDeleteModalShown}
            setIsEditTagsModalShown={setIsEditTagsModalShown}
            setIsRefreshMetadataModalShown={setIsRefreshMetadataModalShown}
            setIsStopMintingModalShown={setIsStopMintingModalShown}
          />
        </ResponsiveContainer>
      </BottomDrawer>
    </>
  );
}
