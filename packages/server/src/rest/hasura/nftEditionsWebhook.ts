import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";
import sleep from "formfn-shared/dist/utils/sleep";
import dayjs from "src/utils/dates/dayjsex";
import getEditionUpdateFields from "src/utils/nft/getEditionUpdateFields";
import isLastRetry from "src/utils/hasura/isLastRetry";

export default async function nftEditionsWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { body } = req;
  const { mint } = body.event.data.new;

  // If we don't do this, metaplex will throw an error when getting the edition. It's not that time sensitive anyways so...
  await sleep(dayjs.duration({ seconds: 45 }));

  const update = await getEditionUpdateFields(mint, isLastRetry(req));

  if (update != null) {
    const prisma = getPrisma();
    await prisma.nft.update({
      data: update,
      where: { mint },
    });
    res.json({ success: true }).send();
    return;
  }

  res.status(500).send();
}
