import graphql from "babel-plugin-relay/macro";
import {
  PreloadedQuery,
  useFragment,
  usePaginationFragment,
  usePreloadedQuery,
} from "react-relay";
import {
  NftActionButton_MetadataAccount$data,
  NftActionButton_MetadataAccount$key,
} from "components/buttons/__generated__/NftActionButton_MetadataAccount.graphql";
import ListNftButton from "components/buttons/ListNftButton";
import useSolanaContext from "hooks/useSolanaContext";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import BidButton from "components/buttons/BidButton";
import useUserContext from "hooks/useUserContext";
import SettleButton from "components/buttons/SettleButton";
import NftTimeExtensionInfo from "components/pages/common/nft/NftTimeExtensionInfo";
import useNftPageContext from "hooks/useNftPageContext";
import AuctionStatus from "types/enums/AuctionStatus";
import { Suspense, useState } from "react";
import BidModal from "components/modal/BidModal";
import ConnectWalletButton from "components/buttons/ConnectWalletButton";
import styles from "css/buttons/NftActionButton.module.css";
import SettleModal from "components/modal/SettleModal";
import BuyNowButton from "components/buttons/BuyNowButton";
import BuyNowModal from "components/modal/BuyNowModal";
import MakeAnOfferModal from "components/modal/MakeAnOfferModal";
import MakeAnOfferButton from "components/buttons/MakeAnOfferButton";
import HowAuctionsWorkButton from "components/buttons/HowAuctionsWorkButton";
import CancelOfferModal from "components/modal/CancelOfferModal";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import BuyEditionModal from "components/modal/BuyEditionModal";
import useNftKind from "hooks/useNftKind";
import NftKind from "formfn-shared/dist/types/enums/NftKind";
import shouldShowOffersForNftKind from "utils/nft/shouldShowOffersForNftKind";
import { useNftPageOfferTxsQuery } from "hooks/nft-page/__generated__/useNftPageOfferTxsQuery.graphql";
import {
  offerTxsFragment,
  offerTxsQuery,
} from "hooks/nft-page/useNftPageOfferTxs";
import { NftOfferTransactionsPaginationQuery } from "hooks/nft-page/__generated__/NftOfferTransactionsPaginationQuery.graphql";
import { useNftPageOfferTxs_Query$key } from "hooks/nft-page/__generated__/useNftPageOfferTxs_Query.graphql";
import arePublicKeysEqual from "formfn-shared/dist/utils/compare/arePublicKeysEqual";
import dayjs from "utils/dates/dayjsex";
import { useNftPageEditionBuyerInfoQuery } from "hooks/nft-page/__generated__/useNftPageEditionBuyerInfoQuery.graphql";
import { editionBuyerInfoQuery } from "hooks/nft-page/useNftPageEditionBuyerInfo";
import { NftActionButton_EditionBuyerInfoResponse$key } from "components/buttons/__generated__/NftActionButton_EditionBuyerInfoResponse.graphql";

const fragment = graphql`
  fragment NftActionButton_MetadataAccount on MetadataAccount {
    id

    nft {
      id
      editionAllowlistEnabled
      editionAllowlistSaleStartTime
      editionPublicSaleStartTime
      isOffPlatform
      ownerId
      status
    }

    numberOfBidsForCurrentAuction

    ...MakeAnOfferModal_MetadataAccount
    ...HowAuctionsWorkButton_MetadataAccount
    ...BidModal_MetadataAccount
    ...BuyEditionModal_MetadataAccount
    ...BuyNowModal_MetadataAccount
    ...ListNftButton_MetadataAccount
    ...NftTimeExtensionInfo_MetadataAccount
    ...SettleModal_MetadataAccount
    ...CancelOfferModal_MetadataAccount
    ...useNftKind_MetadataAccount
  }
`;

const editionBuyerInfoFragment = graphql`
  fragment NftActionButton_EditionBuyerInfoResponse on EditionBuyerInfoResponse {
    merkleAllowlistInfo {
      amountAllowed
      amountMinted
    }
  }
`;

