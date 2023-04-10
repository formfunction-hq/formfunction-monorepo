import graphql from "babel-plugin-relay/macro";
import OverlayButton from "components/buttons/OverlayButton";
import SearchIcon from "components/icons/SearchIcon";
import ImageModal from "components/modal/ImageModal";
import {
  SubmissionCardAssets_ArtistSubmission$data,
  SubmissionCardAssets_ArtistSubmission$key,
} from "components/pages/vote/__generated__/SubmissionCardAssets_ArtistSubmission.graphql";
import Video from "components/videos/Video";
import styles from "css/pages/vote/SubmissionCardAssets.module.css";
import { useState } from "react";
import { useFragment } from "react-relay";
import ColorValue from "types/enums/ColorValue";
import joinClasses from "utils/joinClasses";
import GlobalClass from "types/enums/GlobalClass";
import getImgixUrl from "utils/getImgixUrl";
import Imgix from "react-imgix";
import VolumeOnIcon from "components/icons/VolumeOnIcon";
import CameraIcon from "components/icons/CameraIcon";
import OverlayContainer from "components/containers/OverlayContainer";
import VolumeOffIcon from "components/icons/VolumeOffIcon";

const fragment = graphql`
  fragment SubmissionCardAssets_ArtistSubmission on ArtistSubmission {
    id

    Assets {
      id
      contentType
      downloadUrl
      path
    }
  }
`;

type Props = {
  artistSubmission: SubmissionCardAssets_ArtistSubmission$key;
  showReverseImageSearchIcon: boolean;
};

function SingleAsset({
  asset,
  showReverseImageSearchIcon,
}: {
  asset: SubmissionCardAssets_ArtistSubmission$data["Assets"][0];
  showReverseImageSearchIcon: boolean;
}) {
  const [isImageModalShown, setIsImageModalShown] = useState(false);
  const isVideo = asset.contentType.includes("video");
  const isGif = asset.contentType.includes("gif");
  const imageSrc = getImgixUrl(asset.path);
  const [isMuted, setIsMuted] = useState(true);
  const shouldShowReverseImageSearchIcon =
    showReverseImageSearchIcon && !isVideo;

  return (
    <>
      <ImageModal
        isMuted={isMuted}
        isShown={isImageModalShown}
        isVideo={isVideo}
        onHide={() => setIsImageModalShown(false)}
        setIsMuted={setIsMuted}
        src={asset.downloadUrl}
      />
      <div className={joinClasses(styles.assetContainer, GlobalClass.HideText)}>
        <OverlayContainer alignItems="flex-end" className={styles.imageOverlay}>
          {isVideo && (
            <OverlayButton onClick={() => setIsMuted((val) => !val)}>
              {isMuted ? (
                <VolumeOffIcon colorValue={ColorValue.White} />
              ) : (
                <VolumeOnIcon colorValue={ColorValue.White} />
              )}
            </OverlayButton>
          )}
          <OverlayButton onClick={() => setIsImageModalShown(true)}>
            <SearchIcon colorValue={ColorValue.White} size={24} />
          </OverlayButton>
          {
            // Google search by image API supports images/GIFs but not videos
            shouldShowReverseImageSearchIcon && (
              <OverlayButton
                type="link_external"
                href={`https://www.google.com/searchbyimage?image_url=${getImgixUrl(
                  asset.path,
                  { raw: true }
                )}`}
              >
                <CameraIcon colorValue={ColorValue.White} />
              </OverlayButton>
            )
          }
        </OverlayContainer>
        {isVideo && (
          <Video
            key={asset.id}
            className={styles.asset}
            isMuted={isMuted || isImageModalShown}
            src={asset.downloadUrl}
          />
        )}
        {isGif && (
          <img
            key={asset.id}
            className={styles.asset}
            src={asset.downloadUrl}
          />
        )}
        {!isVideo && !isGif && (
          <Imgix
            key={imageSrc}
            className={styles.asset}
            src={imageSrc}
            sizes="25vw"
          />
        )}
      </div>
    </>
  );
}

export default function SubmissionCardAssets({
  artistSubmission,
  showReverseImageSearchIcon,
}: Props) {
  const artistSubmissionData = useFragment(fragment, artistSubmission);

  return (
    <div className={styles.assets}>
      {artistSubmissionData.Assets.map((asset) => (
        <SingleAsset
          key={asset.id}
          asset={asset}
          showReverseImageSearchIcon={showReverseImageSearchIcon}
        />
      ))}
    </div>
  );
}
