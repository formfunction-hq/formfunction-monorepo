import NftAssetSize from "types/enums/NftAssetSize";
import graphql from "babel-plugin-relay/macro";
import { NftAssetForMetadataAccount_MetadataAccount$key } from "components/images/__generated__/NftAssetForMetadataAccount_MetadataAccount.graphql";
import { useFragment } from "react-relay";
import NftAsset from "components/images/NftAsset";
import useNftLinkForMetadataAccount from "hooks/useNftLinkForMetadataAccount";
import { CSSProperties } from "react";

const fragment = graphql`
  fragment NftAssetForMetadataAccount_MetadataAccount on MetadataAccount {
    contentType
    videoPlaybackId
    videoPreviewPlaybackId

    offchainData {
      image
    }

    ...useNftLinkForMetadataAccount_MetadataAccount
  }
`;

type Props = {
  border?: CSSProperties["border"];
  className?: string;
  metadataAccount: NftAssetForMetadataAccount_MetadataAccount$key;
  noBorderRadius?: boolean;
  showBorder?: boolean;
  size?: NftAssetSize;
};

export default function NftAssetForMetadataAccount({
  border,
  className,
  metadataAccount,
  noBorderRadius,
  showBorder,
  size = NftAssetSize.Size48,
}: Props): JSX.Element {
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const nftLink = useNftLinkForMetadataAccount(metadataAccountData);
  const {
    contentType,
    offchainData: { image: src },
  } = metadataAccountData;

  return (
    <NftAsset
      assetSrc={src}
      border={border}
      className={className}
      contentType={contentType}
      link={nftLink}
      noBorderRadius={noBorderRadius}
      playbackId={
        metadataAccountData.videoPreviewPlaybackId ??
        metadataAccountData.videoPlaybackId ??
        undefined
      }
      showBorder={showBorder}
      size={size}
    />
  );
}
