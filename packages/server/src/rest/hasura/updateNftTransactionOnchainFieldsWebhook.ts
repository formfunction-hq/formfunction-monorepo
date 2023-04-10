import { NextFunction, Request, Response } from "express";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getPrisma from "src/utils/prisma/getPrisma";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";
import getTransactionSizeInBytes from "src/utils/solana/txs/getTransactionSizeInBytes";

export default async function updateNftTransactionOnchainFieldsWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { id, txid } = req.body.event.data.new as {
    id: string;
    txid: Maybe<string>;
  };

  if (txid == null) {
    res.json({ skipped: true });
    return;
  }

  const tx = await ConnectionWrapper.getParsedTransaction(txid, "confirmed");
  if (tx == null) {
    throw new Error("Transaction not found");
  }

  const txSizeInBytes = await getTransactionSizeInBytes(txid);
  const txVersion = String(tx.version);

  const prisma = getPrisma();
  await prisma.nftTransaction.update({
    data: {
      txSizeInBytes,
      txVersion,
    },
    where: {
      id,
    },
  });

  res.json({ success: true, txSizeInBytes, txVersion });
}
