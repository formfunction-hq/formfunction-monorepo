import graphql from "babel-plugin-relay/macro";
import { AssetForAsset_Asset$key } from "components/assets/__generated__/AssetForAsset_Asset.graphql";
import { useFragment } from "react-relay";
import AssetGeneric, { AssetProps } from "components/assets/AssetGeneric";

const assetFragment = graphql`
  fragment AssetForAsset_Asset on Asset {
    contentType
    downloadUrl
    videoPlaybackId
  }
`;

type Props = {
  asset: AssetForAsset_Asset$key;
} & Omit<AssetProps, "asset">;

export default function AssetForAsset(props: Props) {
  const assetData = useFragment(assetFragment, props.asset);
  const { contentType, downloadUrl, videoPlaybackId } = assetData;
  return (
    <AssetGeneric
      {...props}
      asset={{ contentType, downloadUrl, videoPlaybackId }}
    />
  );
}
