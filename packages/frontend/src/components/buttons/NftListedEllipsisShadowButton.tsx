import { Popover } from "antd";
import EllipsisShadowButton from "components/buttons/EllipsisShadowButton";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import styles from "css/buttons/NftListedEllipsisShadowButton.module.css";
import { useState } from "react";
import graphql from "babel-plugin-relay/macro";
import { NftListedEllipsisShadowButton_MetadataAccount$key } from "components/buttons/__generated__/NftListedEllipsisShadowButton_MetadataAccount.graphql";
import { useFragment } from "react-relay";
import NftListedOptions from "components/pages/common/nft/NftListedOptions";
import NftListedOptionsModals from "components/pages/common/nft/NftListedOptionsModals";

const fragment = graphql`
  fragment NftListedEllipsisShadowButton_MetadataAccount on MetadataAccount {
    ...NftListedOptions_MetadataAccount
    ...NftListedOptionsModals_MetadataAccount
  }
`;

type Props = {
  metadataAccount: NftListedEllipsisShadowButton_MetadataAccount$key;
};

export default function NftListedEllipsisShadowButton({
  metadataAccount,
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
  const [visible, setVisible] = useState(false);

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
      <Popover
        placement="leftTop"
        content={
          <div className={styles.popoverContent}>
            <NftListedOptions
              metadataAccount={metadataAccountData}
              onClickOption={() => setVisible(false)}
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
          </div>
        }
        trigger="click"
        visible={visible}
        onVisibleChange={setVisible}
      >
        <EllipsisShadowButton onClick={emptyFunction} />
      </Popover>
    </>
  );
}
