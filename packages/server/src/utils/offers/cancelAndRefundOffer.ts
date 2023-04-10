import { Request } from "express";
import { PublicKey } from "@solana/web3.js";
import getTokenAccountFromBuyTx from "formfn-shared/dist/utils/solana/txs/getTokenAccountFromBuyTx";
import getPaymentAccountFromBuyTx from "formfn-shared/dist/utils/solana/txs/getPaymentAccountFromBuyTx";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import { OfferWithNftAndTransaction } from "src/types/OfferWithNftAndTransaction";
import logError from "src/utils/analytics/logError";
import getAuthorityKeypair from "src/utils/keypairs/getAuthorityKeypair";
import getAuctionHouseConstants from "src/utils/solana/getAuctionHouseConstants";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";
import getPrisma from "src/utils/prisma/getPrisma";
import createBuyerOfferExpiredNotification from "src/utils/notifications/create/createBuyerOfferExpiredNotification";
import { CurrencyNameExpress_Enum } from "src/__generated__/generated";
import getAuctionHouseSdk from "src/utils/solana/getAuctionHouseSdk";
import getErrorPropertiesToLog from "formfn-shared/dist/utils/analytics/getErrorPropertiesToLog";
import getCreateAtaTx from "formfn-shared/dist/utils/solana/txs/getCreateAtaTx";
import combineTransactions from "formfn-shared/dist/utils/solana/txs/combineTransactions";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import jsonStringify from "formfn-shared/dist/utils/jsonStringify";

export default async function cancelAndRefundOffer(
  req: Request,
  offer: OfferWithNftAndTransaction
): Promise<{
  accounts?: { [key: string]: Maybe<string> };
  errorMessage?: string;
  id: string;
  nftTransactionId: string;
  success: boolean;
  trace?: string;
}> {
  const {
    price,
    fromUserId,
    Nft: { mint, NftMetadata: nftMetadata },
    From: buyer,
    To: seller,
    Currency,
  } = offer.NftTransaction;
  const prisma = getPrisma();
  const currencyName = Currency.name as CurrencyNameExpress_Enum;
  const auctionHouseSdk = getAuctionHouseSdk(currencyName);
  const mintKey = new PublicKey(mint);
  const parsedTx = await ConnectionWrapper.getParsedTransaction(
    offer.NftTransaction.txid!
  );
  const [tokenAccount, paymentAccount] = await Promise.all([
    getTokenAccountFromBuyTx(parsedTx, getAuctionHouseConstants().programId),
    getPaymentAccountFromBuyTx(parsedTx, getAuctionHouseConstants().programId),
  ]);
  if (tokenAccount == null) {
    const errorMessage = `Could not obtain token account for ${offer.NftTransaction.txid}`;
    logError(AnalyticsEvent.ProcessExpiredOffersError, errorMessage, req, {
      offer,
    });
    return {
      errorMessage,
      id: offer.id,
      nftTransactionId: offer.nftTransactionId,
      success: false,
    };
  }

  const authorityKeypair = getAuthorityKeypair();
  const buyerKey = new PublicKey(fromUserId);
  const tokenAccountData = await ConnectionWrapper.getAccountInfo(tokenAccount);
  // Sometimes the token account may already be closed by the time we want to cancel
  // and refund the offer which may cause an anchor error. To prevent this, we
  // create the ATA first if necessary
  const maybeCreateAtaTx =
    tokenAccountData == null
      ? await getCreateAtaTx(
          new PublicKey(mint),
          new PublicKey(seller.id),
          authorityKeypair
        )
      : null;
  const accounts = {
    receiptAccount: paymentAccount!,
    tokenAccount,
    tokenMint: mintKey,
    wallet: buyerKey,
  };
  const args = { amount: Number(price)! };
  const cancelOfferAndRefundTx = await auctionHouseSdk.withdrawAndCancelTx(
    accounts,
    args
  );
  const combinedTx =
    maybeCreateAtaTx != null
      ? combineTransactions([maybeCreateAtaTx, cancelOfferAndRefundTx])
      : cancelOfferAndRefundTx;

  let refundTxid;
  try {
    refundTxid = await ConnectionWrapper.sendAndConfirmTransaction(combinedTx, [
      authorityKeypair,
    ]);
  } catch (e: any) {
    return {
      accounts: {
        receiptAccount: buyerKey.toString(),
        sellerAccount: seller.id,
        tokenAccount: tokenAccount.toString(),
        tokenAccountData:
          tokenAccountData == null ? null : jsonStringify(tokenAccountData),
        tokenMint: mintKey.toString(),
        wallet: buyerKey.toString(),
      },
      id: offer.id,
      nftTransactionId: offer.nftTransactionId,
      success: false,
      ...getErrorPropertiesToLog(e),
    };
  }

  await prisma.offer.update({
    data: { refundTxid },
    where: { nftTransactionId: offer.nftTransactionId },
  });

  try {
    await createBuyerOfferExpiredNotification(
      {
        nftMint: nftMetadata.mint,
        offerTransactionId: offer.NftTransaction.id,
        refundTxid,
      },
      buyer.id,
      seller.id
    );
  } catch (e: any) {
    logError(AnalyticsEvent.SendEmailFail, e, req, { buyer, offer });
  }

  return {
    id: offer.id,
    nftTransactionId: offer.nftTransactionId,
    success: true,
  };
}
