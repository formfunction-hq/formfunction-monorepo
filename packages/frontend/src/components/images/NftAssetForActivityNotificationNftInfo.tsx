import NftAssetSize from "types/enums/NftAssetSize";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay";
import NftAsset from "components/images/NftAsset";
import getNftLinkRelative from "formfn-shared/dist/utils/links/getNftLinkRelative";
import { NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo$key } from "components/images/__generated__/NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo.graphql";

const fragment = graphql`
  fragment NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo on ActivityNotificationNftInfo {
    mint

    nftAsset {
      contentType
      dimensions {
        height
        width
      }
      downloadUrl
    }
  }
`;

type Props = {
  className?: string;
  nftInfo: NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo$key;
  noBorderRadius?: boolean;
  size?: NftAssetSize;
};

export default function NftAssetForActivityNotificationNftInfo({
  className,
  nftInfo,
  noBorderRadius,
  size = NftAssetSize.Size48,
}: Props): JSX.Element {
  const nftInfoData = useFragment(fragment, nftInfo);
  return (
    <NftAsset
      assetSrc={nftInfoData.nftAsset.downloadUrl}
      className={className}
      contentType={nftInfoData.nftAsset.contentType}
      link={getNftLinkRelative(
        null,
        nftInfoData.mint,
        nftInfoData.nftAsset.dimensions?.width ?? null,
        nftInfoData.nftAsset.dimensions?.height ?? null
      )}
      noBorderRadius={noBorderRadius}
      size={size}
    />
  );
}
