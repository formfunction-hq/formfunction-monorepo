import { NextFunction, Request, Response } from "express";
import invariant from "tiny-invariant";
import parseAndInsertTransaction from "src/utils/transaction/parseAndInsertTransaction";
import toObject from "formfn-shared/dist/utils/toObject";

/**
 * Used for manual insertions of transactions. Reads
 * on-chain transaction data and inserts the transaction
 * into our DB.
 */
export default async function tx(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  invariant(req.method === "POST", "Only POST supported");
  const { mint, txid, insertRaw, updateNft, updateMasterEditionNft } = req.body;
  invariant(mint != null && txid != null, "mint and txid must be specified");

  const createdTx = await parseAndInsertTransaction({
    insertRaw: insertRaw === "true",
    mint,
    req,
    txid,
    updateMasterEditionNft,
    updateNft,
  });
  res.json({
    createdTx: toObject(createdTx),
  });
}
