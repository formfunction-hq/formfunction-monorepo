import { PublicKey } from "@solana/web3.js";
import graphql from "babel-plugin-relay/macro";
import ButtonWithText from "components/buttons/ButtonWithText";
import InputLabel from "components/input/InputLabel";
import InputWithLabel from "components/input/InputWithLabel";
import GenericModal from "components/modal/GenericModal";
import { ChangePriceModalMutation } from "components/modal/__generated__/ChangePriceModalMutation.graphql";
import { ChangePriceModal_MetadataAccount$key } from "components/modal/__generated__/ChangePriceModal_MetadataAccount.graphql";
import { notify } from "components/toast/notifications";
import styles from "css/modal/ChangePriceModal.module.css";
import usePreventRefresh from "hooks/usePreventRefresh";
import useRelayConnectionIdsContext from "hooks/useRelayConnectionIdsContext";
import useSolanaContext from "hooks/useSolanaContext";
import { useState } from "react";
import { useFragment, useMutation } from "react-relay";
import invariant from "tiny-invariant";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import logIfNotProd from "utils/logIfNotProd";
import commitRawTxMutation from "utils/relay/commitRawTxMutation";
import sendTransactionWithWallet from "utils/solana/misc/sendTransactionWithWallet";
import isValidPrice from "utils/price/isValidPrice";
import ListingType from "types/enums/ListingType";
import getListingTransactionTypeForListingType from "utils/listing/getListingTransactionTypeForListingType";
import getNftMintTokenAccountAddressOrAta from "utils/solana/tokens/read/getNftMintTokenAccountAddressOrAta";
import CommitRawTxType from "formfn-shared/dist/types/enums/CommitRawTxType";
import isListedForAuction from "utils/nft/isListedForAuction";
import FetchGraphqlVariablesDenylist from "types/enums/FetchGraphqlVariablesDenylist";
import PriceInput from "components/input/PriceInput";
import useGetCurrencyConfigForPrice from "hooks/useGetCurrencyConfigForPrice";
import convertToFullDecimals from "formfn-shared/dist/utils/convertToFullDecimals";
import useAuctionHouseSdkForPrice from "hooks/useAuctionHouseSdkForPrice";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import useViewerId from "hooks/useViewerId";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

const mutation = graphql`
  mutation ChangePriceModalMutation(
    $creator: String!
    $lister: String!
    $mint: String!
    $price: bigint!
    $txid: String!
    $connections: [ID!]!
    $transactionType: NftTransactionTypeExpress_enum!
    $updateNftInput: InsertNftTransactionUpdateNftInput!
    $unlockableWinnerUserEmailInput: UnlockableWinnerUserEmailInput!
  ) {
    insertNftTransaction(
      input: {
        creatorId: $creator
        fromUserId: $lister
        toUserId: $lister
        mint: $mint
        price: $price
        txid: $txid
        type: $transactionType
        updateNftInput: $updateNftInput
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

const fragment = graphql`
  fragment ChangePriceModal_MetadataAccount on MetadataAccount {
    mint

    nft {
      creatorId
      priceV2 {
        amount
        currencyInfo {
          decimals
        }
        ...useAuctionHouseSdkForPrice_Price
        ...useGetCurrencyConfigForPrice_Price
      }
      status
      scheduledAuctionTime
    }
  }
