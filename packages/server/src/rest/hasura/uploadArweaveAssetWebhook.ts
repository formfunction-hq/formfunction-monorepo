import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import uploadFirebaseAssetToArweave from "src/utils/arweave/uploadFirebaseAssetToArweave";
import invariant from "tiny-invariant";
import isLastRetry from "src/utils/hasura/isLastRetry";
import toObject from "formfn-shared/dist/utils/toObject";
import logEvent from "src/utils/analytics/logEvent";
import getContentTypeFromFilename from "formfn-shared/dist/utils/getContentTypeFromFilename";

/**
 * Uploads an asset to Arweave, based on changes to Asset.arweaveTxid
 *
 * We do this in a webhook (i.e. asynchronously) to improve performance, e.g. when minting new NFTs.
 */
export default async function uploadArweaveAssetWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { body } = req;
  const { id } = body.event.data.new;

  const prisma = getPrisma();
  const asset = await prisma.asset.findUnique({
    where: {
      id,
    },
  });
  invariant(asset != null);

  if (asset.arweaveTxid == null) {
    res.json({
      message: "skipped (arweaveTxid is null)",
      success: true,
    });
    return;
  }

  try {
    await uploadFirebaseAssetToArweave(
      req,
      asset.path,
      asset.arweaveTxid,
      // Override the content type b/c for nonstandard assets like .glb files,
      // the one used by uploadFirebaseAssetToArweave doesn't work
      getContentTypeFromFilename(asset.path)
    );
    logEvent(AnalyticsEvent.UploadAssetToArweaveSuccess, req, {
      asset: toObject(asset),
    });
  } catch (e: any) {
    if (isLastRetry(req)) {
      logError(AnalyticsEvent.UploadAssetToArweaveFail, e, req, {
        asset: toObject(asset),
      });
    }
    // Throw the error so Hasura knows the webhook failed
    throw e;
  }

  res.json({ success: true });
}
