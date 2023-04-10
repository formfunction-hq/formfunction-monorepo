import GenericModal from "components/modal/GenericModal";
import { useFragment } from "react-relay";
import { useState } from "react";
import { notify } from "components/toast/notifications";
import usePreventRefresh from "hooks/usePreventRefresh";
import { AcceptOfferModal_NftTransactionExpress$key } from "components/modal/__generated__/AcceptOfferModal_NftTransactionExpress.graphql";
import { AcceptOfferModal_MetadataAccount$key } from "components/modal/__generated__/AcceptOfferModal_MetadataAccount.graphql";
import graphql from "babel-plugin-relay/macro";
import SettleSaleModalContent from "components/modal/SettleSaleModalContent";
import GenericSuccessModalContent from "components/modal/GenericSuccessModalContent";
import useSolanaContext from "hooks/useSolanaContext";
import invariant from "tiny-invariant";
import { PublicKey } from "@solana/web3.js";
import findAta from "formfn-shared/dist/utils/solana/pdas/findAta";
import getCreatorsForExecuteSale from "formfn-shared/dist/utils/sale/getCreatorsForExecuteSale";
import sendTransactionWithWallet from "utils/solana/misc/sendTransactionWithWallet";
import commitRawTxMutation from "utils/relay/commitRawTxMutation";
import useSettleSale from "hooks/useSettleSale";
import logIfNotProd from "utils/logIfNotProd";
import SaleType from "types/enums/SaleType";
import deleteOfferTransactionNodes from "utils/relay/deleteOfferTransactionNodes";
import CommitRawTxType from "formfn-shared/dist/types/enums/CommitRawTxType";
import isListedForSale from "utils/nft/isListedForSale";
import useConfetti from "hooks/useConfetti";
import useFormattedNftPrice from "hooks/useFormattedNftPrice";
import useNftPriceSymbol from "hooks/useNftPriceSymbol";
import useAuctionHouseSdkForPrice from "hooks/useAuctionHouseSdkForPrice";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import useViewerId from "hooks/useViewerId";

const transactionFragment = graphql`
  fragment AcceptOfferModal_NftTransactionExpress on NftTransactionExpress {
    id
    price {
      amount
      currencyInfo {
        name
      }
      ...useAuctionHouseSdkForPrice_Price
      ...useFormattedNftPrice_Price
      ...useNftPriceSymbol_Price
    }

    From {
      id
      username

      ...SettleSaleModalContent_UserExpress
    }
  }
`;

const fragment = graphql`
  fragment AcceptOfferModal_MetadataAccount on MetadataAccount {
    id
    mint

    data {
      name
      creators {
        # eslint-disable-next-line relay/unused-fields
        address
      }
    }

    nft {
      priceV2 {
        amount
        ...useAuctionHouseSdkForPrice_Price
      }
      status
      creatorId
      ownerId
    }

    ...SettleSaleModalContent_MetadataAccount
    ...useSettleSale_MetadataAccount
  }
`;

type Props = {
  isShown: boolean;
  metadataAccount: AcceptOfferModal_MetadataAccount$key;
  offerTransaction: AcceptOfferModal_NftTransactionExpress$key;
  onHide: () => void;
};

