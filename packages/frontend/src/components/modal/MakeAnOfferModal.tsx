import graphql from "babel-plugin-relay/macro";
import ListingCardForMetadata from "components/auction/ListingCardForMetadata";
import ButtonWithText from "components/buttons/ButtonWithText";
import TextButton from "components/buttons/TextButton";
import BottomDrawer from "components/drawers/BottomDrawer";
import GenericModal from "components/modal/GenericModal";
import {
  MakeAnOfferModal_MetadataAccount$data,
  MakeAnOfferModal_MetadataAccount$key,
} from "components/modal/__generated__/MakeAnOfferModal_MetadataAccount.graphql";
import WalletBalance from "components/solana/WalletBalance";
import ArtName from "components/text/ArtName";
import Body2 from "components/text/Body2";
import { notify } from "components/toast/notifications";
import styles from "css/modal/MakeAnOfferModal.module.css";
import useWindowDimensions from "hooks/useWindowDimensions";
import { useState } from "react";
import {
  ConnectionHandler,
  fetchQuery,
  useFragment,
  useMutation,
} from "react-relay";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";
import usePreventRefresh from "hooks/usePreventRefresh";
import isValidPrice from "utils/price/isValidPrice";
import { BOTTOM_DRAWER_BREAKPOINT } from "constants/Breakpoints";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import useSolanaContext from "hooks/useSolanaContext";
import invariant from "tiny-invariant";
import { PublicKey } from "@solana/web3.js";
import sendTransactionWithWallet from "utils/solana/misc/sendTransactionWithWallet";
import commitRawTxMutation from "utils/relay/commitRawTxMutation";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import logError from "utils/analytics/logError";
import { MakeAnOfferModalMutation } from "components/modal/__generated__/MakeAnOfferModalMutation.graphql";
import logIfNotProd from "utils/logIfNotProd";
import dayjs from "utils/dates/dayjsex";
import getNftOfferTransactionsConnection from "utils/relay/getNftOfferTransactionsConnection";
import getNftMintTokenAccountAddressOrAta from "utils/solana/tokens/read/getNftMintTokenAccountAddressOrAta";
import { MakeAnOfferModalNftOwnerQuery } from "components/modal/__generated__/MakeAnOfferModalNftOwnerQuery.graphql";
import RelayEnvironment from "utils/relay/RelayEnvironment";
import TransactionCommentInput from "components/input/TransactionCommentInput";
import CommitRawTxType from "formfn-shared/dist/types/enums/CommitRawTxType";
import { OFFER_EXPIRATION_TIME_DEFAULT_DURATION } from "formfn-shared/dist/constants/OfferConstants";
import useUnlockablePurchaseMessage from "hooks/useUnlockablePurchaseMessage";
import PriceInput from "components/input/PriceInput";
import convertToFullDecimals from "formfn-shared/dist/utils/convertToFullDecimals";
import MaxDecimals from "types/enums/MaxDecimals";
import SOLANA_CURRENCY_CONFIG from "constants/SolanaCurrencyConfig";
import CurrencyConfig from "types/CurrencyConfig";
import canSelectedCurrencyBeUsed from "utils/currency/canSelectedCurrencyBeUsed";
import CurrencyError from "components/currency/CurrencyError";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import useViewerId from "hooks/useViewerId";
import MakeAnOfferModalCurrencySelect from "components/modal/MakeAnOfferModalCurrencySelect";
import CampaignBenefitsSection from "components/campaign/CampaignBenefitsSection";

// TODO: update prepend node stuff after creating offers tx connection
const mutation = graphql`
  mutation MakeAnOfferModalMutation(
    $comment: String
    $currencyName: CurrencyNameExpress_enum!
    $creator: String!
    $buyer: String!
    $mint: String!
    $price: bigint!
    $txid: String!
    $owner: String!
    $unlockableWinnerUserEmailInput: UnlockableWinnerUserEmailInput!
  ) {
    insertNftTransaction(
      input: {
        comment: $comment
        currencyName: $currencyName
        creatorId: $creator
        fromUserId: $buyer
        toUserId: $owner
        mint: $mint
        price: $price
        txid: $txid
        type: Offer
      }
    ) {
      transaction {
        ...NftOffer_NftTransactionExpress
      }
      updatedMetadataAccount {
        nft {
          mint
        }

        ...NftPageContent_MetadataAccount
      }
    }
  }
`;

