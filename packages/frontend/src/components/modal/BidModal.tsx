import { PublicKey } from "@solana/web3.js";
import graphql from "babel-plugin-relay/macro";
import ListingCardForMetadata from "components/auction/ListingCardForMetadata";
import ButtonWithText from "components/buttons/ButtonWithText";
import TextButton from "components/buttons/TextButton";
import BottomDrawer from "components/drawers/BottomDrawer";
import GenericModal from "components/modal/GenericModal";
import { BidModalMutation } from "components/modal/__generated__/BidModalMutation.graphql";
import {
  BidModal_MetadataAccount$data,
  BidModal_MetadataAccount$key,
} from "components/modal/__generated__/BidModal_MetadataAccount.graphql";
import WalletBalance from "components/solana/WalletBalance";
import ArtName from "components/text/ArtName";
import Body1 from "components/text/Body1";
import Body2 from "components/text/Body2";
import { notify } from "components/toast/notifications";
import styles from "css/modal/BidModal.module.css";
import useExchangeRatesContext from "hooks/useExchangeRatesContext";
import useSolanaContext from "hooks/useSolanaContext";
import useWindowDimensions from "hooks/useWindowDimensions";
import { Suspense, useState } from "react";
import { useFragment, useMutation } from "react-relay";
import invariant from "tiny-invariant";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";
import logIfNotProd from "utils/logIfNotProd";
import dayjs from "utils/dates/dayjsex";
import sendTransactionWithWallet from "utils/solana/misc/sendTransactionWithWallet";
import getMinPriceDiff from "utils/getMinPriceDiff";
import useRelayConnectionIdsContext from "hooks/useRelayConnectionIdsContext";
import useNftPageContext from "hooks/useNftPageContext";
import AuctionStatus from "types/enums/AuctionStatus";
import logError from "utils/analytics/logError";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import usePreventRefresh from "hooks/usePreventRefresh";
import LoadingSpinner from "components/loading/LoadingSpinner";
import ColorValue from "types/enums/ColorValue";
import commitRawTxMutation from "utils/relay/commitRawTxMutation";
import isValidPrice from "utils/price/isValidPrice";
import { BOTTOM_DRAWER_BREAKPOINT } from "constants/Breakpoints";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import getNftMintTokenAccountAddressOrAta from "utils/solana/tokens/read/getNftMintTokenAccountAddressOrAta";
import TransactionCommentInput from "components/input/TransactionCommentInput";
import CommitRawTxType from "formfn-shared/dist/types/enums/CommitRawTxType";
import GenericSuccessModalContent from "components/modal/GenericSuccessModalContent";
import FetchGraphqlVariablesDenylist from "types/enums/FetchGraphqlVariablesDenylist";
import useUnlockablePurchaseMessage from "hooks/useUnlockablePurchaseMessage";
import MaxDecimals from "types/enums/MaxDecimals";
import convertToFullDecimals from "formfn-shared/dist/utils/convertToFullDecimals";
import PriceInput from "components/input/PriceInput";
import useGetCurrencyConfigForPrice from "hooks/useGetCurrencyConfigForPrice";
import formatDecimals from "formfn-shared/dist/utils/formatDecimals";
import useNftPriceSymbol from "hooks/useNftPriceSymbol";
import useAuctionHouseSdkForPrice from "hooks/useAuctionHouseSdkForPrice";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import useViewerId from "hooks/useViewerId";
import CampaignBenefitsSection from "components/campaign/CampaignBenefitsSection";

const mutation = graphql`
  mutation BidModalMutation(
    $comment: String
    $creator: String!
    $bidder: String!
    $mint: String!
    $price: bigint!
    $txid: String!
    $owner: String!
    $connections: [ID!]!
    $unlockableWinnerUserEmailInput: UnlockableWinnerUserEmailInput!
  ) {
    insertNftTransaction(
      input: {
        comment: $comment
        creatorId: $creator
        fromUserId: $bidder
        toUserId: $owner
        mint: $mint
        price: $price
        txid: $txid
        type: Bid
      }
    ) {
      transaction
        @prependNode(
          connections: $connections
          edgeTypeName: "NftTransactionsEdge"
        ) {
        ...NftTransaction_NftTransactionExpress
      }

      updatedMetadataAccount {
        ...NftPageContent_MetadataAccount
      }
    }
  }
`;