function useShouldDisableActionButtonFragmentLoader(
  editionBuyerInfo: NftActionButton_EditionBuyerInfoResponse$key,
  metadataAccountData: NftActionButton_MetadataAccount$data
) {
  const { anchorWallet } = useSolanaContext();
  const { merkleAllowlistInfo } = useFragment(
    editionBuyerInfoFragment,
    editionBuyerInfo
  );

  const {
    editionAllowlistEnabled,
    editionAllowlistSaleStartTime,
    editionPublicSaleStartTime,
  } = metadataAccountData.nft;

  if (!editionAllowlistEnabled) {
    return false;
  }

  if (
    editionPublicSaleStartTime != null &&
    dayjs().isSameOrAfter(editionPublicSaleStartTime)
  ) {
    // Public sale has started
    return false;
  }

  if (
    editionAllowlistSaleStartTime != null &&
    dayjs().isBefore(dayjs(editionAllowlistSaleStartTime))
  ) {
    // Allowlist sale has not started
    return true;
  }

  if (merkleAllowlistInfo == null) {
    // Not on the allowlist
    return true;
  }

  const { amountAllowed, amountMinted } = merkleAllowlistInfo;
  // Check if user has minted max allowed amount

  return amountMinted >= amountAllowed || anchorWallet == null;
}

function useShouldDisableActionButton(
  editionBuyerInfoQueryRef: PreloadedQuery<useNftPageEditionBuyerInfoQuery>,
  metadataAccountData: NftActionButton_MetadataAccount$data
) {
  const { editionBuyerInfo } =
    usePreloadedQuery<useNftPageEditionBuyerInfoQuery>(
      editionBuyerInfoQuery,
      editionBuyerInfoQueryRef
    );

  return useShouldDisableActionButtonFragmentLoader(
    editionBuyerInfo,
    metadataAccountData
  );
}

function NftActionButtonForOwner({
  metadataAccountData,
  setIsSettleModalShown,
}: {
  metadataAccountData: NftActionButton_MetadataAccount$data;
  setIsSettleModalShown: (val: boolean) => void;
}): Maybe<JSX.Element> {
  const { nft } = metadataAccountData;
  const { status } = nft;
  const { isAuctionEnded } = useNftPageContext();
  const receivedBids =
    (metadataAccountData.numberOfBidsForCurrentAuction ?? 0) > 0;

  if (status === "Owned") {
    return <ListNftButton metadataAccount={metadataAccountData} />;
  }
  if (status === "Auction" && isAuctionEnded) {
    return !receivedBids ? null : (
      <SettleButton setIsSettleModalShown={setIsSettleModalShown} />
    );
  }

  return null;
}