`;

type Props = {
  isShown: boolean;
  metadataAccount: ChangePriceModal_MetadataAccount$key;
  onHide: () => void;
};

function Inner({ isShown, metadataAccount, onHide }: Props): JSX.Element {
  const viewerId = useViewerId();
  const [commit] = useMutation<ChangePriceModalMutation>(mutation);
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const [price, setPrice] = useState("");
  const { anchorWallet, connection } = useSolanaContext();
  const auctionHouseSdk = useAuctionHouseSdkForPrice(
    metadataAccountData.nft.priceV2
  );
  const [isLoading, setIsLoading] = useState(false);
  const {
    NftTransactions: { connectionId: nftTransactionsConnectionId },
  } = useRelayConnectionIdsContext();
  const { status, scheduledAuctionTime } = metadataAccountData.nft;
  usePreventRefresh(isShown && isLoading);
  const listingType = isListedForAuction(status)
    ? ListingType.Auction
    : ListingType.InstantSale;
  const transactionType = getListingTransactionTypeForListingType(listingType);
  const currencyConfig = useGetCurrencyConfigForPrice(
    metadataAccountData.nft.priceV2!
  );
  const { decimals } = metadataAccountData.nft.priceV2!.currencyInfo;

  const priceInput = (
    <InputWithLabel
      label={
        <InputLabel
          label={
            listingType === ListingType.Auction
              ? "Reserve price"
              : "Buy now price"
          }
        />
      }
      input={
        <PriceInput
          currencyConfig={currencyConfig}
          placeholder="Enter new price"
          price={price}
          setPrice={setPrice}
          showCurrencySymbol
          showUsdPrice
        />
      }
    />
  );

  return (
    <GenericModal
      isShown={isShown}
      onHide={() => {
        if (isLoading) {
          notify({
            duration: 2,
            message: "Please wait for your price change to finish processing",
            type: "info",
          });
          return;
        }

        onHide();
      }}
      title="Change price"
    >
      <div className={styles.body}>
        {priceInput}
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          className={styles.submitButton}
          disabled={
            convertToFullDecimals(price, decimals) ===
              Number(metadataAccountData.nft.priceV2?.amount) ||
            !isValidPrice(price, decimals)
          }
          fontClass={FontClass.NavLink}
          isLoading={isLoading}
          onClick={async () => {
            invariant(anchorWallet != null);
            invariant(auctionHouseSdk != null);

            setIsLoading(true);
            const mintKey = new PublicKey(metadataAccountData.mint);
            const tokenAccount = await getNftMintTokenAccountAddressOrAta(
              connection,
              mintKey,
              anchorWallet.publicKey
            );
            const priceInFullDecimals = convertToFullDecimals(price, decimals);
            const accounts = {
              oldPriceInLamports: Number(
                metadataAccountData.nft.priceV2!.amount
              ),
              priceInLamports: priceInFullDecimals,
              tokenAccount,
              tokenMint: mintKey,
              wallet: anchorWallet.publicKey,
            };
            const args = {};
            const tx = await (listingType === ListingType.Auction
              ? auctionHouseSdk.sellAndCancelTx(accounts, args)
              : auctionHouseSdk.sellInstantSaleAndCancelTx(accounts, args));
            const txid = await sendTransactionWithWallet({
              afterSignCallback: (unfinalizedTxid) => {
                commitRawTxMutation({
                  mint: metadataAccountData.mint,
                  rawTxType: CommitRawTxType.ChangePrice,
                  txid: unfinalizedTxid,
                });
              },
              connection,
              loggingData: {
                description: "change price",
                mint: mintKey.toString(),
                transactionType,
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
                notify({ message: "Successfully changed price!", txid });
                setIsLoading(false);
                setPrice("");
                onHide();
              },
              onError: (e) => {
                logIfNotProd("error changing price (graphql)", e);
                notifyUnexpectedError();
              },
              variables: {
                [FetchGraphqlVariablesDenylist.Connections]: [
                  nftTransactionsConnectionId ?? "",
                ],
                creator: metadataAccountData.nft.creatorId,
                lister: anchorWallet.publicKey.toString(),
                mint: mintKey.toString(),
                price: priceInFullDecimals,
                transactionType,
                txid,
                unlockableWinnerUserEmailInput: {
                  viewerId,
                },
                updateNftInput: {
                  scheduledAuctionTime,
                },
              },
            });
          }}
        >
          Save
        </ButtonWithText>
      </div>
    </GenericModal>
  );
}

export default function ChangePriceModal({
  isShown,
  metadataAccount,
  onHide,
}: Props): Maybe<JSX.Element> {
  if (!isShown) {
    // Early return here because in Inner, we make some assumptions that certain
    // values are not null, which may not always be true if this modal is hidden.
    // For example, if an NFT is unlisted, then metadataAccountData.nft.priceV2
    // will turn into null.
    return null;
  }

  return (
    <Inner
      isShown={isShown}
      metadataAccount={metadataAccount}
      onHide={onHide}
    />
  );
}
