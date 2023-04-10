import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";

export default async function nftInfo(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { mint } = req.params;

  const prisma = getPrisma();
  const nft = await prisma.nft.findUnique({
    include: { NftListing: true },
    where: { mint },
  });

  res.json({
    nft: {
      mint: nft!.mint,
      priceInLamports: nft!.NftListing!.priceInLamports?.toString(),
      status: nft!.status,
    },
  });
}
