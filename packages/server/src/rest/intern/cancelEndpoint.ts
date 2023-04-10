import { PublicKey, sendAndConfirmTransaction } from "@solana/web3.js";
import { NextFunction, Request, Response } from "express";
import findAta from "formfn-shared/dist/utils/solana/pdas/findAta";
import toObject from "formfn-shared/dist/utils/toObject";
import getAuthorityKeypair from "src/utils/keypairs/getAuthorityKeypair";
import getPrisma from "src/utils/prisma/getPrisma";
import getAuctionHouseSdk from "src/utils/solana/getAuctionHouseSdk";
import getConnection from "src/utils/solana/getConnection";
import { CurrencyNameExpress_Enum } from "src/__generated__/generated";
import invariant from "tiny-invariant";

async function cancelListing(mint: string) {
  const prisma = getPrisma();
  const nft = await prisma.nft.findUnique({
    include: { NftListing: { include: { Currency: true } } },
    where: { mint },
  });
  invariant(nft != null);

  const auctionHouseSdk = getAuctionHouseSdk(
    nft.NftListing!.Currency.name as CurrencyNameExpress_Enum
  );
  const sellerId = new PublicKey(nft.ownerId);
  const mintKey = new PublicKey(nft.mint);
  const [ata] = await findAta(sellerId, mintKey);
  const cancelTx = await auctionHouseSdk.cancelTx(
    {
      priceInLamports: Number(nft.NftListing!.priceInLamports),
      tokenAccount: ata,
      tokenMint: mintKey,
      wallet: sellerId,
    },
    {}
  );
  const txid = await sendAndConfirmTransaction(getConnection(), cancelTx, [
    getAuthorityKeypair(),
  ]);

  return { mint: nft.mint, txid };
}

export default async function cancelEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { mint } = req.body;
  invariant(mint != null);
  const cancelResult = await cancelListing(mint);

  res.json(toObject(cancelResult));
}
