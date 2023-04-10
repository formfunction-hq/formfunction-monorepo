import muxClient from "src/utils/mux/muxClient";

export default async function muxCreateClip(assetId: string) {
  return muxClient.Video.Assets.create({
    input: [
      {
        end_time: 8,
        start_time: 0,
        url: `mux://assets/${assetId}`,
      },
    ],
    playback_policy: "public",
  });
}
