import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { NextFunction, Request, Response } from "express";
import invariant from "tiny-invariant";
import getAuthorityKeypair from "src/utils/keypairs/getAuthorityKeypair";
import sendBidderOutbidEmail from "src/utils/email/auction-emails/sendBidderOutbidEmail";
import formatLamports from "formfn-shared/dist/utils/formatLamports";
import getImageSrcForEmail from "src/utils/getImageSrcForEmail";
import getPrisma from "src/utils/prisma/getPrisma";
import getConnection from "src/utils/solana/getConnection";
import getExplorerTxLink from "src/utils/solana/getExplorerTxLink";
import findAta from "formfn-shared/dist/utils/solana/pdas/findAta";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import maybeString from "formfn-shared/dist/utils/string/maybeString";
import getCreateAtaTx from "formfn-shared/dist/utils/solana/txs/getCreateAtaTx";
import getAuctionHouseSdk from "src/utils/solana/getAuctionHouseSdk";
import { CurrencyNameExpress_Enum } from "src/__generated__/generated";
import logError from "src/utils/analytics/logError";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";

async function sendRefundEmail(
  req: Request,
  input: {
    lastBidPrice: string;
    mint: string;
    refundTxid: string;
    sellerId: string;
    userId: string;
  }
): Promise<{
  errorMessage?: string;
  success: boolean;
}> {
  const prisma = getPrisma();
  const { lastBidPrice, mint, refundTxid, sellerId, userId } = input;

  const [seller, user, nft] = await Promise.all([
    prisma.user.findUnique({ where: { id: sellerId } }),
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.nft.findUnique({
      include: { NftDisclosure: true, NftMetadata: true },
      where: { mint },
    }),
  ]);
  if (seller == null || user == null || nft == null || user.email == null) {
    return {
      errorMessage: "Could not load all resources required to send email",
      success: false,
    };
  }

  const emailSent = await sendBidderOutbidEmail(
    {
      imageSrc: getImageSrcForEmail(nft!.NftMetadata, nft.NftDisclosure),
      nftMint: mint,
      nftName: nft!.NftMetadata.name,
      price: formatLamports(Number(lastBidPrice)),
      seller: seller!.username,
      txLink: getExplorerTxLink(refundTxid),
    },
    user.email,
    req
  );

  return {
    errorMessage: emailSent ? undefined : "Email was not sent successfully",
    success: emailSent,
  };
}

async function getTokenAccount(
  connection: Connection,
  tokenAccount: Maybe<string>,
  sellerId: Maybe<string>,
  mint: Maybe<string>
): Promise<PublicKey> {
  if (tokenAccount != null) {
    const tokenAccountKey = new PublicKey(tokenAccount);
    const tokenAccountIsInitialized =
      (await connection.getAccountInfo(new PublicKey(tokenAccount))) != null;
    if (tokenAccountIsInitialized) {
      return tokenAccountKey;
    }

    throw new Error(
      "The provided tokenAccount is not initialized, please try using the ATA by providing sellerId and mint"
    );
  }

  invariant(
    sellerId != null && mint != null,
    "sellerId and mint must be non-null if tokenAccount is not supplied"
  );

  const [ata] = await findAta(
    // Need to use tokenAccount of seller (owner of NFT), not of the buyer
    new PublicKey(sellerId),
    new PublicKey(mint)
  );
  return ata;
}

async function maybeCreateAta(
  createAta: boolean,
  mint: Maybe<string>,
  sellerId: Maybe<string>,
  tokenAccount: Maybe<string>,
  authorityKeypair: Keypair
) {
  if (createAta === false) {
    return null;
  }

  invariant(
    sellerId != null && mint != null && tokenAccount == null,
    "sellerId and mint must be non-null if createAta is true and tokenAccount must not be provided"
  );
  const tx = await getCreateAtaTx(
    new PublicKey(mint),
    new PublicKey(sellerId),
    authorityKeypair
  );
  return ConnectionWrapper.sendAndConfirmTransaction(tx, [authorityKeypair], {
    commitment: "confirmed",
  });
}

// Can be used to "refund" a user for any non-zero balance in
// their buyer escrow account for a given mint and userId.
// Currently, this can be used for two use-cases:
//   1. Bids (should specify lastBidPrice and sellerId for email)
//   2. Offers (lastBidPrice, sellerId optional)
// NOTE: for offers, using `refundOffer` is preferred but
// this can still be used if the offer object does not exist
// in our DB for whatever reason.
export default async function refund(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  invariant(req.method === "POST", "Only POST supported");

  const {
    amount,
    createAta,
    lastBidPrice,
    mint,
    sellerId,
    tokenAccount,
    userId,
    currency = CurrencyNameExpress_Enum.Solana,
    withdrawOnly,
  } = req.body;
  const auctionHouseSdk = getAuctionHouseSdk(
    currency as CurrencyNameExpress_Enum
  );
  const connection = getConnection();
  const authorityKeypair = getAuthorityKeypair();
  const createAtaTxid = await maybeCreateAta(
    createAta ?? false,
    mint,
    sellerId,
    tokenAccount,
    authorityKeypair
  );

  const accounts = {
    receiptAccount: new PublicKey(userId),
    tokenAccount: await getTokenAccount(
      connection,
      maybeString(tokenAccount),
      maybeString(sellerId),
      maybeString(mint)
    ),
    tokenMint: new PublicKey(mint),
    wallet: new PublicKey(userId),
  };
  const tx =
    withdrawOnly === true
      ? await auctionHouseSdk.withdrawTx(accounts, { amount })
      : await auctionHouseSdk.withdrawAndCancelTx(accounts, { amount });

  try {
    const refundTxid = await ConnectionWrapper.sendAndConfirmTransaction(tx, [
      authorityKeypair,
    ]);

    // Only send refund email if lastBidPrice is provided
    if (refundTxid != null && lastBidPrice != null) {
      const emailResult = await sendRefundEmail(req, {
        lastBidPrice,
        mint,
        refundTxid,
        sellerId,
        userId,
      });
      res.json({ createAtaTxid, emailResult, refundTxid, success: true });
      return;
    }

    res.json({ createAtaTxid, refundTxid, success: true });
    return;
  } catch (e: any) {
    logError(AnalyticsEvent.ExpressError, e, req, { accounts });

    throw e;
  }
}
