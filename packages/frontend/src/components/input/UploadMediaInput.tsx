import styles from "css/input/UploadMediaInput.module.css";
import GenericDropzone from "components/input/GenericDropzone";
import PlusIcon from "components/icons/PlusIcon";
import ColorValue from "types/enums/ColorValue";
import Body2 from "components/text/Body2";
import ColorClass from "types/enums/ColorClass";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import TinyLabel from "components/text/TinyLabel";
import ArtName from "components/text/ArtName";
import BYTES_PER_MEGABYTE from "formfn-shared/dist/constants/BytesPerMegabyte";
import joinClasses from "utils/joinClasses";
import inputStyles from "css/input/InputStyles.module.css";
import AspectRatioContainer from "components/containers/AspectRatioContainer";
import MediaType from "types/enums/MediaType";
import HUMAN_READABLE_MEDIA_TYPE from "constants/HumanReadableMediaType";
import FilePreview from "components/file/FilePreview";
import getFileMediaType from "utils/files/getFileMediaType";
import MediaTypeOrUnknown from "types/MediaTypeOrUnknown";
import PlainButton from "components/buttons/PlainButton";
import RemoveIcon from "components/icons/RemoveIcon";

const DEFAULT_MAX_SIZE_IN_MEGABYTES = 5;

function parseSupportedFileTypesText(accept: Array<MediaType>): string {
  return accept
    .map((mediaType) => HUMAN_READABLE_MEDIA_TYPE[mediaType])
    .join(", ");
}

function getAssetUrl(
  file: Maybe<File>,
  assetUrl: MaybeUndef<string>
): Maybe<string> {
  return file != null ? URL.createObjectURL(file) : assetUrl ?? null;
}

function getMediaType(
  file: Maybe<File>,
  mediaType: MaybeUndef<MediaType>
): MediaTypeOrUnknown {
  return file != null ? getFileMediaType(file) : mediaType!;
}

type Props = {
  accept?: Array<MediaType>;
  asset?: MaybeUndef<{
    mediaType: MediaType;
    url: string;
  }>;
  file: Maybe<File>;
  hasError?: boolean;
  maxSizeInMegabytes?: number;
  onClickRemoveButton?: () => void;
  setFile: (val: File) => void;
  subtitle?: string;
  title?: string;
};

export default function UploadMediaInput({
  accept = [MediaType.ImageJpeg, MediaType.ImagePng],
  asset,
  file,
  hasError,
  maxSizeInMegabytes,
  onClickRemoveButton,
  setFile,
  subtitle = "Drag and drop your file here, or click to upload. 1270x760px recommended.",
  title = "Upload your media",
}: Props): JSX.Element {
  const assetUrl = getAssetUrl(file, asset?.url);
  const mediaType = getMediaType(file, asset?.mediaType);

  return (
    <GenericDropzone
      accept={accept}
      disableHoverStyle
      disabled={file != null && onClickRemoveButton != null}
      onDropAccepted={(files) => {
        if (files.length === 0) {
          return;
        }
        setFile(files[0]);
      }}
      maxSize={
        (maxSizeInMegabytes ?? DEFAULT_MAX_SIZE_IN_MEGABYTES) *
        BYTES_PER_MEGABYTE
      }
    >
      <div
        className={joinClasses(
          styles.container,
          hasError
            ? inputStyles.textInputError
            : assetUrl != null
            ? null
            : styles.containerBorder
        )}
      >
        {assetUrl == null ? (
          <div className={styles.uploadContainer}>
            <PlusIcon colorValue={ColorValue.Ghost} width={64} height={64} />
            <ArtName colorClass={ColorClass.Primary} className={styles.title}>
              {title}
            </ArtName>
            <Body2
              className={styles.description}
              colorClass={ColorClass.Secondary}
              textAlign="center"
            >
              {subtitle}
            </Body2>
            <TinyLabel
              className={styles.supportedFileType}
              colorClass={ColorClass.Secondary}
            >
              {parseSupportedFileTypesText(accept)}
            </TinyLabel>
          </div>
        ) : (
          <AspectRatioContainer width={32} height={17}>
            <FilePreview
              fileInfo={{
                file,
                mediaType: mediaType!,
                src: assetUrl,
              }}
              height="100%"
              width="100%"
            />
            {onClickRemoveButton != null && (
              <PlainButton
                className={styles.removeIconContainer}
                onClick={onClickRemoveButton}
              >
                <RemoveIcon
                  strokeColorValue={ColorValue.White}
                  fillColorValue={ColorValue.Secondary}
                />
              </PlainButton>
            )}
          </AspectRatioContainer>
        )}
      </div>
    </GenericDropzone>
  );
}