const ownerQuery = graphql`
  query MakeAnOfferModalNftOwnerQuery($mint: String!) {
    Nft(where: { mint: { _eq: $mint } }) {
      ownerId
    }
  }
`;

function Right({
  isLoading,
  metadataAccountData,
  price,
  onHide,
  setIsLoading,
  setPrice,
}: {
  isLoading: boolean;
  metadataAccountData: MakeAnOfferModal_MetadataAccount$data;
  onHide: () => void;
  price: string;
  setIsLoading: (val: boolean) => void;
  setPrice: (val: string) => void;
}): JSX.Element {
  const viewerId = useViewerId();
  const unlockablePurchaseMessage =
    useUnlockablePurchaseMessage(metadataAccountData);
  const { width } = useWindowDimensions();
  const { anchorWallet, getAuctionHouseSdk, connection } = useSolanaContext();
  const [comment, setComment] = useState("");
  const [commit] = useMutation<MakeAnOfferModalMutation>(mutation);
  const [currencyConfig, setCurrencyConfig] = useState<Maybe<CurrencyConfig>>(
    SOLANA_CURRENCY_CONFIG
  );
  invariant(currencyConfig != null);
  const priceInFullDecimals = convertToFullDecimals(
    price,
    currencyConfig.decimals
  );
  const auctionHouseSdk = getAuctionHouseSdk(currencyConfig.name);
  const showCurrencyError = !canSelectedCurrencyBeUsed(
    currencyConfig!.name,
    metadataAccountData.data.creators?.length ?? 1
  );

  const onSubmitBidClick = async () => {
    invariant(anchorWallet != null);
    invariant(auctionHouseSdk != null);

    setIsLoading(true);

    if (metadataAccountData.nft.status === "Auction") {
      notify({
        description: "You can no longer make an offer",
        message: "Auction has started",
        type: "warning",
      });
      setIsLoading(false);
      return;
    }

    const ownerData = await fetchQuery<MakeAnOfferModalNftOwnerQuery>(
      RelayEnvironment,
      ownerQuery,
      {
        mint: metadataAccountData.mint,
      }
    ).toPromise();
    if (ownerData?.Nft[0].ownerId !== metadataAccountData.nft.ownerId) {
      notify({
        description: "You can no longer make an offer",
        message: "Please refresh the page and try again",
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

    const tx = await auctionHouseSdk.buyV2MakeOfferTx(
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
      {}
    );

    try {
      const txid = await sendTransactionWithWallet({
        afterSignCallback: (unfinalizedTxid) => {
          commitRawTxMutation({
            extraData: { comment },
            mint: metadataAccountData.mint,
            rawTxType: CommitRawTxType.MakeOffer,
            txid: unfinalizedTxid,
          });
        },
        commitment: "confirmed",
        connection,
        loggingData: {
          mint: mintKey.toString(),
          transactionType: "Offer",
        },
        txs: [tx],
        wallet: anchorWallet,
      });

      if (txid == null) {
        setIsLoading(false);
        return;
      }

      commit({
        onCompleted: () => {
          notify({ message: "Offer made successfully!", txid });
          setIsLoading(false);
          onHide();
        },
        onError: (e) => {
          logIfNotProd("error bidding (graphql)", e);
          notifyUnexpectedError();
          setIsLoading(false);
        },
        updater: (store, data) => {
          const conn = getNftOfferTransactionsConnection(
            store,
            data.insertNftTransaction.updatedMetadataAccount.nft.mint,
            viewerId
          );
          const txPayload = store.getRootField("insertNftTransaction");
          const transaction = txPayload.getLinkedRecord("transaction");
          // Need to set record as a linked record on itself to nest into `transaction` field
          // as expected by `NftOffer`
          transaction.setLinkedRecord(transaction, "transaction");
          transaction.setValue(
            dayjs().add(OFFER_EXPIRATION_TIME_DEFAULT_DURATION).toString(),
            "expirationDate"
          );
          transaction.setValue(true, "isValid");
          const edge = ConnectionHandler.createEdge(
            store,
            conn!,
            transaction,
            "NftOffersEdge"
          );
          ConnectionHandler.insertEdgeBefore(conn!, edge);
        },
        variables: {
          buyer: anchorWallet.publicKey.toString(),
          comment,
          creator: metadataAccountData.nft.creatorId,
          currencyName: currencyConfig.name,
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
      logError(AnalyticsEvent.MakeAnOfferModalError, e as Error, {
        metadataAccountData,
        userId: anchorWallet.publicKey.toString(),
      });
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.right}>
      {width > BOTTOM_DRAWER_BREAKPOINT && (
        <ArtName colorClass={ColorClass.Primary}>Offer</ArtName>
      )}
      <Body2 className={styles.description} colorClass={ColorClass.Primary}>
        If the owner accepts your offer, the NFT will be transferred to you
        immediately.{unlockablePurchaseMessage}
      </Body2>
      <div className={styles.priceInput}>
        <MakeAnOfferModalCurrencySelect
          currencyConfig={currencyConfig}
          setCurrencyConfig={(config: Maybe<CurrencyConfig>) => {
            setPrice("");
            setCurrencyConfig(config);
          }}
          primarySaleHappened={metadataAccountData.primarySaleHappened}
          listingCurrencyAllowlistOverride={
            metadataAccountData.nft.priceV2?.currencyInfo.name
          }
        />
        <PriceInput
          disabled={showCurrencyError}
          placeholder="Enter price"
          currencyConfig={currencyConfig}
          price={price}
          setPrice={(val) => {
            if (!isLoading) {
              setPrice(val);
            }
          }}
          showCurrencySymbol
          showUsdPrice={false}
        />
      </div>
      <CurrencyError marginTop={12} showCurrencyError={showCurrencyError} />
      {/* TODO: parameterize expiry time based on expirationTime */}
      <Body2 className={styles.noWithdraw} colorClass={ColorClass.Secondary}>
        Your offer will expire in 3 days if not accepted by the owner. Your
        funds will be automatically returned to you if your offer expires.
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
        buttonText="Optional: Attach a comment to your offer"
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
          className={styles.button}
          disabled={
            !isValidPrice(price, currencyConfig.decimals, MaxDecimals.Price)
          }
          fontClass={FontClass.NavLink}
          isLoading={isLoading}
          onClick={onSubmitBidClick}
        >
          Make offer
        </ButtonWithText>
      </div>
    </div>
  );
}

const fragment = graphql`
  fragment MakeAnOfferModal_MetadataAccount on MetadataAccount {
    mint

    nft {
      CampaignFundingTier {
        ...CampaignBenefitsSection_CampaignFundingTierStandard
      }
      auctionWinnerId
      creatorId
      ownerId
      status
      priceV2 {
        currencyInfo {
          name
        }
      }
    }

    primarySaleHappened

    data {
      creators {
        # eslint-disable-next-line relay/unused-fields
        address
      }
    }

    ...ListingCardForMetadata_MetadataAccount
    ...useUnlockablePurchaseMessage_MetadataAccount
  }
`;

type Props = {
  isShown: boolean;
  metadataAccount: MakeAnOfferModal_MetadataAccount$key;
  onHide: () => void;
};

export default function MakeAnOfferModal({
  isShown,
  metadataAccount,
  onHide,
}: Props): Maybe<JSX.Element> {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const [price, setPrice] = useState("");
  const { width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(false);

  usePreventRefresh(isShown && isLoading);

  const onHideAndSetSuccess = () => {
    if (isLoading) {
      notify({
        duration: 2,
        message: "Please wait for your offer to finish processing",
        type: "info",
      });
      return;
    }

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
      <Right
        isLoading={isLoading}
        price={price}
        metadataAccountData={metadataAccountData}
        onHide={onHideAndSetSuccess}
        setIsLoading={setIsLoading}
        setPrice={setPrice}
      />
    </div>
  );

  if (width <= BOTTOM_DRAWER_BREAKPOINT) {
    return (
      <BottomDrawer
        isShown={isShown}
        onHide={onHideAndSetSuccess}
        title="Make an offer"
      >
        <div className={styles.bottomDrawerContainer}>{body}</div>
      </BottomDrawer>
    );
  }

  return (
    <GenericModal
      isShown={isShown}
      onHide={onHideAndSetSuccess}
      title="Make an offer"
    >
      {body}
    </GenericModal>
  );
}
