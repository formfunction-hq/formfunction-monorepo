import { PublicKey } from "@solana/web3.js";
import graphql from "babel-plugin-relay/macro";
import GenericConfirmationModal from "components/modal/GenericConfirmationModal";
import { CancelOfferModal_NftTransactionExpress$key } from "components/modal/__generated__/CancelOfferModal_NftTransactionExpress.graphql";
import { CancelOfferModal_MetadataAccount$key } from "components/modal/__generated__/CancelOfferModal_MetadataAccount.graphql";
import { notify } from "components/toast/notifications";
import useSolanaContext from "hooks/useSolanaContext";
import invariant from "tiny-invariant";
import { useState } from "react";
import { useFragment, useMutation } from "react-relay";
import sendTransactionWithWallet from "utils/solana/misc/sendTransactionWithWallet";
import logIfNotProd from "utils/logIfNotProd";
import { CancelOfferModalUpdateOfferMutation } from "components/modal/__generated__/CancelOfferModalUpdateOfferMutation.graphql";
import deleteOfferTransactionNode from "utils/relay/deleteOfferTransactionNode";
import getTokenAccountFromBuyTx from "formfn-shared/dist/utils/solana/txs/getTokenAccountFromBuyTx";
import getPaymentAccountFromBuyTx from "formfn-shared/dist/utils/solana/txs/getPaymentAccountFromBuyTx";
import logError from "utils/analytics/logError";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import getAuctionHouseConstants from "utils/solana/misc/getAuctionHouseConstants";
import useAuctionHouseSdkForPrice from "hooks/useAuctionHouseSdkForPrice";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import NotifyErrorDescription from "types/enums/NotifyErrorDescription";
import getParsedTransaction from "utils/solana/transactions/getParsedTransaction";
import useViewerId from "hooks/useViewerId";

type Props = {
  description: string;
  isShown: boolean;
  metadataAccount: CancelOfferModal_MetadataAccount$key;
  offerTransaction: CancelOfferModal_NftTransactionExpress$key;
  onHide: () => void;
  title: string;
};

const nftFragment = graphql`
  fragment CancelOfferModal_MetadataAccount on MetadataAccount {
    id
    mint
  }
`;

const offerTxFragment = graphql`
  fragment CancelOfferModal_NftTransactionExpress on NftTransactionExpress {
    id
    txid
    price {
      amount
      ...useAuctionHouseSdkForPrice_Price
    }
  }
`;

const mutation = graphql`
  mutation CancelOfferModalUpdateOfferMutation(
    $offerTxid: uuid!
    $set: Offer_set_input!
  ) {
    update_Offer_by_pk(
      pk_columns: { nftTransactionId: $offerTxid }
      _set: $set
    ) {
      nftTransactionId
    }
  }
`;

export default function CancelOfferModal({
  description,
  isShown,
  offerTransaction,
  onHide,
  metadataAccount,
  title,
}: Props): JSX.Element {
  const viewerId = useViewerId();
  const [isLoading, setIsLoading] = useState(false);
  const metadataAccountData = useFragment(nftFragment, metadataAccount);
  const offerTxData = useFragment(offerTxFragment, offerTransaction);
  const { anchorWallet, connection } = useSolanaContext();
  const auctionHouseSdk = useAuctionHouseSdkForPrice(offerTxData.price);
  const [commit] = useMutation<CancelOfferModalUpdateOfferMutation>(mutation);

  return (
    <GenericConfirmationModal
      bodyText={description}
      buttonText="Cancel offer"
      cancelButtonText="Nevermind"
      title={title}
      isShown={isShown}
      isLoading={isLoading}
      onHide={() => {
        if (isLoading) {
          notify({
            duration: 2,
            message: "Please wait for your cancellation to finish processing",
            type: "info",
          });
          return;
        }

        onHide();
      }}
      onConfirmClick={async () => {
        invariant(anchorWallet != null);
        invariant(auctionHouseSdk != null);

        setIsLoading(true);
        const mintKey = new PublicKey(metadataAccountData.mint);
        const parsedTx = await getParsedTransaction(
          connection,
          offerTxData.txid!
        );
        const [tokenAccount, paymentAccount] = await Promise.all([
          getTokenAccountFromBuyTx(
            parsedTx,
            getAuctionHouseConstants().programId
          ),
          getPaymentAccountFromBuyTx(
            parsedTx,
            getAuctionHouseConstants().programId
          )!,
        ]);
        if (tokenAccount == null) {
          logError(
            AnalyticsEvent.CancelOfferError,
            `Could not obtain token account for ${offerTxData.txid}`,
            { metadataAccountData, offerTxData, parsedTx }
          );
          notifyUnexpectedError(
            NotifyErrorDescription.UnexpectedErrorTryAgainLater
          );
          setIsLoading(false);
          return;
        }

        const withdrawAndCancelTx = await auctionHouseSdk.withdrawAndCancelTx(
          {
            receiptAccount: paymentAccount!,
            tokenAccount,
            tokenMint: mintKey,
            wallet: anchorWallet.publicKey,
          },
          { amount: offerTxData.price!.amount }
        );

        const txid = await sendTransactionWithWallet({
          afterSignCallback: undefined,
          connection,
          loggingData: {
            mint: mintKey.toString(),
            transactionType: "OfferCancelled",
          },
          txs: [withdrawAndCancelTx],
          wallet: anchorWallet,
        });
        if (txid == null) {
          setIsLoading(false);
          return;
        }

        commit({
          onCompleted: () => {
            notify({ message: "Offer cancelled!", txid });
            setIsLoading(false);
            onHide();
          },
          onError: (e) => {
            logIfNotProd("error cancelling offer (graphql)", e);
            notifyUnexpectedError();
          },
          updater: (store, data) => {
            deleteOfferTransactionNode(
              store,
              metadataAccountData.mint,
              viewerId,
              data.update_Offer_by_pk!.nftTransactionId
            );
          },
          variables: {
            offerTxid: offerTxData.id,
            set: {
              refundTxid: txid,
            },
          },
        });
      }}
    />
  );
}
