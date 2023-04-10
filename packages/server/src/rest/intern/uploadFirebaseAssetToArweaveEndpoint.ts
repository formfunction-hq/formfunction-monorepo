import { NextFunction, Request, Response } from "express";
import uploadFirebaseAssetToArweave from "src/utils/arweave/uploadFirebaseAssetToArweave";

export default async function uploadFirebaseAssetToArweaveEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { assetTxid, fileStoragePath } = req.body;

  try {
    const txid = await uploadFirebaseAssetToArweave(
      req,
      fileStoragePath,
      assetTxid
    );
    res.json({
      arweaveUrl: `https://arweave.net/${assetTxid}`,
      bundlrUrl: `https://node1.bundlr.network/tx/${assetTxid}/data`,
      success: true,
      txid,
    });
  } catch (e) {
    res.status(500).json({
      arweaveUrl: `https://arweave.net/${assetTxid}`,
      bundlrUrl: `https://node1.bundlr.network/tx/${assetTxid}/data`,
      errorMessage: (e as Error).message,
    });
  }
}
