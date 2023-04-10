import { VideoTrack } from "@mux/mux-node";
import muxClient from "src/utils/mux/muxClient";
import muxPlaybackIdToAssetId from "src/utils/mux/muxPlaybackIdToAssetId";

export default async function muxVideoDimensions(playbackId: string) {
  const assetId = await muxPlaybackIdToAssetId(playbackId);
  const asset = await muxClient.Video.Assets.get(assetId);
  const videoTrack = asset.tracks!.find(
    (track) => track.type === "video"
  ) as VideoTrack;
  return { height: videoTrack.max_height, width: videoTrack.max_width };
}
