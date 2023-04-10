import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";
import invariant from "tiny-invariant";
import { getStorage, getDownloadURL, ref } from "firebase/storage";
import getErrorPropertiesToLog from "formfn-shared/dist/utils/analytics/getErrorPropertiesToLog";

const MP4_EXTENSION = ".mp4";

/**
 * We have a Firebase function that converts GIFs >= 1 second in length to MP4s for
 * performance reasons (see https://github.com/formfunction-hq/formfn-cloud-functions for more info).
 *
 * This webhook updates our DB to point to the new MP4 file.
 *
 * We opted for a webhook rather than POSTing to one of our endpoints in the Firebase function
 * because it is possible that someone uploads a GIF but doesn't end up actually minting the corresponding
 * NFT.
 */
export default async function nftMetadataGifToMp4Webhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { id } = req.body.event.data.new;

  const prisma = getPrisma();
  const nftMetadata = await prisma.nftMetadata.findUnique({
    where: {
      id,
    },
  });

  invariant(nftMetadata != null);

  if (!nftMetadata.contentType.includes("gif")) {
    res.json({ contentType: nftMetadata.contentType, message: "skipped" });
    return;
  }

  const imageName = nftMetadata.image;
  const fileNameWithoutExtension = imageName.split(".");
  fileNameWithoutExtension.pop();
  const mp4FileName = fileNameWithoutExtension.join(".") + MP4_EXTENSION;

  try {
    // Check Firebase Storage to see if MP4 processing has completed
    await getDownloadURL(ref(getStorage(), mp4FileName));
    // If no error, replace the image file name in the DB
    await prisma.nftMetadata.update({
      data: { contentType: "video/mp4", image: mp4FileName },
      where: { id: nftMetadata.id },
    });
    res.sendStatus(200);
  } catch (e) {
    // We do not convert GIFs < 1 second in length to MP4s.
    res.status(500).json(getErrorPropertiesToLog(e as Error));
  }
}
