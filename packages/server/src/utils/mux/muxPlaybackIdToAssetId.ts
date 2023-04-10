import muxClient from "src/utils/mux/muxClient";

export default async function muxPlaybackIdToAssetId(playbackId: string) {
  const playbackIdentifier = await muxClient.Video.PlaybackIds.get(playbackId);
  return playbackIdentifier.object.id;
}
