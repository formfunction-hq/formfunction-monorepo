import GenericModal from "components/modal/GenericModal";
import styles from "css/modal/ImageModal.module.css";
import joinClasses from "utils/joinClasses";
import GlobalClass from "types/enums/GlobalClass";
import ColorValue from "types/enums/ColorValue";
import Video from "components/videos/Video";
import { useState } from "react";
import FontClass from "types/enums/FontClass";
import VolumeOffIcon from "components/icons/VolumeOffIcon";
import VolumeOnIcon from "components/icons/VolumeOnIcon";
import MaybeImgix from "components/images/MaybeImgix";
import Imgix from "react-imgix";
import OverlayButton from "components/buttons/OverlayButton";
import LoadingSpinner from "components/loading/LoadingSpinner";
import BackgroundOverlayTheme from "types/enums/BackgroundOverlayTheme";
import OverlayContainer from "components/containers/OverlayContainer";

type Props = {
  isMuted: boolean;
  isShown: boolean;
  isVideo: boolean;
  onHide: () => void;
  setIsMuted: (val: boolean) => void;
  src: string;
};

export default function ImageModal({
  isMuted,
  isShown,
  isVideo,
  onHide,
  setIsMuted,
  src,
}: Props): JSX.Element {
  const [_isLoaded, setIsLoaded] = useState(false);

  const image = (
    <MaybeImgix src={src}>
      <Imgix
        className={styles.image}
        htmlAttributes={{ onLoad: () => setIsLoaded(true) }}
        src={src}
        sizes="(max-width: 1024px) 1000px, (max-width: 1600px) 1600px, 2000px"
      />
      <img
        className={styles.image}
        onLoad={() => setIsLoaded(true)}
        src={src}
      />
    </MaybeImgix>
  );

  const video = (
    <>
      <OverlayContainer className={styles.overlay}>
        {isMuted ? (
          <OverlayButton
            className={FontClass.Body2}
            onClick={() => setIsMuted(false)}
          >
            <VolumeOffIcon colorValue={ColorValue.White} />
          </OverlayButton>
        ) : (
          <OverlayButton
            className={FontClass.Body2}
            onClick={() => setIsMuted(true)}
          >
            <VolumeOnIcon colorValue={ColorValue.White} />
          </OverlayButton>
        )}
      </OverlayContainer>
      <Video
        className={styles.image}
        isMuted={isMuted}
        onLoad={() => setIsLoaded(true)}
        // This causes size issue on Safari, commenting out until fixed
        // playbackId={playbackId}
        // Poster from mux renders bigger than video, so don't show it here
        poster=""
        src={src}
      />
    </>
  );

  return (
    <GenericModal
      backgroundOverlayTheme={BackgroundOverlayTheme.AssetExpansion}
      className={joinClasses(styles.modal, GlobalClass.HideText)}
      hideCloseButton
      isShown={isShown}
      onHide={() => {
        onHide();
      }}
    >
      <div className={styles.container}>
        <LoadingSpinner
          className={styles.loadingSpinner}
          colorValue={ColorValue.White}
        />
        {isVideo ? video : image}
      </div>
    </GenericModal>
  );
}
