import graphql from "babel-plugin-relay/macro";
import GenericModal from "components/modal/GenericModal";
import { SettleModal_MetadataAccount$key } from "components/modal/__generated__/SettleModal_MetadataAccount.graphql";
import { useFragment } from "react-relay";
import { useState } from "react";
import useSolanaContext from "hooks/useSolanaContext";
import invariant from "tiny-invariant";
import { PublicKey } from "@solana/web3.js";
import logIfNotProd from "utils/logIfNotProd";
import { notify } from "components/toast/notifications";
import sendTransactionWithWallet from "utils/solana/misc/sendTransactionWithWallet";
import usePreventRefresh from "hooks/usePreventRefresh";
import commitRawTxMutation from "utils/relay/commitRawTxMutation";
import useSettleSale from "hooks/useSettleSale";
import getCreatorsForExecuteSale from "formfn-shared/dist/utils/sale/getCreatorsForExecuteSale";
import SettleSaleModalContent from "components/modal/SettleSaleModalContent";
import GenericSuccessModalContent from "components/modal/GenericSuccessModalContent";
import SaleType from "types/enums/SaleType";
import getNftMintTokenAccountAddressOrAta from "utils/solana/tokens/read/getNftMintTokenAccountAddressOrAta";
import CommitRawTxType from "formfn-shared/dist/types/enums/CommitRawTxType";
import useConfetti from "hooks/useConfetti";
import useFormattedNftPrice from "hooks/useFormattedNftPrice";
import useNftPriceSymbol from "hooks/useNftPriceSymbol";
import useAuctionHouseSdkForPrice from "hooks/useAuctionHouseSdkForPrice";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import isNativeCurrency from "utils/currency/isNativeCurrency";

const fragment = graphql`
  fragment SettleModal_MetadataAccount on MetadataAccount {
    mint

    data {
      creators {
        # eslint-disable-next-line relay/unused-fields
        address
      }
      name
    }

    nft {
      auctionWinnerId
      creatorId
      ownerId
      priceV2 {
        amount
        currencyInfo {
          name
        }
        ...useAuctionHouseSdkForPrice_Price
        ...useFormattedNftPrice_Price
        ...useNftPriceSymbol_Price
      }
      priceLastListedV2 {
        amount
        ...useFormattedNftPrice_Price
        ...useNftPriceSymbol_Price
      }

      AuctionWinner {
        ...SettleSaleModalContent_UserExpress
      }
    }

    ...useSettleSale_MetadataAccount
    ...SettleSaleModalContent_MetadataAccount
  }
`;

type Props = {
  isShown: boolean;
  metadataAccount: SettleModal_MetadataAccount$key;
  onHide: () => void;
};

export default function SettleModal({
  isShown,
  metadataAccount,
  onHide,
}: Props): JSX.Element {
  const showConfetti = useConfetti();
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const [isSuccess, setIsSuccess] = useState(false);
  const { anchorWallet, connection } = useSolanaContext();
  const auctionHouseSdk = useAuctionHouseSdkForPrice(
    metadataAccountData.nft.priceV2
  );
  const [isLoading, setIsLoading] = useState(false);
  const { nft } = metadataAccountData;
  const {
    auctionWinnerId,
    creatorId,
    priceV2,
    priceLastListedV2,
    ownerId,
    AuctionWinner: auctionWinner,
  } = nft;
  usePreventRefresh(isShown && isLoading);
  const remainingAccounts = getCreatorsForExecuteSale(
    metadataAccountData.data.creators
  );
  const { settleSale } = useSettleSale(metadataAccountData, SaleType.Auction);
  const formattedPrice = useFormattedNftPrice(priceV2);
  const { shortSymbol, symbol } = useNftPriceSymbol(priceV2);

  const onClickSettle = async () => {
    invariant(anchorWallet != null);
    invariant(auctionHouseSdk != null);

    setIsLoading(true);

    const mintKey = new PublicKey(metadataAccountData.mint);
    const tokenAccount = await getNftMintTokenAccountAddressOrAta(
      connection,
      mintKey,
      // Need to use tokenAccount of seller (owner of NFT), not of the buyer
      new PublicKey(ownerId)
    );
    const buyerPrice = Number(priceV2!.amount);
    const sellerPrice = Number(priceLastListedV2!.amount);

    const isNative = isNativeCurrency(priceV2!.currencyInfo.name);
    const tx = await auctionHouseSdk.executeSaleV2Tx(
      {
        buyerPriceInLamports: buyerPrice,
        sellerPriceInLamports: sellerPrice,
        tokenAccount,
        tokenMint: mintKey,
        wallet: anchorWallet.publicKey,
        walletBuyer: new PublicKey(auctionWinnerId!),
        walletCreator: new PublicKey(creatorId),
        walletSeller: new PublicKey(ownerId),
      },
      {},
      remainingAccounts,
      isNative ? 300000 : 400000
    );
    const txid = await sendTransactionWithWallet({
      afterSignCallback: (unfinalizedTxid) => {
        commitRawTxMutation({
          mint: metadataAccountData.mint,
          rawTxType: CommitRawTxType.SettleAuction,
          txid: unfinalizedTxid,
        });
      },
      connection,
      loggingData: {
        mint: mintKey.toString(),
        transactionType: "Sold",
      },
      txs: [tx],
      wallet: anchorWallet,
    });

    if (txid == null) {
      setIsLoading(false);
      return;
    }

    settleSale({
      buyer: auctionWinnerId!,
      buyerPriceInLamports: buyerPrice,
      executeSaleTxid: txid,
      mintKey,
      onCompleted: () => {
        notify({ message: "Auction was settled!", txid });
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

  const description =
    `The auction for ${metadataAccountData.data.name} has now ended, and you` +
    ` need to settle the auction. This will transfer the ${symbol} from the winning` +
    " bidder to you, and the NFT to the collector.";

  return (
    <GenericModal
      isShown={isShown}
      onHide={onHideAndReset}
      title={isSuccess ? "Auction has been settled" : "Settle this auction"}
    >
      {isSuccess ? (
        <GenericSuccessModalContent
          message="Your NFT has been transferred to the highest bidder. Congratulations!"
          onHide={onHideAndReset}
          type="minimal"
        />
      ) : (
        <SettleSaleModalContent
          buttonText="Settle auction & transfer"
          description={description}
          isLoading={isLoading}
          metadataAccount={metadataAccountData}
          buyer={auctionWinner!}
          onClick={onClickSettle}
          price={{
            amount: formattedPrice,
            shortSymbol,
            symbol,
          }}
        />
      )}
    </GenericModal>
  );
}
