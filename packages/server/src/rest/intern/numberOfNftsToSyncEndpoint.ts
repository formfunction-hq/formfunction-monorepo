import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";
import { NftStatusExpress_Enum } from "src/__generated__/generated";

export default async function numberOfNftsToSyncEndpoint(
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const prisma = getPrisma();
  const count = await prisma.nft.count({
    where: {
      status: {
        not: NftStatusExpress_Enum.Burned,
      },
    },
  });

  res.json({ count });
}
