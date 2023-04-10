import axios from "axios";
import { NextFunction, Request, Response } from "express";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import getImgixUrl from "src/utils/getImgixUrl";
import getPrisma from "src/utils/prisma/getPrisma";

export default async function fetchNftMetadata(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const prisma = getPrisma();
  const { mint } = req.params;
  const nftMetadata = await prisma.nftMetadata.findUnique({ where: { mint } });
  if (nftMetadata == null) {
    res.sendStatus(404);
    return;
  }

  const { name, uri, image, assetHeight, assetWidth } = nftMetadata;
  if (!image.endsWith(".gif") && !image.endsWith(".mp4")) {
    res.json({
      assetHeight,
      assetWidth,
      image: getImgixUrl(image, { height: 500 }),
      name,
    });
    return;
  }

  let arweaveMetadata = null;
  try {
    // We fetch the image URI stored on Arweave to
    // to use the same thumbnails that we generate
    // for MP4 files. See uploadNftToArweaveResolver.ts
    // for more details.
    arweaveMetadata = await axios(uri);
  } catch (err: any) {
    logError(AnalyticsEvent.FetchMetadataFail, err, req, {
      nftMetadata,
    });
    res.sendStatus(500);
    return;
  }

  res.json({
    assetHeight,
    assetWidth,
    image: arweaveMetadata?.data.image,
    name,
  });
}
