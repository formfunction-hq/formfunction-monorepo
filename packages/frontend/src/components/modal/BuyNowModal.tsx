import graphql from "babel-plugin-relay/macro";
import { useState } from "react";
import { useFragment } from "react-relay";
import { BuyNowModal_MetadataAccount$key } from "components/modal/__generated__/BuyNowModal_MetadataAccount.graphql";
import { PublicKey } from "@solana/web3.js";
import useSolanaContext from "hooks/useSolanaContext";
import invariant from "tiny-invariant";
import getCreatorsForExecuteSale from "formfn-shared/dist/utils/sale/getCreatorsForExecuteSale";
import sendTransactionWithWallet from "utils/solana/misc/sendTransactionWithWallet";
import commitRawTxMutation from "utils/relay/commitRawTxMutation";
import useSettleSale from "hooks/useSettleSale";
import { notify } from "components/toast/notifications";
import logIfNotProd from "utils/logIfNotProd";
import SaleType from "types/enums/SaleType";
import getNftMintTokenAccountAddressOrAta from "utils/solana/tokens/read/getNftMintTokenAccountAddressOrAta";
import deleteOfferTransactionNodes from "utils/relay/deleteOfferTransactionNodes";
import CommitRawTxType from "formfn-shared/dist/types/enums/CommitRawTxType";
import useConfetti from "hooks/useConfetti";
import useUnlockablePurchaseMessage from "hooks/useUnlockablePurchaseMessage";
import useAuctionHouseSdkForPrice from "hooks/useAuctionHouseSdkForPrice";
import combineTransactions from "formfn-shared/dist/utils/solana/txs/combineTransactions";
import BuyNowGenericModalForMetadataAccount from "components/modal/BuyNowGenericModalForMetadataAccount";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import useViewerId from "hooks/useViewerId";

const fragment = graphql`
  fragment BuyNowModal_MetadataAccount on MetadataAccount {
    mint

    data {
      creators {
        # eslint-disable-next-line relay/unused-fields
        address
      }
    }

    nft {
      auctionWinnerId
      creatorId
      priceV2 {
        amount
        ...useAuctionHouseSdkForPrice_Price
      }
      ownerId
    }

    ...useSettleSale_MetadataAccount
    ...BuyNowGenericModalForMetadataAccount_MetadataAccount
    ...useUnlockablePurchaseMessage_MetadataAccount
  }
`;

type Props = {
  isShown: boolean;
  metadataAccount: BuyNowModal_MetadataAccount$key;
  onHide: () => void;
};

export default function BuyNowModal({
  isShown,
  metadataAccount,
  onHide,
}: Props): JSX.Element {
  const viewerId = useViewerId();
  const showConfetti = useConfetti();
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const unlockablePurchaseMessage =
    useUnlockablePurchaseMessage(metadataAccountData);
  const priceInFullDecimals = Number(metadataAccountData.nft.priceV2?.amount);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { anchorWallet, connection } = useSolanaContext();
  const auctionHouseSdk = useAuctionHouseSdkForPrice(
    metadataAccountData.nft.priceV2
  );
  const { settleSale } = useSettleSale(
    metadataAccountData,
    SaleType.InstantSale
  );

  const onBuyNowClick = async () => {
    invariant(anchorWallet != null);
    invariant(auctionHouseSdk != null);

    setIsLoading(true);

    const mintKey = new PublicKey(metadataAccountData.mint as string);
    const tokenAccount = await getNftMintTokenAccountAddressOrAta(
      connection,
      mintKey,
      // Need to use tokenAccount of seller (owner of NFT), not of the buyer
      new PublicKey(metadataAccountData.nft.ownerId)
    );
    const remainingAccounts = getCreatorsForExecuteSale(
      metadataAccountData.data.creators
    );
    const tx = combineTransactions(
      await Promise.all([
        auctionHouseSdk.buyV2InstantSaleTx(
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
        ),
        auctionHouseSdk.executeSaleV2Tx(
          {
            buyerPriceInLamports: priceInFullDecimals,
            sellerPriceInLamports: priceInFullDecimals,
            tokenAccount,
            tokenMint: mintKey,
            wallet: anchorWallet.publicKey,
            walletBuyer: anchorWallet.publicKey,
            walletCreator: new PublicKey(metadataAccountData.nft.creatorId),
            walletSeller: new PublicKey(metadataAccountData.nft.ownerId),
          },
          {},
          remainingAccounts,
          400_000
        ),
      ])
    );

    const txid = await sendTransactionWithWallet({
      afterSignCallback: (unfinalizedTxid) => {
        commitRawTxMutation({
          mint: metadataAccountData.mint,
          rawTxType: CommitRawTxType.BuyNow,
          txid: unfinalizedTxid,
        });
      },
      connection,
      loggingData: {
        mint: mintKey.toString(),
        transactionType: "SoldInstantSale",
      },
      txs: [tx],
      wallet: anchorWallet,
    });

    if (txid == null) {
      setIsLoading(false);
      return;
    }

    settleSale({
      buyer: anchorWallet.publicKey.toString()!,
      buyerPriceInLamports: priceInFullDecimals,
      executeSaleTxid: txid,
      extraUpdater: (store) => {
        deleteOfferTransactionNodes(store, metadataAccountData.mint, viewerId);
      },
      mintKey,
      onCompleted: () => {
        notify({ message: "Bought successfully!", txid });
        setIsLoading(false);
        setIsSuccess(true);
        showConfetti();
      },
      onError: (e) => {
        logIfNotProd("error executing instant sale (graphql)", e);
        notifyUnexpectedError();
      },
    });
  };

  return (
    <BuyNowGenericModalForMetadataAccount
      description={`If you buy this piece now, the sale will be executed instantly and you will receive the NFT.${unlockablePurchaseMessage}`}
      isLoading={isLoading}
      isShown={isShown}
      isSuccess={isSuccess}
      metadataAccount={metadataAccountData}
      onBuyNowClick={onBuyNowClick}
      onHide={onHide}
    />
  );
}
