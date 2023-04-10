import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import AssetForAssetExpress from "components/assets/AssetForAssetExpress";
import { Link } from "react-router-dom";
import { ActivityNotificationAssetForAssetExpress_AssetExpress$key } from "components/pages/activity/__generated__/ActivityNotificationAssetForAssetExpress_AssetExpress.graphql";

const fragment = graphql`
  fragment ActivityNotificationAssetForAssetExpress_AssetExpress on AssetExpress {
    ...AssetForAssetExpress_AssetExpress
  }
`;

type Props = {
  asset: ActivityNotificationAssetForAssetExpress_AssetExpress$key;
  href?: string;
};

export default function ActivityNotificationAssetForAssetExpress({
  asset,
  href,
}: Props) {
  const assetData = useFragment(fragment, asset);
  const assetComponent = (
    <AssetForAssetExpress
      asset={assetData}
      objectFit="cover"
      height={48}
      width={48}
      borderRadius={8}
    />
  );

  return href != null ? (
    <Link to={href}>{assetComponent}</Link>
  ) : (
    assetComponent
  );
}
