import { NextFunction, Request, Response } from "express";
import getHolaplexAuctionInfoFromAuction from "src/utils/solana/txs/parse/holaplex/getHolaplexAuctionInfoFromAuction";
import getHolaplexAuctionInfoFromMint from "src/utils/solana/txs/parse/holaplex/getHolaplexAuctionInfoFromMint";

export default async function holaplexAuctionInfoEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { auctionAddress, mint } = req.body;
  if (auctionAddress != null && auctionAddress !== "") {
    const auctionInfo = await getHolaplexAuctionInfoFromAuction(
      auctionAddress as string,
      "PLACEHOLDER"
    );
    res.json({ auctionInfo });
  } else {
    const auctionInfo = await getHolaplexAuctionInfoFromMint(
      mint as string,
      "PLACEHOLDER"
    );
    res.json({ auctionInfo });
  }
}
