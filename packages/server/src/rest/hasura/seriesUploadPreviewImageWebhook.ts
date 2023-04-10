import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import uploadFirebaseAssetToArweave from "src/utils/arweave/uploadFirebaseAssetToArweave";
import invariant from "tiny-invariant";

/**
 * Uploads the preview image of the Series to Arweave.
 * We do this in a webhook in an async way to
 * improve performance when minting/editing series.
 *
 * See uploadNftToArweaveResolver.ts for more details.
 */
export default async function seriesUploadPreviewImageWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { body } = req;
  const { avatarPhotoId } = body.event.data.new;

  const prisma = getPrisma();
  const previewPhoto = await prisma.photo.findUnique({
    where: {
      id: avatarPhotoId,
    },
  });
  if (previewPhoto == null) {
    logError(
      AnalyticsEvent.UploadSeriesToArweaveFail,
      `preview photo with id ${avatarPhotoId} could not be loaded`,
      req,
      {
        avatarPhotoId,
      }
    );
    res.json({ success: false });
    return;
  }
  invariant(
    previewPhoto.storagePath != null,
    "storagePath must not be null for series preview photos"
  );

  await uploadFirebaseAssetToArweave(req, previewPhoto!.storagePath!);

  res.json({ success: true });
}
