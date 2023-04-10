import graphql from "babel-plugin-relay/macro";
import { useState } from "react";
import { PreloadedQuery, useFragment } from "react-relay";
import { Link } from "react-router-dom";
import ColorValue from "types/enums/ColorValue";
import styles from "css/pages/common/nft/NftPageContent.module.css";
import NftInfo from "components/pages/common/nft/NftInfo";
import FontClass from "types/enums/FontClass";
import MobileTitleAndNav from "components/nav/MobileTitleAndNav";
import useBottomTabsContext from "hooks/useBottomTabsContext";
import ChevronLeftIcon from "components/icons/ChevronLeftIcon";
import GlobalClass from "types/enums/GlobalClass";
import PlainButton from "components/buttons/PlainButton";
import EllipsisIcon from "components/icons/EllipsisIcon";
import OwnedNftBottomDrawer from "components/drawers/OwnedNftBottomDrawer";
import useSolanaContext from "hooks/useSolanaContext";
import OtherNftBottomDrawer from "components/drawers/OtherNftBottomDrawer";
import { HEADER_BREAKPOINT } from "constants/Breakpoints";
import SearchIcon from "components/icons/SearchIcon";
import ImageModal from "components/modal/ImageModal";
import { NftPageContextProvider } from "context/NftPageContext";
import Video from "components/videos/Video";
import formatUsername from "utils/formatUsername";
import VolumeOnIcon from "components/icons/VolumeOnIcon";
import VolumeOffIcon from "components/icons/VolumeOffIcon";
import Imgix, { buildURL } from "react-imgix";
import MaybeImgix from "components/images/MaybeImgix";
import OverlayButton from "components/buttons/OverlayButton";
import NftLeftInfo from "components/pages/common/nft/NftLeftInfo";
import VideoQuality from "types/enums/VideoQuality";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import useDocumentBodyDimensions from "hooks/useDocumentBodyDimensions";
import useIsBottomTabsWidth from "hooks/useIsBottomTabsWidth";
import useWindowDimensions from "hooks/useWindowDimensions";
import NftCollaboratorCard from "components/pages/common/nft/NftCollaboratorCard";
import isListedForSale from "utils/nft/isListedForSale";
import NftPageNextInThisSeriesSection from "components/pages/common/nft/NftPageNextInThisSeriesSection";
import useNftPageNextInThisSeries from "hooks/nft-page/useNftPageNextInThisSeries";
import { useNftPageClaimsQuery } from "hooks/nft-page/__generated__/useNftPageClaimsQuery.graphql";
import { useNftPageEditionsQuery } from "hooks/nft-page/__generated__/useNftPageEditionsQuery.graphql";
import { useNftPageOfferTxsQuery } from "hooks/nft-page/__generated__/useNftPageOfferTxsQuery.graphql";
import { useNftPagePnftAuctionNftsQuery } from "hooks/nft-page/__generated__/useNftPagePnftAuctionNftsQuery.graphql";
import { useNftPageTxsQuery } from "hooks/nft-page/__generated__/useNftPageTxsQuery.graphql";
import { NftPageContent_MetadataAccount$key } from "components/pages/common/nft/__generated__/NftPageContent_MetadataAccount.graphql";
import { NftPageContent_QueryRoot$key } from "components/pages/common/nft/__generated__/NftPageContent_QueryRoot.graphql";
import getAssetDimensions from "utils/nft/getNftAssetDimensions";
import shouldUseWideAssetLayout from "utils/nft/shouldUseWideAssetLayout";
import getUserProfileLinkRelative from "formfn-shared/dist/utils/links/getUserProfileLinkRelative";
import { useQueryLoaderHookType } from "react-relay/relay-hooks/useQueryLoader";
import { useNftPageNftQuery } from "hooks/nft-page/__generated__/useNftPageNftQuery.graphql";
import NftPageUnlockableSection from "components/pages/common/nft/NftPageUnlockableSection";
import arePublicKeysEqual from "formfn-shared/dist/utils/compare/arePublicKeysEqual";
import OverlayContainer from "components/containers/OverlayContainer";
import { UnlockableModalContextProvider } from "context/UnlockableModalContext";
import IgnoreResponsivePageBodyPadding from "components/containers/IgnoreResponsivePageBodyPadding";
import { useNftPageEditionBuyerInfoQuery } from "hooks/nft-page/__generated__/useNftPageEditionBuyerInfoQuery.graphql";
import { useNftPageCampaignQuery } from "hooks/nft-page/__generated__/useNftPageCampaignQuery.graphql";
import AssetForAssetExpress from "components/assets/AssetForAssetExpress";
import useUserContext from "hooks/useUserContext";
import useDoesNftHaveDisclosure from "hooks/useDoesNftHaveDisclosure";
import NftNsfwWarningModal from "components/modal/NftNsfwWarningModal";
import joinClasses from "utils/joinClasses";

