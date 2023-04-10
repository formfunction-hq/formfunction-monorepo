import { NextFunction, Request, Response } from "express";
import { nanoid } from "nanoid";
import probe from "probe-image-size";
import uploadFileFromUrl from "src/utils/firebase/uploadFileFromUrl";
import getFileExtFromContentType from "src/utils/getFileExtFromContentType";
import getPrisma from "src/utils/prisma/getPrisma";
import dayjs from "src/utils/dates/dayjsex";
import getTimeElapsed from "src/utils/dates/getTimeElapsed";
import logEvent from "src/utils/analytics/logEvent";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";

/**
 * Should rarely need to call this, since uploadImportedAssetWebhook has a long timeout + retries.
 */
export default async function uploadImportedAssetEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const startTime = dayjs();
  const { mint } = req.body;
  const prisma = getPrisma();
  const nftMetadata = await prisma.nftMetadata.findUnique({
    include: {
      Nft: true,
    },
    where: {
      mint,
    },
  });

  if (
    nftMetadata == null ||
    !nftMetadata.Nft!.isImported ||
    nftMetadata.image.includes("nft-images")
  ) {
    res.json({ skipped: true });
    return;
  }

  try {
    const asset = nftMetadata.image;
    const ext = getFileExtFromContentType(nftMetadata.contentType);
    const uploadResults = await uploadFileFromUrl(
      asset,
      `nft-images/${nanoid()}${ext == null ? "" : `.${ext}`}`
    );
    const assetDimensions = nftMetadata.contentType.includes("video")
      ? // In this case, dimensions will be populated later (once we upload to Mux)
        { height: 0, width: 0 }
      : await probe(asset);

    await prisma.nftMetadata.update({
      data: {
        assetHeight: assetDimensions.height,
        assetWidth: assetDimensions.width,
        image: uploadResults.fileName,
      },
      where: {
        mint,
      },
    });

    logEvent(AnalyticsEvent.UploadImportedAssetSuccess, req, {
      mint,
      ...getTimeElapsed(startTime),
    });
    res.json({ success: true, ...getTimeElapsed(startTime) });
  } catch (e) {
    logError(AnalyticsEvent.UploadImportedAssetError, e as Error, req, {
      mint,
      ...getTimeElapsed(startTime),
    });
    throw e;
  }
}
