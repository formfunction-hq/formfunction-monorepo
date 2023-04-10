import { NextFunction, Request, Response } from "express";
import SOLD_TRANSACTION_TYPES from "src/constants/SoldTransactionTypes";
import getPrisma from "src/utils/prisma/getPrisma";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";
import invariant from "tiny-invariant";

export default async function updateIsCollectorForTransactionWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { body } = req;
  const { id } = body.event.data.new;

  const prisma = getPrisma();
  const nftTransaction = await prisma.nftTransaction.findUnique({
    where: {
      id,
    },
  });
  invariant(nftTransaction != null);

  if (
    !SOLD_TRANSACTION_TYPES.includes(
      nftTransaction.type as NftTransactionTypeExpress_Enum
    )
  ) {
    res.json({ skipped: true, success: true });
    return;
  }

  await prisma.user.update({
    data: {
      isCollector2: true,
    },
    where: {
      id: nftTransaction.toUserId,
    },
  });

  res.json({ success: true });
}
