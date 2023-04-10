import OverlayButton from "components/buttons/OverlayButton";
import OverlayContainer from "components/containers/OverlayContainer";
import SearchIcon from "components/icons/SearchIcon";
import MaybeImgix from "components/images/MaybeImgix";
import Video from "components/videos/Video";
import { CSSProperties, useEffect, useState } from "react";
import Imgix from "react-imgix";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import styles from "css/assets/AssetGeneric.module.css";
import ImageModal from "components/modal/ImageModal";
import VolumeOffIcon from "components/icons/VolumeOffIcon";
import VolumeOnIcon from "components/icons/VolumeOnIcon";
import joinClasses from "utils/joinClasses";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import MediaType from "types/enums/MediaType";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import stringToMediaType from "utils/content-types/stringToMediaType";
import ModelViewerLazy from "components/model-viewer/ModelViewerLazy";
import isNumber from "formfn-shared/dist/utils/numbers/isNumber";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import KeyboardEventKey from "types/enums/KeyboardEventKey";

function getImgixWidth(imgixWidth: MaybeUndef<number>, width: string | number) {
  if (imgixWidth != null) {
    return imgixWidth;
  }

  if (typeof width === "number" && !Number.isNaN(width)) {
    return width;
  }

  if (width === "100%" || width === "auto" || !isNumber(width, parseFloat)) {
    // If width is "100%", "auto", or just cannot be parsed as a float we will
    // use a safe default of 1000 (since 100% can cause performance issues).
    return 1000;
  }

  return parseFloat(width as string) * 2;
}

function Asset({
  contentType,
  controls,
  focusOnIframe,
  isMuted,
  isImageModalShown,
  videoPlaybackId,
  downloadUrl,
  assetStyle,
  showShimmer,
  imgixWidth,
  width,
}: {
  assetStyle: CSSProperties;
  contentType: string;
  controls?: boolean;
  downloadUrl: string;
  focusOnIframe: boolean;
  imgixWidth: MaybeUndef<number>;
  isImageModalShown: boolean;
  isMuted: boolean;
  showShimmer: boolean;
  videoPlaybackId: MaybeUndef<string>;
  width: string | number;
}) {
  const mediaType = stringToMediaType(contentType);
  useEffect(() => {
    if (!focusOnIframe || mediaType !== MediaType.TextHtml) {
      return emptyFunction;
    }

    const frame = document.getElementById(
      downloadUrl
    ) as Maybe<HTMLIFrameElement>;
    const contentWindow = frame?.contentWindow;
    if (contentWindow == null) {
      return emptyFunction;
    }

    // For some reason, if we don't call this inside setTimeout,
    // the first keyboard event will not register
    setTimeout(() => contentWindow!.focus(), 100);

    const eventListener = (e: KeyboardEvent) => {
      // TODO[@arcticmatt]: make this more robust, only intended to work for zen0m's nft right now
      if (
        [
          KeyboardEventKey.ArrowDown,
          KeyboardEventKey.ArrowLeft,
          KeyboardEventKey.ArrowRight,
          KeyboardEventKey.ArrowUp,
        ].includes(e.key as KeyboardEventKey)
      ) {
        // For some reason, if we don't refocus here, keyboard events are not captured
        // by the iframe
        contentWindow.focus();
        e.preventDefault();
        e.stopPropagation();
      }
    };
    document.addEventListener("keydown", eventListener);

    return () => document.removeEventListener("keydown", eventListener);
  }, [downloadUrl, focusOnIframe, mediaType]);

  switch (mediaType) {
    case MediaType.ImageGif:
    case MediaType.ImageJpg:
    case MediaType.ImageJpeg:
    case MediaType.ImagePng:
      return (
        <MaybeImgix showShimmer={showShimmer} src={downloadUrl}>
          <Imgix
            disableSrcSet
            src={downloadUrl}
            htmlAttributes={{ style: assetStyle }}
            width={getImgixWidth(imgixWidth, width)}
          />
          <img src={downloadUrl} style={assetStyle} />
        </MaybeImgix>
      );
    case MediaType.ModelGltfBinary:
      return (
        <div style={assetStyle}>
          <ModelViewerLazy src={downloadUrl} />
        </div>
      );
    case MediaType.TextHtml:
      return (
        <div style={assetStyle}>
          <iframe
            id={downloadUrl}
            height={assetStyle.height}
            src={downloadUrl}
            title="HTML file"
            width={assetStyle.width}
          />
        </div>
      );
    case MediaType.VideoMp4:
    case MediaType.VideoQuicktime:
      return (
        <Video
          controls={controls}
          isMuted={isMuted || isImageModalShown}
          playbackId={videoPlaybackId}
          showShimmer
          src={downloadUrl}
          style={assetStyle}
        />
      );
    case "unknown":
      return null;
    default:
      return assertUnreachable(mediaType);
  }
}

