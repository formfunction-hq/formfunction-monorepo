import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import invariant from "tiny-invariant";

export default async function populateNftTransactionUsdPriceWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { body } = req;
  const { id, currencyId, price } = body.event.data.new as {
    currencyId: string;
    id: string;
    price: Maybe<number>;
  };

  if (price == null) {
    res.json({ skipped: true });
    return;
  }

  const prisma = getPrisma();
  const currency = await prisma.currency.findUnique({
    where: { id: currencyId },
  });
  invariant(currency != null);

  const usdPrice =
    currency.usdRate == null
      ? null
      : price / 10 ** currency.decimals / currency.usdRate!.toNumber();

  await prisma.nftTransaction.update({
    data: {
      usdPrice,
    },
    where: {
      id,
    },
  });
  res.json({ currencyName: currency.name, skipped: true, usdPrice });
}
