import { Popover } from "antd";
import EllipsisShadowButton from "components/buttons/EllipsisShadowButton";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import styles from "css/buttons/NftEllipsisShadowButton.module.css";
import { useState } from "react";
import graphql from "babel-plugin-relay/macro";
import { NftEllipsisShadowButton_MetadataAccount$key } from "components/buttons/__generated__/NftEllipsisShadowButton_MetadataAccount.graphql";
import { useFragment } from "react-relay";
import NftOptions from "components/pages/common/nft/NftOptions";
import useIsBottomTabsWidth from "hooks/useIsBottomTabsWidth";
import OtherNftBottomDrawer from "components/drawers/OtherNftBottomDrawer";
import NftOptionsModals from "components/pages/common/nft/NftOptionsModals";

const fragment = graphql`
  fragment NftEllipsisShadowButton_MetadataAccount on MetadataAccount {
    ...NftOptions_MetadataAccount
    ...NftOptionsModals_MetadataAccount
    ...OtherNftBottomDrawer_MetadataAccount
  }
`;

type Props = {
  metadataAccount: NftEllipsisShadowButton_MetadataAccount$key;
};

export default function NftEllipsisShadowButton({
  metadataAccount,
}: Props): JSX.Element {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const [visible, setVisible] = useState(false);
  const [isBottomDrawerShown, setIsBottomDrawerShown] = useState(false);
  const isBottomTabsWidth = useIsBottomTabsWidth();
  const [isBurnModalShown, setIsBurnModalShown] = useState(false);
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
  const [isRefreshMetadataModalShown, setIsRefreshMetadataModalShown] =
    useState(false);
  const [isTransferModalShown, setIsTransferModalShown] = useState(false);

  if (isBottomTabsWidth) {
    return (
      <>
        <OtherNftBottomDrawer
          isShown={isBottomDrawerShown}
          metadataAccount={metadataAccountData}
          onHide={() => setIsBottomDrawerShown(false)}
        />
        <EllipsisShadowButton onClick={() => setIsBottomDrawerShown(true)} />
      </>
    );
  }

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
      <Popover
        placement="leftTop"
        content={
          <div className={styles.popoverContent}>
            <NftOptions
              metadataAccount={metadataAccountData}
              onClickOption={() => setVisible(false)}
              setIsBurnModalShown={setIsBurnModalShown}
              setIsDeleteModalShown={setIsDeleteModalShown}
              setIsRefreshMetadataModalShown={setIsRefreshMetadataModalShown}
              setIsTransferModalShown={setIsTransferModalShown}
            />
          </div>
        }
        trigger="click"
        open={visible}
        onOpenChange={setVisible}
      >
        <EllipsisShadowButton onClick={emptyFunction} />
      </Popover>
    </>
  );
}
