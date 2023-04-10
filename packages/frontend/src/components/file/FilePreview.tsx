import ModelViewerLazy from "components/model-viewer/ModelViewerLazy";
import Video from "components/videos/Video";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import BackgroundColorClass from "types/enums/BackgroundColorClass";
import MediaType from "types/enums/MediaType";
import joinClasses from "utils/joinClasses";
import styles from "css/file/FilePreview.module.css";
import MediaTypeOrUnknown from "types/MediaTypeOrUnknown";
import { useEffect, useState } from "react";

type Props = {
  fileInfo: Maybe<{
    file: Maybe<File>;
    mediaType: MediaTypeOrUnknown;
    src: string;
  }>;
  height?: number | string;
  width?: number | string;
};

export default function FilePreview({ fileInfo, height, width }: Props) {
  const [htmlText, setHtmlText] = useState("");
  useEffect(() => {
    if (fileInfo?.mediaType === MediaType.TextHtml) {
      const reader = new FileReader();
      reader.onload = function (event) {
        setHtmlText(event.target!.result as string);
      };
      reader.readAsText(fileInfo.file!);
    }
  }, [fileInfo?.file, fileInfo?.mediaType]);

  if (fileInfo == null) {
    return (
      <div
        style={{ height, width }}
        className={joinClasses(styles.image, BackgroundColorClass.LightPurple)}
      />
    );
  }

  const { mediaType, src } = fileInfo;
  switch (mediaType) {
    case MediaType.ImageGif:
    case MediaType.ImageJpg:
    case MediaType.ImageJpeg:
    case MediaType.ImagePng:
      return (
        <img
          className={joinClasses(styles.image, BackgroundColorClass.White)}
          src={src}
          style={{ height, width }}
        />
      );
    case MediaType.ModelGltfBinary:
      return (
        <div
          style={{ height, width }}
          className={joinClasses(styles.image, BackgroundColorClass.White)}
        >
          <ModelViewerLazy src={src} />
        </div>
      );
    case MediaType.TextHtml: {
      return (
        <div
          style={{ height, width }}
          className={joinClasses(styles.image, BackgroundColorClass.White)}
          ref={(ref) => {
            if (ref == null) {
              return;
            }

            if (ref.shadowRoot == null) {
              ref.attachShadow({ mode: "open" });
            }

            // Render inside shadow so styles don't leak out

            // eslint-disable-next-line no-param-reassign
            ref.shadowRoot!.innerHTML = htmlText;
            // eslint-disable-next-line no-param-reassign
            ref.innerHTML = "";
          }}
        />
      );
    }
    case MediaType.VideoMp4:
    case MediaType.VideoQuicktime:
      return (
        <Video
          style={{ height, width }}
          className={joinClasses(styles.image, BackgroundColorClass.White)}
          src={src}
        />
      );
    case "unknown":
      return null;
    default:
      return assertUnreachable(mediaType);
  }
}
