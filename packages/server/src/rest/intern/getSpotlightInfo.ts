import { NextFunction, Request, Response } from "express";
import SpotlightType from "src/types/enums/SpotlightType";
import getSpotlightInfoForSpotlightType from "src/utils/spotlights/getSpotlightInfoForSpotlightType";
import invariant from "tiny-invariant";
import toObject from "formfn-shared/dist/utils/toObject";
import getPrisma from "src/utils/prisma/getPrisma";

export default async function getSpotlightInfo(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { spotlightType, objectId, spotlightId } = req.query;
  // For cases where the `spotlightId` was removed from the input box
  if (spotlightId === "") {
    res.send({ spotlightInfo: {} });
    return;
  }

  if (spotlightId != null) {
    const prisma = getPrisma();
    const spotlight = await prisma.spotlight.findUnique({
      where: { id: spotlightId as string },
    });
    if (spotlight == null) {
      res.send({ spotlightInfo: {} });
      return;
    }

    const { type, objectId: objectIdInner } = spotlight;
    const spotlightInfo = await getSpotlightInfoForSpotlightType(
      type as SpotlightType,
      objectIdInner ?? ""
    );
    res.send({ spotlightInfo: toObject(spotlightInfo) });
    return;
  }

  invariant(spotlightType != null);
  const spotlightInfo = await getSpotlightInfoForSpotlightType(
    spotlightType as SpotlightType,
    objectId != null ? String(objectId) : ""
  );
  res.send({ spotlightInfo: toObject(spotlightInfo) });
}
