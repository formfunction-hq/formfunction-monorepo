import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";
import uploadNftMetadataToArweave from "src/utils/arweave/uploadNftMetadataToArweave";
import axios from "axios";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import getArweaveLink from "formfn-shared/dist/utils/getArweaveLink";

// This endpoint assumes that the Nft and Nft Metadata objects
// for the provided mint exists in our DB.
export default async function uploadMetadataWithGifPreview(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { mint } = req.body;

  const prisma = getPrisma();
  const metadata = await prisma.nftMetadata.findUnique({ where: { mint } });
  if (metadata == null) {
    res.sendStatus(400);
    return;
  }
  const { image: fileName, uri } = metadata;

  let arweaveMetadata;
  try {
    // We fetch the image URI stored on Arweave to
    // to use the same thumbnails that we generate
    // for MP4 files. See uploadNftToArweaveResolver.ts
    // for more details.
    arweaveMetadata = await axios(uri);
  } catch (err: any) {
    logError(AnalyticsEvent.FetchMetadataFail, err, req, {
      metadata,
      mint,
    });
    res.sendStatus(500);
    return;
  }

  const {
    animation_url,
    attributes,
    collection,
    properties,
    description,
    external_url,
    name,
    seller_fee_basis_points,
    symbol,
  } = arweaveMetadata.data;
  const result = await uploadNftMetadataToArweave(req, fileName, {
    animation_url,
    attributes,
    collection,
    description,
    external_url,
    name,
    properties,
    seller_fee_basis_points,
    symbol,
  });

  res.json({
    metadataArweaveLink: getArweaveLink(result.metadataTxid),
  });
}
