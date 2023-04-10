import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";

export default async function userInfo(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { userIds } = req.query;
  const userIdsArray = (userIds as string).split(",");

  const prisma = getPrisma();
  const users = await prisma.user.findMany({
    include: {
      NftTransaction_NftTransaction_creatorIdToUser: true,
      Photo_PhotoToUser_profilePhotoId: true,
    },
    where: {
      id: {
        in: userIdsArray,
      },
    },
  });

  const usersFormatted = users.map((user) => ({
    displayName: user.displayName,
    id: user.id,
    profileLink: `https://formfunction.xyz/@${user.username}`,
    profilePhotoUrl: user.Photo_PhotoToUser_profilePhotoId?.photoUrl,
    sales: user.NftTransaction_NftTransaction_creatorIdToUser.filter(
      (tx) => tx.type === NftTransactionTypeExpress_Enum.Sold
    ).map((tx) => ({
      from: tx.fromUserId,
      price: tx.price?.toString(),
      timestamp: tx.timeCreated,
      to: tx.toUserId,
      txid: tx.txid,
    })),
    twitterName: user.twitterName,
    username: user.username,
  }));

  res.json({ users: usersFormatted });
}
