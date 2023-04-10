import { NextFunction, Request, Response } from "express";
import Environment from "formfn-shared/dist/types/Environment";
import getMuxClient from "src/utils/mux/getMuxClient";

export default async function playbackIdToAssetId(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { env, playbackId } = req.query;

  try {
    const muxClient = getMuxClient(env as Environment);
    const playbackIdentifier = await muxClient.Video.PlaybackIds.get(
      playbackId as string
    );
    const assetId = playbackIdentifier.object.id;

    res.json({ assetId });
  } catch (e) {
    res.json({ error: e });
  }
}
