import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";
import logError from "src/utils/analytics/logError";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import removeDuplicatesWithSet from "formfn-shared/dist/utils/array/removeDuplicatesWithSet";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import getHolaplexAuctionInfoFromMint from "src/utils/solana/txs/parse/holaplex/getHolaplexAuctionInfoFromMint";

async function inner(req: Request, res: Response) {
  const { dryRun, creatorId, mint } = req.body;
  const holaplexInfo = await getHolaplexAuctionInfoFromMint(mint, creatorId);
  const holaplexTxs = holaplexInfo?.transactions ?? [];

  if (dryRun) {
    res.json({ holaplexTxs });
    return;
  }

  const prisma = getPrisma();

  const fromAddresses = holaplexTxs.map((tx) => tx.fromAddress);
  const toAddresses = holaplexTxs.map((tx) => tx.toAddress);
  const allUserAddresses = removeDuplicatesWithSet([
    ...fromAddresses,
    ...toAddresses,
  ]);

  const existingUsers = filterNulls(
    await prisma.user.findMany({
      where: {
        id: {
          in: allUserAddresses,
        },
      },
    })
  ).map((user) => user.id);

  const usersToCreate = allUserAddresses.filter(
    (address) => !existingUsers.includes(address)
  );
  const userCreateMany = prisma.user.createMany({
    data: usersToCreate.map((address) => ({
      id: address,
      username: address,
    })),
  });

  const txsCreateMany = prisma.nftTransaction.createMany({
    data: holaplexTxs.map((holaplexTx) => ({
      creatorId: holaplexTx.creatorId,
      fromUserId: holaplexTx.fromAddress,
      mint: holaplexTx.mint,
      price:
        holaplexTx.priceInLamports == null
          ? null
          : Number(holaplexTx.priceInLamports),
      source: holaplexTx.source,
      timeCreated: holaplexTx.timeCreated,
      toUserId: holaplexTx.toAddress,
      txid: holaplexTx.txid,
      type: holaplexTx.type,
    })),
  });

  await prisma.$transaction([userCreateMany, txsCreateMany]);

  res.json({ holaplexTxs });
}

export default async function insertHolaplexTxs(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  try {
    await inner(req, res);
  } catch (e) {
    logError(AnalyticsEvent.InsertHolaplexTxsError, e as Error, req, {
      body: req.body,
    });

    res.status(500);
  }
}
