/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
import { NextFunction, Request, Response } from "express";
import muxClient from "src/utils/mux/muxClient";
import muxCreateClip from "src/utils/mux/muxCreateClip";
import getPrisma from "src/utils/prisma/getPrisma";
import sleep from "formfn-shared/dist/utils/sleep";
import dayjs from "src/utils/dates/dayjsex";
import logError from "src/utils/analytics/logError";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logEvent from "src/utils/analytics/logEvent";
import muxVideoDimensions from "src/utils/mux/muxVideoDimensions";

const SLEEP_DURATION = dayjs.duration({ seconds: 20 });
const WAIT_DURATION = dayjs.duration({ minutes: 5 });

/**
 * Make sure there is a video associated with the playback idea, and that
 * video is associated with either NftMetadata.videoPlaybackId or NftMetadata.videoPreviewPlaybackId.
 *
 * Otherwise, this webhook could result in infinite loops.
 */
async function waitUntilVideoExists(playbackId: string) {
  const prisma = getPrisma();
  const startTime = dayjs();

  while (dayjs().diff(startTime, "second", true) < WAIT_DURATION.asSeconds()) {
    const video = await prisma.video.findUnique({
      include: {
        NftMetadata_NftMetadata_videoPlaybackIdToVideo: true,
        NftMetadata_NftMetadata_videoPreviewPlaybackIdToVideo: true,
      },
      where: { playbackId },
    });

    if (video == null) {
      await sleep(SLEEP_DURATION);
      continue;
    }

    const nftMetadataFromVideo =
      video.NftMetadata_NftMetadata_videoPlaybackIdToVideo ?? [];
    const nftMetadataFromVideoPreview =
      video.NftMetadata_NftMetadata_videoPreviewPlaybackIdToVideo ?? [];
    if (
      nftMetadataFromVideo.length === 0 &&
      nftMetadataFromVideoPreview.length === 0
    ) {
      await sleep(SLEEP_DURATION);
      continue;
    }

    return true;
  }

  return false;
}

export default async function muxWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { type: eventType, data: eventData } = await req.body;
  const prisma = getPrisma();

  try {
    switch (eventType) {
      case "video.asset.ready": {
        const assetId = eventData.id;
        const asset = await muxClient.Video.Assets.get(assetId);
        const playbackId = asset.playback_ids![0].id;

        const result = await waitUntilVideoExists(playbackId);
        if (!result) {
          logError(
            AnalyticsEvent.MuxWebhookError,
            "Failed while waiting for video",
            req,
            {
              eventData,
              eventType,
              playbackId,
            }
          );
          res.status(500).send();
          return;
        }

        const video = await prisma.video.update({
          data: {
            status: eventData.status,
          },
          include: {
            NftMetadata_NftMetadata_videoPlaybackIdToVideo: true,
            NftMetadata_NftMetadata_videoPreviewPlaybackIdToVideo: true,
          },
          where: {
            playbackId,
          },
        });
        const dimensions = await muxVideoDimensions(playbackId);
        await prisma.nftMetadata.updateMany({
          data: {
            assetHeight: dimensions.height,
            assetWidth: dimensions.width,
          },
          where: {
            videoPlaybackId: playbackId,
          },
        });

        if (
          (video.NftMetadata_NftMetadata_videoPreviewPlaybackIdToVideo ?? [])
            .length === 0
        ) {
          // Create clip
          const previewAsset = await muxCreateClip(assetId);
          const previewPlaybackId = previewAsset.playback_ids![0].id;

          await prisma.video.create({
            data: {
              playbackId: previewPlaybackId,
              status: previewAsset.status,
            },
          });

          await prisma.nftMetadata.updateMany({
            data: {
              videoPreviewPlaybackId: previewPlaybackId,
            },
            where: {
              videoPlaybackId: playbackId,
            },
          });
        }

        break;
      }
      default:
        break;
    }

    logEvent(AnalyticsEvent.MuxWebhookSuccess, req, { eventData, eventType });

    res.status(200).send();
  } catch (e) {
    logError(AnalyticsEvent.MuxWebhookError, e as Error, req, {
      eventData,
      eventType,
    });
    res.status(500).send();
  }
}
