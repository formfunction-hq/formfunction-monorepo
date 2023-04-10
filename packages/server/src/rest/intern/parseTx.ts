import { PublicKey } from "@solana/web3.js";
import { NextFunction, Request, Response } from "express";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import isPublicKey from "formfn-shared/dist/utils/solana/isPublicKey";
import parseNftTx from "src/utils/solana/txs/parse/parseNftTx";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";

/**
 * Parses the passed in transaction and returns it.
 */
export default async function parseTx(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { mint, txid } = req.query;

  const parsedTx = await ConnectionWrapper.getParsedTransaction(txid as string);

  const tokenMint = !isPublicKey((mint as MaybeUndef<string>) ?? "")
    ? null
    : new PublicKey(mint!);

  const parsedNftTx = await parseNftTx(
    parsedTx ?? null,
    tokenMint ?? undefined
  );

  res.json({ parsedNftTx, parsedTx });
}
