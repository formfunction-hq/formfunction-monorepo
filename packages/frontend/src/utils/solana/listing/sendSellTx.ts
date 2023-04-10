import { AuctionHouseSdk } from "@formfunction-hq/formfunction-auction-house";
import { Connection, PublicKey } from "@solana/web3.js";
import AnchorWallet from "types/AnchorWallet";
import { notify } from "components/toast/notifications";
import CommitRawTxType from "formfn-shared/dist/types/enums/CommitRawTxType";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import ListingType from "types/enums/ListingType";
import logEvent from "utils/analytics/logEvent";
import getListingTransactionTypeForListingType from "utils/listing/getListingTransactionTypeForListingType";
import commitRawTxMutation from "utils/relay/commitRawTxMutation";
import sendTransactionWithWallet from "utils/solana/misc/sendTransactionWithWallet";

export default async function sendSellTx(
  listingType: ListingType,
  connection: Connection,
  auctionHouseSdk: AuctionHouseSdk,
  anchorWallet: AnchorWallet,
  accounts: {
    priceInLamports: number;
    tokenAccount: PublicKey;
    tokenMint: PublicKey;
    wallet: PublicKey;
  },
  args: {
    tickSizeConstantInLamports?: MaybeUndef<number>;
    tokenSize?: number;
  },
  rawTxExtraData?: { [key: string]: any }
) {
  const tx = await (listingType === ListingType.Auction
    ? auctionHouseSdk.sellTx(accounts, args)
    : auctionHouseSdk.sellInstantSaleTx(accounts, args));

  if (listingType === ListingType.Auction) {
    const [lastBidPricePda] = await auctionHouseSdk.findLastBidPrice(
      accounts.tokenMint
    );
    const lastBidPriceAccount = await connection.getAccountInfo(
      lastBidPricePda,
      "confirmed"
    );
    if (
      lastBidPriceAccount == null &&
      args.tickSizeConstantInLamports != null
    ) {
      // The last_bid_price account only needs to exist if the tick size is being set
      notify({
        description:
          "This NFT is still being processed. Please wait a minute and try again.",
        message: "Please wait",
        type: "error",
      });
      logEvent(AnalyticsEvent.WaitingForLastBidPrice, {
        lister: anchorWallet.publicKey.toString(),
        mint: accounts.tokenMint.toString(),
        tickSize: args.tickSizeConstantInLamports,
      });
      return null;
    }

    if (lastBidPriceAccount != null) {
      const setTickSizeTx = await auctionHouseSdk.setTickSizeTx(
        {
          owner: anchorWallet.publicKey,
          tokenAccount: accounts.tokenAccount,
          tokenMint: accounts.tokenMint,
        },
        { tickSizeConstantInLamports: args.tickSizeConstantInLamports ?? 0 }
      );
      tx.add(setTickSizeTx);
    }
  }

  return sendTransactionWithWallet({
    afterSignCallback: (unfinalizedTxid) => {
      commitRawTxMutation({
        extraData: rawTxExtraData ?? {},
        mint: accounts.tokenMint.toString(),
        rawTxType:
          listingType === ListingType.Auction
            ? CommitRawTxType.List
            : CommitRawTxType.SellInstantSale,
        txid: unfinalizedTxid,
      });
    },
    connection,
    loggingData: {
      mint: accounts.tokenMint.toString(),
      transactionType: getListingTransactionTypeForListingType(listingType),
    },
    txs: [tx],
    wallet: anchorWallet,
  });
}