const nftFragment = graphql`
  fragment NftPageContent_MetadataAccount on MetadataAccount {
    id
    assetHeight
    assetWidth
    contentType
    videoPlaybackId

    offchainData {
      image
    }

    nonstandardAsset {
      ...AssetForAssetExpress_AssetExpress
    }

    nft {
      creatorId
      ownerId
      status

      Series {
        id
        type

        ...NftPageNextInThisSeriesSection_SeriesExpress
      }

      Creator {
        id
        username
      }

      ...useDoesNftHaveDisclosure_NftExpress
    }

    ...NftCollaboratorCard_MetadataAccount
    ...NftLeftInfo_MetadataAccount
    ...NftPageContext_MetadataAccount
    ...NftInfo_MetadataAccount
    ...OtherNftBottomDrawer_MetadataAccount
    ...OwnedNftBottomDrawer_MetadataAccount
    ...NftPageUnlockableSection_MetadataAccount
  }
`;

const queryFragment = graphql`
  fragment NftPageContent_QueryRoot on query_root {
    nftPageExtras(input: { mint: $mint }) {
      ...NftInfo_NftPageExtrasResponse
    }

    pnftInfo(input: { auctionNftMint: $mint }) {
      ...NftInfo_PnftInfoResponse
    }
  }
`;

type Props = {
  claimsQueryRef: MaybeUndef<PreloadedQuery<useNftPageClaimsQuery>>;
  editionBuyerInfoQueryRef: MaybeUndef<
    PreloadedQuery<useNftPageEditionBuyerInfoQuery>
  >;
  editionsQueryRef: MaybeUndef<PreloadedQuery<useNftPageEditionsQuery>>;
  loadClaimsQuery: useQueryLoaderHookType<useNftPageClaimsQuery>[1];
  loadEditionBuyerInfoQuery: useQueryLoaderHookType<useNftPageEditionBuyerInfoQuery>[1];
  loadNftQuery: useQueryLoaderHookType<useNftPageNftQuery>[1];
  metadataAccount: NftPageContent_MetadataAccount$key;
  mint: string;
  nftCampaignQueryRef: MaybeUndef<PreloadedQuery<useNftPageCampaignQuery>>;
  offerTransactionsQueryRef: MaybeUndef<
    PreloadedQuery<useNftPageOfferTxsQuery>
  >;
  pnftAuctionNftsQueryRef: MaybeUndef<
    PreloadedQuery<useNftPagePnftAuctionNftsQuery>
  >;
  queryRoot: NftPageContent_QueryRoot$key;
  transactionsQueryRef: MaybeUndef<PreloadedQuery<useNftPageTxsQuery>>;
};

