import ArtName from "components/text/ArtName";
import Body2 from "components/text/Body2";
import TinyLabel from "components/text/TinyLabel";
import styles from "css/pages/create/CreateDisplayFile.module.css";
import ColorClass from "types/enums/ColorClass";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import MediaTypeOrExtension from "types/MediaTypeOrExtension";
import getHumanReadableMediaTypeOrExtension from "utils/content-types/getHumanReadableMediaTypeOrExtension";
import FilePreview from "components/file/FilePreview";
import getFileMediaType from "utils/files/getFileMediaType";

type Props = {
  accept: Array<MediaTypeOrExtension>;
  description?: string;
  file: Maybe<File>;
  fileDataUrl: Maybe<string>;
  title?: string;
};

export default function CreateDisplayFile({
  accept,
  description = "Drag and drop your file here, or click to upload.",
  file,
  fileDataUrl,
  title = "Upload your media",
}: Props): JSX.Element {
  const humanReadableAccept = accept
    .map((mediaType) => getHumanReadableMediaTypeOrExtension(mediaType))
    .join(", ")
    .toUpperCase();
  return (
    <div className={styles.container}>
      <FilePreview
        fileInfo={
          fileDataUrl == null || file == null
            ? null
            : {
                file,
                mediaType: getFileMediaType(file),
                src: fileDataUrl,
              }
        }
      />
      <ArtName
        className={styles.title}
        colorClass={ColorClass.Primary}
        textAlign="center"
      >
        {title}
      </ArtName>
      <Body2
        className={styles.description}
        colorClass={ColorClass.Secondary}
        textAlign="center"
      >
        {description}
      </Body2>
      <TinyLabel
        className={styles.fileTypes}
        colorClass={ColorClass.Secondary}
        textAlign="center"
        textTransform="uppercase"
      >
        {humanReadableAccept}
      </TinyLabel>
    </div>
  );
}