export default function AcceptOfferModal({
  isShown,
  metadataAccount,
  onHide,
  offerTransaction,
}: Props): JSX.Element {
  const viewerId = useViewerId();
  const showConfetti = useConfetti();
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const offerTransactionData = useFragment(
    transactionFragment,
    offerTransaction
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { anchorWallet, connection } = useSolanaContext();
  const listingAuctionHouseSdk = useAuctionHouseSdkForPrice(
    metadataAccountData.nft.priceV2
  );
  const offerAuctionHouseSdk = useAuctionHouseSdkForPrice(
    offerTransactionData.price
  );
  const { price: offerPrice, From: buyer } = offerTransactionData;
  const {
    status,
    priceV2: listingPrice,
    creatorId,
    ownerId,
  } = metadataAccountData.nft;
  usePreventRefresh(isShown && isLoading);

  const formattedOfferPrice = useFormattedNftPrice(offerPrice);
  const { shortSymbol: offerPriceShortSymbol, symbol: offerPriceSymbol } =
    useNftPriceSymbol(offerPrice) ?? {};
  const remainingAccounts = getCreatorsForExecuteSale(
    metadataAccountData.data.creators
  );

  const { settleSale } = useSettleSale(
    metadataAccountData,
    SaleType.Offer,
    offerPrice!.currencyInfo.name
  );

  const onClickAccept = async () => {
    invariant(anchorWallet != null);
    invariant(offerAuctionHouseSdk != null);

    setIsLoading(true);

    const mintKey = new PublicKey(metadataAccountData.mint);
    const [ata] = await findAta(
      // Need to use tokenAccount of seller (owner of NFT), not of the buyer
      new PublicKey(ownerId),
      mintKey
    );
    const [cancelTx, acceptOfferTx] = await Promise.all([
      listingAuctionHouseSdk?.cancelTx(
        {
          priceInLamports: listingPrice?.amount ?? 0,
          tokenAccount: ata,
          tokenMint: mintKey,
          wallet: anchorWallet.publicKey,
        },
        {}
      ),
      offerAuctionHouseSdk.sellAcceptOfferTx(
        {
          priceInLamports: offerPrice!.amount,
          tokenAccount: ata,
          tokenMint: mintKey,
          wallet: anchorWallet.publicKey,
          walletBuyer: new PublicKey(buyer!.id),
          walletCreator: new PublicKey(creatorId),
          walletSeller: new PublicKey(ownerId),
        },
        {},
        remainingAccounts
      ),
    ]);
    cancelTx?.add(...acceptOfferTx.instructions);
    const tx =
      isListedForSale(status) && offerPrice !== listingPrice
        ? // If piece is already listed, make sure to cancel the listing trade state
          // as we execute the sale to not interfere with future listings. One notable
          // exception is if the listing price and the offer price are the same, in
          // which case we re-use the same trade state to execute the offer acceptance
          cancelTx!
        : acceptOfferTx;

    const txid = await sendTransactionWithWallet({
      afterSignCallback: (unfinalizedTxid) => {
        commitRawTxMutation({
          extraData: {
            offerTransactionId: offerTransactionData.id,
          },
          mint: metadataAccountData.mint,
          rawTxType: CommitRawTxType.AcceptOffer,
          txid: unfinalizedTxid,
        });
      },
      connection,
      loggingData: {
        mint: mintKey.toString(),
        transactionType: "SoldAcceptedOffer",
      },
      txs: [tx],
      wallet: anchorWallet,
    });

    if (txid == null) {
      setIsLoading(false);
      return;
    }

    settleSale({
      buyer: buyer!.id,
      buyerPriceInLamports: offerPrice!.amount,
      executeSaleTxid: txid,
      extraUpdater: (store) => {
        deleteOfferTransactionNodes(store, metadataAccountData.mint, viewerId);
      },
      mintKey,
      offerTransactionId: offerTransactionData.id,
      onCompleted: () => {
        notify({ message: "Offer accepted!", txid });
        setIsLoading(false);
        setIsSuccess(true);
        showConfetti();
      },
      onError: (e) => {
        logIfNotProd("error executing sale (graphql)", e);
        notifyUnexpectedError();
      },
    });
  };

  const description = `@${
    offerTransactionData.From!.username
  } made an offer of ${formattedOfferPrice} ${
    offerPriceShortSymbol ?? offerPriceSymbol
  } for ${
    metadataAccountData.data.name
  }. You can accept this offer, or ignore it.`;

  const onHideAndReset = () => {
    if (isLoading && !isSuccess) {
      notify({
        duration: 2,
        message: "Please wait for your sale to finish processing",
        type: "info",
      });
      return;
    }

    onHide();
    // Delay a bit, so slide down animation for bottom drawer doesn't look weird
    setTimeout(() => setIsSuccess(false), 500);
  };

  return (
    <GenericModal
      isShown={isShown}
      onHide={onHideAndReset}
      title={isSuccess ? "Offer accepted" : "Accept this offer?"}
    >
      {isSuccess ? (
        <GenericSuccessModalContent
          message="Your NFT has been transferred to the buyer. Congratulations!"
          onHide={onHideAndReset}
          type="minimal"
        />
      ) : (
        <SettleSaleModalContent
          buttonText="Accept offer & transfer"
          description={description}
          isLoading={isLoading}
          metadataAccount={metadataAccountData}
          onClick={onClickAccept}
          price={{
            amount: formattedOfferPrice,
            shortSymbol: offerPriceShortSymbol,
            symbol: offerPriceSymbol,
          }}
          buyer={offerTransactionData.From!}
        />
      )}
    </GenericModal>
  );
}
