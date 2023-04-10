import { PublicKey } from "@solana/web3.js";
import { NextFunction, Request, Response } from "express";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import logEvent from "src/utils/analytics/logEvent";
import getAuthorityKeypair from "src/utils/keypairs/getAuthorityKeypair";
import {
  CurrencyNameExpress_Enum,
  NftStatusExpress_Enum,
} from "src/__generated__/generated";
import findAta from "formfn-shared/dist/utils/solana/pdas/findAta";
import isLastRetry from "src/utils/hasura/isLastRetry";
import getAuctionHouseSdk from "src/utils/solana/getAuctionHouseSdk";
import getPrisma from "src/utils/prisma/getPrisma";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";

export default async function soldOutEditionsWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { body } = req;
  const { mint, ownerId, status } = body.event.data.new;

  if (status !== NftStatusExpress_Enum.SoldOutEditions) {
    res.json({ message: "no-op" });
    return;
  }

  const prisma = getPrisma();
  const nftListing = await prisma.nftListing.findUnique({
    include: { Currency: true },
    where: { nftId: mint },
  });
  const auctionHouseSdk = getAuctionHouseSdk(
    nftListing!.Currency.name as CurrencyNameExpress_Enum
  );
  const ownerKey = new PublicKey(ownerId);
  const mintKey = new PublicKey(mint);
  const [ata] = await findAta(ownerKey, mintKey);
  const authorityKeypair = getAuthorityKeypair();
  const tx = await auctionHouseSdk.closeEditionDistributorTokenAccount({
    mint: mintKey,
    owner: ownerKey,
    rentReceiver: getAuthorityKeypair().publicKey,
    tokenReceiver: ata,
    wallet: authorityKeypair.publicKey,
  });

  try {
    const txid = await ConnectionWrapper.sendAndConfirmTransaction(tx, [
      getAuthorityKeypair(),
    ]);
    logEvent(AnalyticsEvent.CloseEditionDistributorTokenAccountSuccess, req, {
      nft: body.event.data.new,
      txid,
    });

    res.json({ status: "success", txid });
  } catch (e) {
    if (isLastRetry(req)) {
      logError(
        AnalyticsEvent.CloseEditionDistributorTokenAccountFail,
        e as Error,
        req,
        {
          nft: body.event.data.new,
          tokenReceiver: ata.toString(),
        }
      );
    }

    res
      .status(500)
      .json({ errorMessage: (e as Error).message, status: "failure" });
  }
}
