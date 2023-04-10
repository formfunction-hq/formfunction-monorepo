import { NextFunction, Request, Response } from "express";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import logEvent from "src/utils/analytics/logEvent";
import muxClient from "src/utils/mux/muxClient";
import getPrisma from "src/utils/prisma/getPrisma";

export default async function uploadToMuxWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { body } = req;
  const { old, new: newData } = body.event.data;

  if (!newData.contentType.includes("video")) {
    res.json({ message: "No video" });
    return;
  }

  if (old?.image === newData.image) {
    res.json({ message: "No content change" });
    return;
  }

  const prisma = getPrisma();
  let downloadUrl;
  try {
    const storage = getStorage();
    const fileRef = ref(storage, newData.image);
    downloadUrl = await getDownloadURL(fileRef);
  } catch (e: any) {
    if (newData.image.includes("nft-images/")) {
      // Only log error if file is supposed to be in our storage bucket
      // in which case we don't expect this to fail
      logError(AnalyticsEvent.UploadToMuxWebhookError, e, req, {
        newData,
        old,
      });
      res.json({ error: e, message: "Unexpected error" });
      return;
    }

    res.json({ image: newData.image, message: "Invalid Firebase asset path" });
    return;
  }

  const videoAsset = await muxClient.Video.Assets.create({
    input: downloadUrl,
    playback_policy: "public",
  });

  const videoPlaybackId = videoAsset.playback_ids![0].id;
  await prisma.$transaction([
    prisma.video.create({
      data: {
        playbackId: videoPlaybackId,
        status: videoAsset.status,
      },
    }),
    prisma.nftMetadata.update({
      data: {
        videoPlaybackId,
      },
      where: {
        id: newData.id,
      },
    }),
  ]);
  logEvent(AnalyticsEvent.MuxDebug, req, {
    mint: newData.mint,
    nftMetadataId: newData.id,
    videoPlaybackId,
  });

  res.json({
    success: true,
    videoPlaybackId,
  });
}