export default function NftPageContent({
  claimsQueryRef,
  editionBuyerInfoQueryRef,
  editionsQueryRef,
  loadClaimsQuery,
  loadEditionBuyerInfoQuery,
  loadNftQuery,
  metadataAccount,
  mint,
  nftCampaignQueryRef,
  offerTransactionsQueryRef,
  pnftAuctionNftsQueryRef,
  queryRoot,
  transactionsQueryRef,
}: Props): JSX.Element {
  const { user } = useUserContext();
  const isBottomTabsWidth = useIsBottomTabsWidth();
  const { width: documentWidth } = useDocumentBodyDimensions();
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const { hasBottomTabs } = useBottomTabsContext();
  const [isBottomDrawerShown, setIsBottomDrawerShown] = useState(false);
  const { anchorWallet } = useSolanaContext();
  const [isImageModalShown, setIsImageModalShown] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const metadataAccountData = useFragment(nftFragment, metadataAccount);
  const {
    contentType,
    offchainData,
    assetHeight,
    assetWidth,
    videoPlaybackId,
    nft,
  } = metadataAccountData;

  const isNftNsfw = useDoesNftHaveDisclosure(nft, "Nsfw");
  const [shouldShowNsfwWarningModal, setShouldShowNsfwWarningModal] = useState(
    isNftNsfw && (user == null || user.shouldBlurNsfwContent)
  );

  const { Series } = nft;
  const { id: seriesId } = Series ?? {};

  const queryRootData = useFragment(queryFragment, queryRoot);
  const nextInThisSeriesQueryRef = useNftPageNextInThisSeries(
    mint,
    seriesId ?? ""
  );
  const isOwner =
    anchorWallet?.publicKey != null &&
    arePublicKeysEqual(anchorWallet.publicKey, nft.ownerId);

  const isVideo =
    contentType.includes("video") ||
    // Not sure why this is needed... but seeing some bugs on prod
    offchainData.image.includes("mp4");

  const isWideAsset = shouldUseWideAssetLayout(assetHeight, assetWidth);
  const assetDimensions = getAssetDimensions(
    assetHeight,
    assetWidth,
    windowHeight,
    windowWidth,
    documentWidth
  );
  const assetSrc = offchainData.image;
  const assetImgixSrc = assetSrc.includes("imgix")
    ? buildURL(assetSrc, { q: 100 })
    : assetSrc;

  // TODO[@bryancho]: refactor this to use other asset components so we can
  // consolidate blur logic
  const blurClassName = shouldShowNsfwWarningModal
    ? styles.imageBlur
    : undefined;
  const classNameToUse = joinClasses(styles.image, blurClassName);

  // TODO[@arcticmatt]: would be nice to just re-use the Asset components for all this
  const asset = (
    <div className={styles.imageContainer} style={assetDimensions ?? {}}>
      {metadataAccountData.nonstandardAsset != null ? (
        <AssetForAssetExpress
          className={blurClassName}
          asset={metadataAccountData.nonstandardAsset}
          focusOnIframe
          height={assetDimensions?.height ?? "100%"}
          objectFit="cover"
          width={assetDimensions?.width ?? "100%"}
        />
      ) : isVideo ? (
        <Video
          className={classNameToUse}
          isMuted={isMuted || isImageModalShown}
          playbackId={videoPlaybackId}
          showShimmer
          src={assetSrc}
          quality={VideoQuality.Best}
        />
      ) : (
        <MaybeImgix showShimmer src={assetSrc}>
          <Imgix
            className={classNameToUse}
            // For some reason, https://formfunction.xyz/@joiceloo/MCPpB5uW67QJVDkgNNGicyD72PLcDb2kUVNgSEwo9os?width=1050&height=1050 has terrible perf without disabling this
            disableSrcSet={contentType.includes("gif")}
            src={assetImgixSrc}
            width={isWideAsset && windowWidth >= 600 ? 1440 : 800}
          />
          <img className={classNameToUse} src={assetSrc} />
        </MaybeImgix>
      )}
      {metadataAccountData.nonstandardAsset == null && (
        <OverlayContainer className={styles.overlay}>
          {isVideo &&
            (isMuted || isImageModalShown ? (
              <OverlayButton
                className={FontClass.Body2}
                onClick={() => setIsMuted(false)}
              >
                <VolumeOffIcon colorValue={ColorValue.White} />
              </OverlayButton>
            ) : (
              <OverlayButton
                className={FontClass.Body2}
                onClick={() => setIsMuted(true)}
              >
                <VolumeOnIcon colorValue={ColorValue.White} />
              </OverlayButton>
            ))}
          {!isBottomTabsWidth && (
            <OverlayButton
              className={FontClass.Body2}
              onClick={() => setIsImageModalShown(true)}
            >
              <SearchIcon colorValue={ColorValue.White} size={24} />
              Expand
            </OverlayButton>
          )}
        </OverlayContainer>
      )}
    </div>
  );

  return (
    <NftPageContextProvider
      editionBuyerInfoQueryRef={editionBuyerInfoQueryRef}
      loadClaimsQuery={loadClaimsQuery}
      loadEditionBuyerInfoQuery={loadEditionBuyerInfoQuery}
      loadNftQuery={loadNftQuery}
      metadataAccount={metadataAccountData}
      nftCampaignQueryRef={nftCampaignQueryRef}
    >
      <NftNsfwWarningModal
        isShown={shouldShowNsfwWarningModal}
        onHide={() => setShouldShowNsfwWarningModal(false)}
      />
      {isOwner && isListedForSale(nft.status) ? (
        <OwnedNftBottomDrawer
          isShown={isBottomDrawerShown}
          metadataAccount={metadataAccountData}
          onHide={() => setIsBottomDrawerShown(false)}
        />
      ) : (
        <OtherNftBottomDrawer
          isShown={isBottomDrawerShown}
          metadataAccount={metadataAccountData}
          onHide={() => setIsBottomDrawerShown(false)}
        />
      )}
      <ImageModal
        isMuted={isMuted}
        isShown={isImageModalShown}
        isVideo={isVideo}
        onHide={() => setIsImageModalShown(false)}
        setIsMuted={setIsMuted}
        src={assetImgixSrc}
      />
      <NftCollaboratorCard metadataAccount={metadataAccountData} />
      {windowWidth > HEADER_BREAKPOINT && isWideAsset && (
        <div className={styles.wideAssetContainer}>{asset}</div>
      )}
      <div className={styles.body}>
        {hasBottomTabs && (
          <MobileTitleAndNav
            left={
              nft.Creator != null && (
                <Link
                  className={GlobalClass.HideText}
                  to={getUserProfileLinkRelative(nft.Creator.username)}
                >
                  <ChevronLeftIcon colorValue={ColorValue.Secondary} />
                </Link>
              )
            }
            right={
              <PlainButton
                className={GlobalClass.HideText}
                onClick={() => setIsBottomDrawerShown(true)}
              >
                <EllipsisIcon colorValue={ColorValue.Secondary} />
              </PlainButton>
            }
            title={
              nft.Creator != null
                ? `@${formatUsername(nft.Creator.username)!}`
                : nft.creatorId
            }
          />
        )}
        {windowWidth > HEADER_BREAKPOINT && !isWideAsset && (
          <div className={styles.left}>
            {asset}
            <NftLeftInfo metadataAccount={metadataAccountData} />
          </div>
        )}
        {windowWidth <= HEADER_BREAKPOINT && (
          <div className={styles.left}>{asset}</div>
        )}
        <UnlockableModalContextProvider>
          <div className={styles.info}>
            {transactionsQueryRef != null &&
              claimsQueryRef != null &&
              editionsQueryRef != null &&
              offerTransactionsQueryRef != null &&
              pnftAuctionNftsQueryRef != null && (
                <NftInfo
                  claimsQueryRef={claimsQueryRef}
                  editionsQueryRef={editionsQueryRef}
                  metadataAccount={metadataAccountData}
                  nftPageExtras={queryRootData.nftPageExtras}
                  offerTransactionsQueryRef={offerTransactionsQueryRef}
                  pnftAuctionNftsQueryRef={pnftAuctionNftsQueryRef}
                  pnftInfo={queryRootData.pnftInfo}
                  transactionsQueryRef={transactionsQueryRef}
                />
              )}
            {(windowWidth <= HEADER_BREAKPOINT || isWideAsset) && (
              <NftLeftInfo metadataAccount={metadataAccountData} />
            )}
          </div>
        </UnlockableModalContextProvider>
      </div>
      <IgnoreResponsivePageBodyPadding
        ignoreBottomPadding
        ignoreTopPadding={false}
      >
        <div className={styles.bottomContentContainer}>
          <NftPageUnlockableSection metadataAccount={metadataAccountData} />
          {/* We only show Next In This Series for user curated series as they
           * have orders defined by the user. In other cases, (such as generative series)
           * there is no suitable "default" order and thus we hide this section
           */}
          {Series?.type === "UserCurated" &&
            nextInThisSeriesQueryRef != null && (
              <NftPageNextInThisSeriesSection
                series={Series}
                metadataAccountsQueryRef={nextInThisSeriesQueryRef}
              />
            )}
        </div>
      </IgnoreResponsivePageBodyPadding>
    </NftPageContextProvider>
  );
}
