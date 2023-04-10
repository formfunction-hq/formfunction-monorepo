import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";
import dayjs from "formfn-shared/dist/utils/dates/dayjsex";
import invariant from "tiny-invariant";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import maybeUpsertAsset from "src/utils/asset/maybeUpsertAsset";

export default async function upsertSpotlight(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const {
    id,
    type,
    objectId,
    heroUnitLayout,
    startTime,
    endTime,
    url,
    title,
    description,
    status,
    label,
    userIds,
    assetSrc,
  } = req.body;
  const prisma = getPrisma();
  const existingSpotlight =
    id != null
      ? await prisma.spotlight.findUnique({
          where: { id },
        })
      : null;
  const asset = await maybeUpsertAsset(
    prisma,
    assetSrc,
    existingSpotlight?.assetId
  );

  const commonData = {
    assetId: asset != null ? asset.id : undefined,
    description: description ?? undefined,
    label: label ?? undefined,
    objectId: objectId ?? undefined,
    status: isEmptyString(status) ? null : status,
    title: title ?? undefined,
    url: url ?? undefined,
    userIds: userIds ?? undefined,
  };
  if (existingSpotlight == null) {
    invariant(
      type != null &&
        heroUnitLayout != null &&
        startTime != null &&
        endTime != null
    );
    const spotlight = await prisma.spotlight.create({
      data: {
        ...commonData,
        endTime: dayjs(endTime!).toDate(),
        heroUnitLayout: heroUnitLayout!,
        startTime: dayjs(startTime!).toDate(),
        type: type!,
      },
    });
    res.send({ spotlight });
    return;
  }

  invariant(id != null);
  const updateData = {
    ...commonData,
    endTime: endTime != null ? dayjs(endTime).toDate() : undefined,
    heroUnitLayout: heroUnitLayout ?? undefined,
    startTime: startTime != null ? dayjs(startTime).toDate() : undefined,
    type: type ?? undefined,
  };
  const spotlight = await prisma.spotlight.update({
    data: updateData,
    where: { id },
  });
  res.send({ spotlight });
}