// TODO[@][refactor] refactor to use fragment
function NftActionButtonForCollector({
  disabledNotAllowlisted,
  metadataAccountData,
  nftKind,
  offerTransactionsQueryRef,
  setIsBuyEditionModalShown,
  setIsBuyNowModalShown,
}: {
  disabledNotAllowlisted: boolean;
  metadataAccountData: NftActionButton_MetadataAccount$data;
  nftKind: NftKind;
  offerTransactionsQueryRef: PreloadedQuery<useNftPageOfferTxsQuery>;
  setIsBuyEditionModalShown: (val: boolean) => void;
  setIsBuyNowModalShown: (val: boolean) => void;
}): Maybe<JSX.Element> {
  const { nft } = metadataAccountData;
  const { status } = nft;
  const { user } = useUserContext();
  const [isCancelOfferFirstModalShown, setIsCancelOfferFirstModalShown] =
    useState(false);
  const [isBidModalShown, setIsBidModalShown] = useState(false);
  const [isMakeAnOfferModalShown, setIsMakeAnOfferModalShown] = useState(false);
  const { auctionStatus, isAuctionEnded } = useNftPageContext();

  const queryData = usePreloadedQuery<useNftPageOfferTxsQuery>(
    offerTxsQuery,
    offerTransactionsQueryRef
  );

  const { data } = usePaginationFragment<
    NftOfferTransactionsPaginationQuery,
    useNftPageOfferTxs_Query$key
  >(offerTxsFragment, queryData);

  const existingOffer =
    user != null
      ? data.nftOffers.nftOffers.edges.find(
          ({ node }) => node.transaction.fromAddress === user?.id
        )
      : null;

  const makeAnOfferButton =
    existingOffer == null &&
    metadataAccountData.nft.status !== "Auction" &&
    shouldShowOffersForNftKind(nftKind) ? (
      <MakeAnOfferButton onClick={() => setIsMakeAnOfferModalShown(true)} />
    ) : null;

  const cancelFirstModal = existingOffer != null && (
    <CancelOfferModal
      description={
        "You must cancel your current offer on this piece before you can place a bid or buy it." +
        " When you cancel the offer, the funds from the offer will be returned to you."
      }
      metadataAccount={metadataAccountData}
      isShown={isCancelOfferFirstModalShown}
      onHide={() => setIsCancelOfferFirstModalShown(false)}
      offerTransaction={existingOffer.node.transaction}
      title="Cancel your offer?"
    />
  );

  const bidModal = (
    <BidModal
      isShown={isBidModalShown}
      metadataAccount={metadataAccountData}
      onHide={() => setIsBidModalShown(false)}
    />
  );

  const makeAnOfferModal = (
    <MakeAnOfferModal
      isShown={isMakeAnOfferModalShown}
      metadataAccount={metadataAccountData}
      onHide={() => setIsMakeAnOfferModalShown(false)}
    />
  );

  const bidButton = (
    <BidButton
      onClick={() =>
        existingOffer != null
          ? setIsCancelOfferFirstModalShown(true)
          : setIsBidModalShown(true)
      }
    />
  );

  const buyNowButton = (
    <BuyNowButton
      onClick={() =>
        existingOffer != null
          ? setIsCancelOfferFirstModalShown(true)
          : setIsBuyNowModalShown(true)
      }
    />
  );

  const buyEditionButton = (
    <BuyNowButton
      disabled={disabledNotAllowlisted}
      onClick={() => setIsBuyEditionModalShown(true)}
    />
  );

  const howDoAuctionsWorkButton = (
    <HowAuctionsWorkButton metadataAccount={metadataAccountData} />
  );

  switch (status) {
    case "Listed":
      return (
        <>
          {bidModal}
          {cancelFirstModal}
          {makeAnOfferModal}
          <div className={styles.buttons}>
            {bidButton}
            {makeAnOfferButton}
            {makeAnOfferButton == null && howDoAuctionsWorkButton}
          </div>
          {makeAnOfferButton != null && howDoAuctionsWorkButton}
        </>
      );
    case "ListedEditions":
      return buyEditionButton;
    case "ListedInstantSale":
      return (
        <>
          {cancelFirstModal}
          {makeAnOfferModal}
          <div className={styles.buttons}>
            {buyNowButton}
            {makeAnOfferButton}
          </div>
        </>
      );
    case "Auction": {
      if (isAuctionEnded || auctionStatus === AuctionStatus.HoldingPeriod) {
        // Only owner can settle
        //
        // This also handles the case where a scheduled auction finished with no bids.
        // The time period where that is the case should be short, since the backend will automatically
        // update the NFT's status if a scheduled auction ends with no bids.
        return bidModal;
      }

      return (
        <>
          {bidModal}
          {cancelFirstModal}
          <div className={styles.auctionButtons}>
            <div className={styles.buttons}>
              {bidButton}
              {howDoAuctionsWorkButton}
            </div>
            <NftTimeExtensionInfo metadataAccount={metadataAccountData} />
          </div>
        </>
      );
    }
    case "ListingScheduled":
    case "Owned": {
      return (
        <>
          {makeAnOfferButton}
          {makeAnOfferModal}
        </>
      );
    }
    case "AirdropInProgress":
    case "AirdropCompleted":
    case "Burned":
    case "OwnedStoppedMintingForEditions":
    case "SoldOutEditions":
    case RELAY_FUTURE_ADDED_VALUE:
      return null;
    default:
      return assertUnreachable(status);
  }
}

