import { Request } from "express";
import { PublicKey } from "@solana/web3.js";
import { OfferWithNftAndTransaction } from "src/types/OfferWithNftAndTransaction";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";
import getPrisma from "src/utils/prisma/getPrisma";
import createBuyerOfferExpiredNotification from "src/utils/notifications/create/createBuyerOfferExpiredNotification";
import { CurrencyNameExpress_Enum } from "src/__generated__/generated";
import getAuctionHouseSdk from "src/utils/solana/getAuctionHouseSdk";
import getBuyerEscrowBalance from "src/utils/solana/getBuyerEscrowBalance";
import parseBuyTx from "src/utils/solana/txs/parse/parseBuyTx";
import getMostRecentCancelOfferTxForBuyerEscrowAccount from "src/utils/solana/getMostRecentCancelOfferTxForBuyerEscrowAccount";
import arePricesEqual from "src/utils/price/arePricesEqual";
import { decodeAuctionHouseTransaction } from "@formfunction-hq/formfunction-auction-house";
import getAuctionHouseConstants from "src/utils/solana/getAuctionHouseConstants";

export default async function maybeBackfillRefundTxidForOffer(
  req: Request,
  offer: OfferWithNftAndTransaction
): Promise<{
  errorMessage?: string;
  id: string;
  nftTransactionId: string;
  success: boolean;
}> {
  const {
    Nft: { mint },
    From: buyer,
    To: seller,
    Currency,
  } = offer.NftTransaction;
  const prisma = getPrisma();
  const auctionHouseSdk = getAuctionHouseSdk(
    Currency.name as CurrencyNameExpress_Enum
  );
  const [[buyerEscrowAccount], parsedTx] = await Promise.all([
    auctionHouseSdk.findBuyerEscrow(
      new PublicKey(buyer.id),
      new PublicKey(mint)
    ),
    ConnectionWrapper.getParsedTransaction(offer.NftTransaction.txid!),
  ]);
  const [parsedOfferTx, mostRecentCancelOfferTx, buyerEscrowBalance] =
    await Promise.all([
      parsedTx != null
        ? await parseBuyTx(
            parsedTx,
            decodeAuctionHouseTransaction(
              getAuctionHouseConstants().programId,
              parsedTx
            )
          )
        : null,
      getMostRecentCancelOfferTxForBuyerEscrowAccount(buyerEscrowAccount),
      getBuyerEscrowBalance(auctionHouseSdk, buyer.id, mint),
    ]);

  if (buyerEscrowBalance.balance > 0) {
    // If buyer escrow balance is > 0, this is not a case where refundTxid needs to
    // be backfilled. Bids/buy now can only be done if the offer is cancelled.
    return {
      id: offer.id,
      nftTransactionId: offer.nftTransactionId,
      success: false,
    };
  }

  if (
    parsedOfferTx == null ||
    mostRecentCancelOfferTx == null ||
    !arePricesEqual(parsedOfferTx.tx.price, mostRecentCancelOfferTx.price)
  ) {
    const errorMessage = `Cannot backfill refundTxid for offer ${offer.id} - `;
    const reasons = [
      parsedOfferTx == null ? "parsed offer tx is null" : "",
      mostRecentCancelOfferTx == null
        ? "most recent cancel offer tx is null"
        : "",
      parsedOfferTx != null &&
      mostRecentCancelOfferTx != null &&
      !arePricesEqual(parsedOfferTx.tx.price, mostRecentCancelOfferTx.price)
        ? "price does not match between offer and cancel offer tx"
        : "",
    ];
    return {
      errorMessage: errorMessage + reasons.join(","),
      id: offer.id,
      nftTransactionId: offer.nftTransactionId,
      success: false,
    };
  }

  // From here on, we can assume that the refund has been processed but we failed to
  // insert the refundTxid to our db
  const refundTxid = mostRecentCancelOfferTx.txid!;
  await prisma.offer.update({
    data: { refundTxid },
    where: { id: offer.id },
  });

  await createBuyerOfferExpiredNotification(
    {
      nftMint: mint,
      offerTransactionId: offer.NftTransaction.id,
      refundTxid,
    },
    buyer.id,
    seller.id
  );

  return {
    id: offer.id,
    nftTransactionId: offer.nftTransactionId,
    success: true,
  };
}
