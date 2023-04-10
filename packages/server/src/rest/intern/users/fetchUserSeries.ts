import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";

export default async function fetchUserSeries(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const prisma = getPrisma();
  const { username, seriesSlug } = req.params;
  const series = await prisma.series.findFirst({
    include: { Photo_PhotoToSeries_avatarPhotoId: true },
    where: {
      AND: {
        User: { username: { equals: username } },
        slug: { equals: seriesSlug },
      },
    },
  });
  if (series == null) {
    res.sendStatus(404);
    return;
  }

  const { name, Photo_PhotoToSeries_avatarPhotoId } = series;

  res.json({
    image: Photo_PhotoToSeries_avatarPhotoId?.photoUrl,
    name,
  });
}
