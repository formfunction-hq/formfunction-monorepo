import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import { AssetForNftAsset_NftAsset$key } from "components/assets/__generated__/AssetForNftAsset_NftAsset.graphql";
import { Link } from "react-router-dom";
import AssetForAssetExpress from "components/assets/AssetForAssetExpress";
import getNftLinkRelative from "formfn-shared/dist/utils/links/getNftLinkRelative";
import { AssetProps } from "components/assets/AssetGeneric";

const assetFragment = graphql`
  fragment AssetForNftAsset_NftAsset on NftAsset {
    asset {
      ...AssetForAssetExpress_AssetExpress
      dimensions {
        height
        width
      }
    }
    nftInfo {
      mint
    }
  }
`;

type Props = {
  asset: AssetForNftAsset_NftAsset$key;
} & Omit<AssetProps, "asset">;

export default function AssetForNftAsset(props: Props) {
  const assetData = useFragment(assetFragment, props.asset);
  const { asset, nftInfo } = assetData;

  return (
    <Link
      to={getNftLinkRelative(
        null,
        nftInfo.mint,
        asset.dimensions?.width ?? null,
        asset.dimensions?.height ?? null
      )}
    >
      <AssetForAssetExpress
        {...props}
        asset={assetData.asset}
        border={props.border}
        borderRadius={props.borderRadius}
        objectFit={props.objectFit}
        height={props.height}
        showDropShadow={props.showDropShadow}
        width={props.width}
      />
    </Link>
  );
}