function BidSending(): JSX.Element {
  return (
    <div className={styles.bidSuccess}>
      <Body1 colorClass={ColorClass.Secondary} textAlign="center">
        Sending bid, please do not refresh or close the window.
      </Body1>
      <LoadingSpinner
        className={styles.sendingSpinner}
        colorValue={ColorValue.BrightPurple}
      />
    </div>
  );
}

function Right({
  isLoading,
  metadataAccountData,
  price,
  onHide,
  onSuccess,
  setIsLoading,
  setPrice,
  setIsSendingTx,
}: {
  isLoading: boolean;
  metadataAccountData: BidModal_MetadataAccount$data;
  onHide: () => void;
  onSuccess: () => void;
  price: string;
  setIsLoading: (val: boolean) => void;
  setIsSendingTx: (val: boolean) => void;
  setPrice: (val: string) => void;
}): JSX.Element {
  const viewerId = useViewerId();
  const unlockablePurchaseMessage =
    useUnlockablePurchaseMessage(metadataAccountData);
  const { priceToUsd } = useExchangeRatesContext();
  const { anchorWallet, connection } = useSolanaContext();
  const auctionHouseSdk = useAuctionHouseSdkForPrice(
    metadataAccountData.nft.priceV2
  );
  const [commit] = useMutation<BidModalMutation>(mutation);
  const {
    nft: {
      priceV2,
      status,
      tickSizeInfo: { tickSizeConstantInLamports },
      auctionEndTime,
    },
    numberOfBidsForCurrentAuction,
  } = metadataAccountData;
  const currentPriceInFullDecimals = Number(priceV2!.amount);
  const { decimals, name: currencyName } = priceV2!.currencyInfo;
  const minPriceDiff =
    status === "Listed" || (numberOfBidsForCurrentAuction ?? 0) === 0
      ? 0
      : getMinPriceDiff(
          currentPriceInFullDecimals,
          decimals,
          tickSizeConstantInLamports
        );
  const formattedPriceMinDiff = formatDecimals(
    currentPriceInFullDecimals + minPriceDiff,
    decimals
  );
  const usdPriceMinDiff = priceToUsd(
    Number(formattedPriceMinDiff),
    currencyName
  );
  const priceInFullDecimals = convertToFullDecimals(price, decimals);
  const { width } = useWindowDimensions();
  const auctionEndTimeToUse =
    auctionEndTime == null ? null : dayjs(auctionEndTime);
  const {
    NftTransactions: { connectionId: nftTransactionsConnectionId },
  } = useRelayConnectionIdsContext();
  const { auctionStatus } = useNftPageContext();
  const [comment, setComment] = useState("");
  const currencyConfig = useGetCurrencyConfigForPrice(priceV2!);
  const { shortSymbol, symbol } = useNftPriceSymbol(priceV2!);

  const onSubmitBidClick = async () => {
    invariant(anchorWallet != null);
    invariant(auctionHouseSdk != null);

    setIsLoading(true);

    try {
      if (auctionStatus === AuctionStatus.Completed) {
        notify({
          description: "You can no longer bid",
          message: "Auction has ended",
          type: "warning",
        });
        setIsLoading(false);
        return;
      }

      const mintKey = new PublicKey(metadataAccountData.mint);
      const tokenAccount = await getNftMintTokenAccountAddressOrAta(
        connection,
        mintKey,
        // Need to use tokenAccount of seller (owner of NFT), not of the buyer
        new PublicKey(metadataAccountData.nft.ownerId)
      );

      const tx = await auctionHouseSdk.buyV2Tx(
        {
          previousBidderWallet:
            metadataAccountData.nft.auctionWinnerId == null
              ? anchorWallet.publicKey
              : new PublicKey(metadataAccountData.nft.auctionWinnerId),
          priceInLamports: priceInFullDecimals,
          tokenAccount,
          tokenMint: mintKey,
          wallet: anchorWallet.publicKey,
        },
        { auctionEndTime: auctionEndTimeToUse ?? undefined }
      );

      const txid = await sendTransactionWithWallet({
        afterSignCallback: (unfinalizedTxid) => {
          setIsSendingTx(true);
          commitRawTxMutation({
            extraData: {
              comment,
            },
            mint: metadataAccountData.mint,
            rawTxType: CommitRawTxType.Bid,
            txid: unfinalizedTxid,
          });
        },
        commitment: "confirmed",
        connection,
        loggingData: {
          mint: mintKey.toString(),
          transactionType: "Bid",
        },
        txs: [tx],
        wallet: anchorWallet,
      });

      if (txid == null) {
        setIsLoading(false);
        setIsSendingTx(false);
        return;
      }

      commit({
        onCompleted: () => {
          notify({ message: "Bid was successful!", txid });
          setIsLoading(false);
          setIsSendingTx(false);
          onSuccess();
        },
        onError: (e) => {
          logIfNotProd("error bidding (graphql)", e);
          notifyUnexpectedError();
          setIsLoading(false);
          setIsSendingTx(false);
        },
        variables: {
          bidder: anchorWallet.publicKey.toString(),
          // TODO: should check more carefully. Only NFTs created on our platform should
          // be able to be listed tho...
          comment: !isEmptyString(comment) ? comment : null,
          [FetchGraphqlVariablesDenylist.Connections]: [
            nftTransactionsConnectionId ?? "",
          ],
          creator: metadataAccountData.nft.creatorId,
          mint: mintKey.toString(),
          owner: metadataAccountData.nft.ownerId,
          price: priceInFullDecimals,
          txid,
          unlockableWinnerUserEmailInput: {
            viewerId,
          },
        },
      });
    } catch (e) {
      logIfNotProd("error bidding (unexpected)", e);
      notifyUnexpectedError();
      logError(AnalyticsEvent.BidModalError, e as Error, {
        metadataAccountData,
        userId: anchorWallet.publicKey.toString(),
      });
      setIsSendingTx(false);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.right}>
      {width > BOTTOM_DRAWER_BREAKPOINT && (
        <ArtName colorClass={ColorClass.Primary}>Bid</ArtName>
      )}
      <Body2 className={styles.description} colorClass={ColorClass.Primary}>
        You must bid at least {formattedPriceMinDiff} {shortSymbol ?? symbol}
        {usdPriceMinDiff != null ? ` (~$${usdPriceMinDiff} USD)` : ""}.
        {unlockablePurchaseMessage}
      </Body2>
      <div className={styles.priceInput}>
        <PriceInput
          currencyConfig={currencyConfig}
          price={price}
          setPrice={(val) => {
            if (!isLoading) {
              setPrice(val);
            }
          }}
          showCurrencySymbol
          showUsdPrice
        />
      </div>
      <Body2 className={styles.noWithdraw} colorClass={ColorClass.Secondary}>
        Bids placed during an auction cannot be withdrawn.
      </Body2>
      <div className={styles.walletBalance}>
        <WalletBalance currencyConfig={currencyConfig} />
      </div>
      {metadataAccountData.nft.CampaignFundingTier != null && (
        <CampaignBenefitsSection
          fundingTierData={metadataAccountData.nft.CampaignFundingTier}
        />
      )}
      <TransactionCommentInput
        buttonText="Optional: Attach a comment to your bid"
        comment={comment}
        setComment={setComment}
      />
      <div className={styles.buttons}>
        {width > BOTTOM_DRAWER_BREAKPOINT && (
          <TextButton
            buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
            fontClass={FontClass.Body1Medium}
            onClick={onHide}
          >
            Nevermind
          </TextButton>
        )}
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          className={styles.bidButton}
          disabled={
            !isValidPrice(price, decimals, MaxDecimals.Price) ||
            convertToFullDecimals(price, decimals) -
              currentPriceInFullDecimals <
              minPriceDiff ||
            auctionStatus === AuctionStatus.HoldingPeriod
          }
          fontClass={FontClass.NavLink}
          isLoading={isLoading}
          onClick={onSubmitBidClick}
        >
          Submit bid
        </ButtonWithText>
      </div>
    </div>
  );
}

