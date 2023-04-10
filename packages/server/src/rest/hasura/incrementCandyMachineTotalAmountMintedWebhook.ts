import { NextFunction, Request, Response } from "express";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import isLastRetry from "src/utils/hasura/isLastRetry";
import getPrisma from "src/utils/prisma/getPrisma";
import invariant from "tiny-invariant";

export default async function incrementCandyMachineTotalAmountMintedWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { body } = req;
  const { id } = body.event.data.new;

  try {
    const prisma = getPrisma();
    const nft = await prisma.nft.findUnique({
      include: {
        Series: {
          include: {
            CandyMachine: true,
          },
        },
      },
      where: {
        id,
      },
    });
    invariant(nft != null);

    if (nft.Series?.CandyMachine == null) {
      res.json({ skipped: true, success: true });
      return;
    }

    const newCandyMachine = await prisma.candyMachine.update({
      data: {
        totalAmountMinted: {
          increment: 1,
        },
      },
      where: {
        id: nft.Series.CandyMachine.id,
      },
    });

    res.json({
      totalAmountMintedNew: newCandyMachine.totalAmountMinted,
      totalAmountMintedOld: nft.Series.CandyMachine.totalAmountMinted,
    });
  } catch (e) {
    if (isLastRetry(req)) {
      logError(
        AnalyticsEvent.IncrementCandyMachineTotalAmountMintedError,
        e as Error,
        req,
        {
          nftId: id,
        }
      );
    }
    res.sendStatus(500);
  }
}
