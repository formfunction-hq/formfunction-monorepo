import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { NextFunction, Request, Response } from "express";
import getNftTxs from "src/utils/solana/txs/getNftTxs";

export default async function txsForNft(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { mint } = req.params;
  const transactions = await getNftTxs(new PublicKey(mint));

  res.json({
    txs: transactions.map((tx) => ({
      id: tx.id,
      priceInLamports: tx.priceInLamports,
      priceInSol:
        tx.priceInLamports == null
          ? null
          : (tx.priceInLamports / LAMPORTS_PER_SOL).toFixed(2),
      timeCreated: tx.timeCreated,
      txid: tx.txid,
      type: tx.type,
    })),
  });
}