const fragment = graphql`
  fragment BidModal_MetadataAccount on MetadataAccount {
    mint

    data {
      name
    }

    nft {
      CampaignFundingTier {
        ...CampaignBenefitsSection_CampaignFundingTierStandard
      }
      priceV2 {
        amount
        currencyInfo {
          decimals
          name
        }
        ...useGetCurrencyConfigForPrice_Price
        ...useAuctionHouseSdkForPrice_Price
        ...useNftPriceSymbol_Price
      }
      auctionEndTime
      auctionWinnerId
      creatorId
      ownerId
      status

      tickSizeInfo {
        tickSizeConstantInLamports
      }
    }

    numberOfBidsForCurrentAuction

    ...ListingCardForMetadata_MetadataAccount
    ...useUnlockablePurchaseMessage_MetadataAccount
  }
`;

type Props = {
  isShown: boolean;
  metadataAccount: BidModal_MetadataAccount$key;
  onHide: () => void;
};

export default function BidModal({
  isShown,
  metadataAccount,
  onHide,
}: Props): JSX.Element {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const [isSuccess, setIsSuccess] = useState(false);
  const [price, setPrice] = useState("");
  const { width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingTx, setIsSendingTx] = useState(false);
  const { shortSymbol, symbol } = useNftPriceSymbol(
    metadataAccountData.nft.priceV2
  );

  usePreventRefresh(isShown && isLoading);

  const onHideAndSetSuccess = () => {
    if (isLoading && !isSuccess) {
      notify({
        duration: 2,
        message: "Please wait for your bid to finish processing",
        type: "info",
      });
      return;
    }

    setIsSuccess(false);
    setPrice("");
    onHide();
  };

  const body = (
    <div className={styles.body}>
      <ListingCardForMetadata
        isBlurredOverride={false}
        enableMaxWidth
        metadataAccount={metadataAccountData}
      />
      <Suspense fallback={null}>
        <Right
          isLoading={isLoading}
          metadataAccountData={metadataAccountData}
          price={price}
          onHide={onHideAndSetSuccess}
          onSuccess={() => setIsSuccess(true)}
          setIsLoading={setIsLoading}
          setPrice={setPrice}
          setIsSendingTx={setIsSendingTx}
        />
      </Suspense>
    </div>
  );

  const content = isSuccess ? (
    <GenericSuccessModalContent
      message={`You successfully placed a bid on ${
        metadataAccountData.data.name
        // Do this to add a leading 0 in cases where people type things like ".6"
      } for ${Number(price).toString()} ${shortSymbol ?? symbol}. We'll
        notify you through email if you win the auction, or if someone places a
        higher bid on this piece.`}
      onHide={onHide}
      type="standard"
    />
  ) : isSendingTx ? (
    <BidSending />
  ) : (
    body
  );
  const title = isSuccess
    ? "Your bid was successful!"
    : isSendingTx
    ? "Please wait..."
    : "Place a bid";

  if (width <= BOTTOM_DRAWER_BREAKPOINT) {
    return (
      <BottomDrawer
        isShown={isShown}
        onHide={onHideAndSetSuccess}
        title={title}
      >
        <div className={styles.bottomDrawerContainer}>{content}</div>
      </BottomDrawer>
    );
  }

  return (
    <GenericModal isShown={isShown} onHide={onHideAndSetSuccess} title={title}>
      {content}
    </GenericModal>
  );
}
