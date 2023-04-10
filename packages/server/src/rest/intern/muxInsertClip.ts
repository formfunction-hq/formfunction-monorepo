import { NextFunction, Request, Response } from "express";
import invariant from "tiny-invariant";
import muxCreateClip from "src/utils/mux/muxCreateClip";
import muxPlaybackIdToAssetId from "src/utils/mux/muxPlaybackIdToAssetId";
import getPrisma from "src/utils/prisma/getPrisma";

export default async function muxInsertClip(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { playbackId, secret } = req.body;
  invariant(secret === "banana", "Unexpected error");
  const assetId = await muxPlaybackIdToAssetId(playbackId);
  const asset = await muxCreateClip(assetId);

  if (asset.playback_ids == null || asset.playback_ids.length === 0) {
    res.json({ errorMessage: "No playback ID for clipped video" });
    return;
  }

  const prisma = getPrisma();

  const video = await prisma.video.create({
    data: {
      playbackId: asset.playback_ids[0].id,
      status: asset.status,
    },
  });

  const updated = await prisma.nftMetadata.updateMany({
    data: {
      videoPreviewPlaybackId: video.playbackId,
    },
    where: {
      videoPlaybackId: playbackId,
    },
  });

  res.json({ asset, message: `Updated ${updated.count} rows` });
}
