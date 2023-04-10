import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { NextFunction, Request, Response } from "express";
import invariant from "tiny-invariant";
import getBuyerEscrowBalance from "src/utils/solana/getBuyerEscrowBalance";
import getAuctionHouseSdk from "src/utils/solana/getAuctionHouseSdk";
import { CurrencyNameExpress_Enum } from "src/__generated__/generated";

export default async function buyerEscrowBalance(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  invariant(req.method === "GET", "Only GET requests supported");
  const { userId } = req.params;
  const { mint } = req.query;

  // TODO(@bryancho): figure out how to specify currency for this intern endpoint
  const auctionHouseSdk = getAuctionHouseSdk(CurrencyNameExpress_Enum.Solana);
  const { balance: lamports } = await getBuyerEscrowBalance(
    auctionHouseSdk,
    userId,
    mint as string
  );
  res.json({ lamports, sol: (lamports / LAMPORTS_PER_SOL).toFixed(2) });
}