function Inner({
  disabledNotAllowlisted,
  metadataAccount,
  offerTransactionsQueryRef,
}: {
  disabledNotAllowlisted: boolean;
  metadataAccount: NftActionButton_MetadataAccount$key;
  offerTransactionsQueryRef: PreloadedQuery<useNftPageOfferTxsQuery>;
}): Maybe<JSX.Element> {
  const { anchorWallet } = useSolanaContext();
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const nftKind = useNftKind(metadataAccountData);
  const { nft } = metadataAccountData;
  const { user } = useUserContext();
  const [isSettleModalShown, setIsSettleModalShown] = useState(false);
  const { ownerId, status } = nft;
  const isOwner =
    anchorWallet?.publicKey != null &&
    arePublicKeysEqual(anchorWallet.publicKey, ownerId);
  const { isAuctionEnded, editionBuyerInfoQueryRef } = useNftPageContext();
  const [isBuyNowModalShown, setIsBuyNowModalShown] = useState(false);
  const [isBuyEditionModalShown, setIsBuyEditionModalShown] = useState(false);

  const buyEditionModal =
    editionBuyerInfoQueryRef == null ? null : (
      <Suspense fallback={null}>
        <BuyEditionModal
          editionBuyerInfoQueryRef={editionBuyerInfoQueryRef}
          isShown={isBuyEditionModalShown}
          metadataAccount={metadataAccountData}
          onHide={() => setIsBuyEditionModalShown(false)}
        />
      </Suspense>
    );

  const buyNowModal = (
    <BuyNowModal
      metadataAccount={metadataAccountData}
      isShown={isBuyNowModalShown}
      onHide={() => setIsBuyNowModalShown(false)}
    />
  );

  const settleModal = (
    <SettleModal
      isShown={isSettleModalShown}
      metadataAccount={metadataAccountData}
      onHide={() => setIsSettleModalShown(false)}
    />
  );

  const actionButtonForCollector = (
    <Suspense fallback={null}>
      <NftActionButtonForCollector
        disabledNotAllowlisted={disabledNotAllowlisted}
        metadataAccountData={metadataAccountData}
        nftKind={nftKind}
        offerTransactionsQueryRef={offerTransactionsQueryRef}
        setIsBuyNowModalShown={setIsBuyNowModalShown}
        setIsBuyEditionModalShown={setIsBuyEditionModalShown}
      />
    </Suspense>
  );

  if (nft.isOffPlatform) {
    return null;
  }

  if (anchorWallet == null || user?.id == null) {
    return anchorWallet === undefined || user === undefined ? null : (
      <div className={styles.button}>
        <ConnectWalletButton showAccountSetupModal={false} />
      </div>
    );
  }

  if (isOwner) {
    if (status === "Owned" || (status === "Auction" && isAuctionEnded)) {
      return (
        <>
          {/* Need to show this here because after auction has been settled, NFT status changes.
          But we still want to show the SettleModal until the user closes it. This case where isOwner is true should
          be very rare though (only applies if NFT transferred back to owner) */}
          {settleModal}
          {/* Same applies to buy now modal and buy edition modal */}
          {buyEditionModal}
          {buyNowModal}
          <NftActionButtonForOwner
            metadataAccountData={metadataAccountData}
            setIsSettleModalShown={setIsSettleModalShown}
          />
        </>
      );
    }
  } else {
    if (status === "Owned") {
      return (
        <>
          {/* Need to show this here because after auction has been settled, NFT status changes. But we
          still want to show the SettleModal until the user closes it. */}
          {settleModal}
          {actionButtonForCollector}
        </>
      );
    }

    return (
      <>
        {actionButtonForCollector}
        {buyEditionModal}
        {buyNowModal}
      </>
    );
  }

  return null;
}

type Props = {
  metadataAccount: NftActionButton_MetadataAccount$key;
  offerTransactionsQueryRef: PreloadedQuery<useNftPageOfferTxsQuery>;
};

function CheckAllowlist({
  editionBuyerInfoQueryRef,
  metadataAccount,
  offerTransactionsQueryRef,
}: Props & {
  editionBuyerInfoQueryRef: PreloadedQuery<useNftPageEditionBuyerInfoQuery>;
}) {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const shouldDisable = useShouldDisableActionButton(
    editionBuyerInfoQueryRef,
    metadataAccountData
  );

  return (
    <Inner
      disabledNotAllowlisted={shouldDisable}
      metadataAccount={metadataAccount}
      offerTransactionsQueryRef={offerTransactionsQueryRef}
    />
  );
}

export default function NftActionButton({
  metadataAccount,
  offerTransactionsQueryRef,
}: Props): Maybe<JSX.Element> {
  const { editionBuyerInfoQueryRef } = useNftPageContext();
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const { editionAllowlistEnabled, editionPublicSaleStartTime } =
    metadataAccountData.nft;

  if (
    editionBuyerInfoQueryRef == null ||
    !editionAllowlistEnabled ||
    (editionPublicSaleStartTime != null &&
      dayjs().isSameOrAfter(editionPublicSaleStartTime))
  ) {
    // We do this so that if an allowlist is not enabled, we don't
    // load the allowlist query and suspend on it unnecessarily
    return (
      <Inner
        disabledNotAllowlisted={false}
        metadataAccount={metadataAccount}
        offerTransactionsQueryRef={offerTransactionsQueryRef}
      />
    );
  }

  return (
    <Suspense fallback={null}>
      <CheckAllowlist
        editionBuyerInfoQueryRef={editionBuyerInfoQueryRef}
        metadataAccount={metadataAccount}
        offerTransactionsQueryRef={offerTransactionsQueryRef}
      />
    </Suspense>
  );
}
