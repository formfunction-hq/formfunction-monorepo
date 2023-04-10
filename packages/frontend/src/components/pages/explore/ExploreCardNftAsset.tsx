import styles from "css/pages/explore/ExploreCardNftAsset.module.css";
import { Link } from "react-router-dom";
import SquareContainer from "components/containers/SquareContainer";
import Video from "components/videos/Video";
import LoadingShimmer from "components/loading/LoadingShimmer";
import isMobile from "utils/isMobile";
import getNftLinkRelative from "formfn-shared/dist/utils/links/getNftLinkRelative";
import { getLazyLoadConfig } from "hooks/useLazyLoadConfig";
import MaybeWrapWithLazyLoad from "components/containers/MaybeWrapWithLazyLoad";
import graphql from "babel-plugin-relay/macro";
import { ExploreCardNftAsset_MetadataAccount$key } from "components/pages/explore/__generated__/ExploreCardNftAsset_MetadataAccount.graphql";
import { useFragment } from "react-relay";
import { useState } from "react";
import MaybeImgix from "components/images/MaybeImgix";
import Imgix from "react-imgix";
import useFlagsTyped from "hooks/useFlagsTyped";
import useDoesNftHaveDisclosure from "hooks/useDoesNftHaveDisclosure";
import joinClasses from "utils/joinClasses";

const fragment = graphql`
  fragment ExploreCardNftAsset_MetadataAccount on MetadataAccount {
    assetHeight
    assetWidth
    contentType
    mint
    offchainData {
      creatorCardImage: image
    }
    videoPlaybackId
    videoPreviewPlaybackId

    nft {
      ...useDoesNftHaveDisclosure_NftExpress

      Owner {
        username
      }
    }
  }
`;

export default function ExploreCardNftAsset({
  metadataAccount,
}: {
  metadataAccount: ExploreCardNftAsset_MetadataAccount$key;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { lazyLoadConfig } = useFlagsTyped();
  const metadataAccountData = useFragment(fragment, metadataAccount);
  // TODO[@bryancho]: refactor to consolidate blur logic in one place
  const shouldBlurNsfwContent = useDoesNftHaveDisclosure(
    metadataAccountData.nft,
    "Nsfw"
  );
  const imageClassToUse = joinClasses(
    styles.nftImage,
    shouldBlurNsfwContent ? styles.imageBlurred : undefined
  );

  return (
    <Link
      key={metadataAccountData.mint}
      to={getNftLinkRelative(
        metadataAccountData.nft.Owner!.username,
        metadataAccountData.mint,
        metadataAccountData.assetWidth,
        metadataAccountData.assetHeight
      )}
    >
      <SquareContainer containerInnerClassName={styles.squareContainer}>
        {!isLoaded &&
          (metadataAccountData.videoPlaybackId == null || isMobile()) && (
            <LoadingShimmer borderRadius={16} />
          )}
        <MaybeWrapWithLazyLoad
          lazyLoadConfig={getLazyLoadConfig(
            lazyLoadConfig,
            metadataAccountData.contentType
          )}
        >
          {metadataAccountData.contentType.includes("video") ? (
            <Video
              className={imageClassToUse}
              onLoad={() => setIsLoaded(true)}
              playbackId={
                metadataAccountData.videoPreviewPlaybackId ??
                metadataAccountData.videoPlaybackId
              }
              src={metadataAccountData.offchainData.creatorCardImage}
            />
          ) : (
            <MaybeImgix src={metadataAccountData.offchainData.creatorCardImage}>
              <Imgix
                className={imageClassToUse}
                htmlAttributes={{
                  onLoad: () => setIsLoaded(true),
                }}
                src={metadataAccountData.offchainData.creatorCardImage}
                width={300}
              />
              <img
                className={imageClassToUse}
                onLoad={() => setIsLoaded(true)}
                src={metadataAccountData.offchainData.creatorCardImage}
              />
            </MaybeImgix>
          )}
        </MaybeWrapWithLazyLoad>
      </SquareContainer>
    </Link>
  );
}
