import { NextFunction, Request, Response } from "express";
import muxCreateClip from "src/utils/mux/muxCreateClip";
import muxPlaybackIdToAssetId from "src/utils/mux/muxPlaybackIdToAssetId";

export default async function muxCreateClipEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { playbackId } = req.body;
  const assetId = await muxPlaybackIdToAssetId(playbackId);
  const asset = await muxCreateClip(assetId);

  res.json({ asset });
}
