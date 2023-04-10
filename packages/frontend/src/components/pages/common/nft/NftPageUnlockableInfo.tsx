import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import TinyLabel from "components/text/TinyLabel";
import ColorClass from "types/enums/ColorClass";
import NftAssetSize from "types/enums/NftAssetSize";
import NftAsset from "components/images/NftAsset";
import getImgixUrl from "utils/getImgixUrl";
import getDisplayLabelFromUnlockableCategory from "utils/unlockables/getDisplayLabelFromUnlockableCategory";
import useUserContext from "hooks/useUserContext";
import useNftKind from "hooks/useNftKind";
import getUnlockableWinner from "utils/unlockables/getUnlockableWinner";
import UnlockableLabel from "components/pages/common/nft/unlockables/UnlockableLabel";
import UnlockableActionButton from "components/pages/common/nft/unlockables/UnlockableActionButton";
import Body2 from "components/text/Body2";
import { NftPageUnlockableInfo_MetadataAccount$key } from "components/pages/common/nft/__generated__/NftPageUnlockableInfo_MetadataAccount.graphql";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import UnlockableCta from "types/enums/UnlockableCta";
import useUnlockableCtaType from "hooks/useUnlockableCtaType";
import NftGenericSupplementaryItem from "components/pages/common/nft/NftGenericSupplementaryItem";
import NftGenericSupplementaryItemType from "types/NftGenericSupplementaryItemType";
import useUnlockableModalContext from "hooks/useUnlockableModalContext";
import UnlockableModalType from "types/enums/UnlockableModalType";

const fragment = graphql`
  fragment NftPageUnlockableInfo_MetadataAccount on MetadataAccount {
    primarySaleHappened

    nft {
      creatorId
    }

    unlockable {
      category

      asset {
        contentType
        path
      }

      # Note: Keep in sync with useSettleSale Relay store update.
      unlockableWinners {
        ...UnlockableLabel_UnlockableWinnerExpress
        ...useUnlockableCtaType_UnlockableWinnerExpress
      }
    }

    ...useNftKind_MetadataAccount
    ...UnlockableLabel_MetadataAccount
    ...useUnlockableCtaType_MetadataAccount
  }
`;

function shouldRenderComponentType(
  componentType: NftGenericSupplementaryItemType,
  unlockableCallToActionType: Maybe<UnlockableCta>
) {
  switch (componentType) {
    case "standard":
      return unlockableCallToActionType != null;
    case "subtle":
      return unlockableCallToActionType == null;
    default:
      return assertUnreachable(componentType);
  }
}

type Props = {
  componentType: NftGenericSupplementaryItemType;
  metadataAccount: NftPageUnlockableInfo_MetadataAccount$key;
};

export default function NftPageUnlockableInfo({
  componentType,
  metadataAccount,
}: Props) {
  const { setModalType } = useUnlockableModalContext();
  const { user } = useUserContext();
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const nftKind = useNftKind(metadataAccountData);
  const unlockableWinner = getUnlockableWinner(
    metadataAccountData.unlockable?.unlockableWinners,
    nftKind
  );
  const unlockableCta = useUnlockableCtaType(
    metadataAccountData,
    unlockableWinner
  );

  const shouldRender = shouldRenderComponentType(componentType, unlockableCta);

  const { unlockable, primarySaleHappened } = metadataAccountData;
  if (unlockable == null || !primarySaleHappened || !shouldRender) {
    return null;
  }

  const { contentType, path } = unlockable.asset;
  const categoryLabel = getDisplayLabelFromUnlockableCategory(
    unlockable.category
  );

  const activationPriceNotReachedMessage =
    metadataAccountData.nft.creatorId === user?.id ? (
      <Body2 colorClass={ColorClass.Secondary}>
        The activation price was not reached during the auction, so you do not
        have to send this unlockable to the buyer.
      </Body2>
    ) : (
      <Body2 colorClass={ColorClass.Secondary}>
        An unlockable was attached to the original auction of this piece, but
        the activation price was not reached.
      </Body2>
    );

  const unlockableActionButton =
    unlockableWinner != null && unlockableCta != null ? (
      <UnlockableActionButton unlockableCta={unlockableCta} />
    ) : null;

  return (
    <NftGenericSupplementaryItem
      actionButton={unlockableActionButton}
      componentType={componentType}
      description={
        unlockableWinner != null ? (
          <UnlockableLabel
            metadataAccount={metadataAccountData}
            unlockableWinner={unlockableWinner}
          />
        ) : (
          activationPriceNotReachedMessage
        )
      }
      image={
        <NftAsset
          assetSrc={getImgixUrl(path)}
          contentType={contentType}
          playbackId={undefined}
          size={
            componentType === "standard"
              ? NftAssetSize.Size120
              : NftAssetSize.Size64
          }
          showShimmer={false}
        />
      }
      onClick={() => setModalType(UnlockableModalType.UnlockableDetails)}
      title={
        <TinyLabel colorClass={ColorClass.Secondary} textTransform="uppercase">
          {categoryLabel}Unlockable
        </TinyLabel>
      }
    />
  );
}
