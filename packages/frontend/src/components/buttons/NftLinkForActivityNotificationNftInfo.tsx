import graphql from "babel-plugin-relay/macro";
import { NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo$key } from "components/buttons/__generated__/NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo.graphql";
import NftLink from "components/buttons/NftLink";
import { useFragment } from "react-relay";

const fragment = graphql`
  fragment NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo on ActivityNotificationNftInfo {
    mint
    name
    nftAsset {
      dimensions {
        height
        width
      }
    }
  }
`;

type Props = {
  nftInfo: NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo$key;
};

export default function NftLinkForActivityNotificationNftInfo({
  nftInfo,
}: Props) {
  const nftInfoData = useFragment(fragment, nftInfo);

  return (
    <NftLink
      assetHeight={nftInfoData.nftAsset.dimensions?.height ?? null}
      assetWidth={nftInfoData.nftAsset.dimensions?.width ?? null}
      mint={nftInfoData.mint}
      name={nftInfoData.name}
    />
  );
}