export type ExtraAssetProps = {
  border?: CSSProperties["border"];
  borderRadius?: CSSProperties["borderRadius"];
  boxSizing?: CSSProperties["boxSizing"];
  className?: string;
  controls?: boolean;
  focusOnIframe?: boolean;
  height: number | string;
  imgixWidth?: number;
  objectFit: CSSProperties["objectFit"];
  showDropShadow?: boolean;
  showOverlay?: boolean;
  showShimmer?: boolean;
  width: number | string;
};
export type AssetProps = {
  asset: {
    contentType: string;
    downloadUrl: string;
    videoPlaybackId: MaybeUndef<string>;
  };
} & ExtraAssetProps;

export default function AssetGeneric({
  asset,
  border,
  borderRadius = 0,
  boxSizing,
  className,
  controls,
  focusOnIframe = false,
  height,
  imgixWidth,
  objectFit,
  showDropShadow = false,
  showOverlay = false,
  showShimmer = true,
  width,
}: AssetProps) {
  const { contentType, downloadUrl, videoPlaybackId } = asset;
  const style = {
    borderRadius,
    height,
    objectFit,
    // Needed so border-radius cuts off extra content
    overflow: "hidden",
    width,
  };
  const [isImageModalShown, setIsImageModalShown] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const isVideo = contentType.includes("video");

  // We only want to apply some styles once (like border).
  const assetStyle = { border, boxSizing, ...style };

  return (
    <>
      <ImageModal
        isMuted={isMuted}
        isShown={isImageModalShown}
        isVideo={isVideo}
        onHide={() => setIsImageModalShown(false)}
        setIsMuted={setIsMuted}
        src={downloadUrl}
      />
      <div
        className={joinClasses(
          styles.container,
          className,
          showDropShadow === true ? styles.dropShadow : undefined
        )}
        style={style}
      >
        <Asset
          assetStyle={assetStyle}
          contentType={contentType}
          controls={controls}
          downloadUrl={downloadUrl}
          focusOnIframe={focusOnIframe}
          imgixWidth={imgixWidth}
          isImageModalShown={isImageModalShown}
          isMuted={isMuted}
          showShimmer={showShimmer}
          videoPlaybackId={videoPlaybackId}
          width={width}
        />
        {showOverlay &&
          (!contentType.includes("video") || controls !== true) && (
            <OverlayContainer
              justifyContent="flex-end"
              className={styles.overlay}
            >
              {isVideo && (
                <OverlayButton onClick={() => setIsMuted((val) => !val)}>
                  {isMuted ? (
                    <VolumeOffIcon colorValue={ColorValue.White} />
                  ) : (
                    <VolumeOnIcon colorValue={ColorValue.White} />
                  )}
                </OverlayButton>
              )}
              <OverlayButton
                className={FontClass.Body2}
                onClick={() => setIsImageModalShown(true)}
              >
                <SearchIcon colorValue={ColorValue.White} size={24} />
                Expand
              </OverlayButton>
            </OverlayContainer>
          )}
      </div>
    </>
  );
}
