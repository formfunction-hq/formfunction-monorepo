import graphql from "babel-plugin-relay/macro";
import { AssetForAssetExpress_AssetExpress$key } from "components/assets/__generated__/AssetForAssetExpress_AssetExpress.graphql";
import { useFragment } from "react-relay";
import AssetGeneric, { AssetProps } from "components/assets/AssetGeneric";
import useColorModeContext from "hooks/useColorModeContext";

const assetFragment = graphql`
  fragment AssetForAssetExpress_AssetExpress on AssetExpress {
    contentType
    downloadUrl

    darkModeInfo {
      downloadUrl
    }

    videoPlaybackId
  }
`;

type Props = {
  asset: AssetForAssetExpress_AssetExpress$key;
} & Omit<AssetProps, "asset">;

export default function AssetForAssetExpress(props: Props) {
  const { isDarkMode } = useColorModeContext();
  const assetData = useFragment(assetFragment, props.asset);
  const {
    contentType,
    darkModeInfo,
    downloadUrl: downloadUrlDefault,
    videoPlaybackId,
  } = assetData;
  const downloadUrl = isDarkMode
    ? darkModeInfo?.downloadUrl ?? downloadUrlDefault
    : downloadUrlDefault;
  return (
    <AssetGeneric
      {...props}
      asset={{
        contentType,
        downloadUrl: decodeURIComponent(downloadUrl),
        videoPlaybackId,
      }}
    />
  );
}
