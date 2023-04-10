import { PublicKey } from "@solana/web3.js";
import { NextFunction, Request, Response } from "express";
import getAllTransferTxs from "src/utils/solana/txs/getAllTransferTxs";

/**
 * Interal endpoint for looking up all transfers for given mint
 */
export default async function transferTxs(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { mint } = req.query;

  const txs = await getAllTransferTxs(new PublicKey(mint as string));

  res.json({ transferTxs: txs });
}
