import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";

export default async function fetchUserByUsername(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const prisma = getPrisma();
  const { username } = req.params;
  const user = await prisma.user.findUnique({
    include: { Photo_PhotoToUser_profilePhotoId: true },
    where: { username },
  });
  if (user == null) {
    res.sendStatus(404);
    return;
  }

  const { displayName, Photo_PhotoToUser_profilePhotoId } = user;

  res.json({
    displayName,
    image: Photo_PhotoToUser_profilePhotoId?.photoUrl,
  });
}
