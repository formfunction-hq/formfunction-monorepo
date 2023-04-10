import ButtonWithText from "components/buttons/ButtonWithText";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import GenericDropzone from "components/input/GenericDropzone";
import CreateBodyContainer from "components/pages/create/CreateBodyContainer";
import styles from "css/pages/create/CreateMedia.module.css";
import useCreateContext from "hooks/useCreateContext";
import useIsBottomTabsWidth from "hooks/useIsBottomTabsWidth";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorValue from "types/enums/ColorValue";
import CreateStep from "types/enums/CreateStep";
import FontClass from "types/enums/FontClass";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import CreateDisplayFile from "components/pages/create/CreateDisplayFile";
import useCreateNftDetailsContext from "hooks/useCreateNftDetailsContext";
import MediaType from "types/enums/MediaType";
import useFlagsTyped from "hooks/useFlagsTyped";
import FlexBox from "components/layout/FlexBox";
import getFileMediaType from "utils/files/getFileMediaType";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";

const GLB_EXT = ".glb";

const ACCEPTED_MEDIA_TYPES = [
  MediaType.ImageGif,
  MediaType.ImageJpeg,
  MediaType.ImagePng,
  MediaType.TextHtml,
  MediaType.VideoMp4,
  GLB_EXT,
];

const ACCEPTED_PREVIEW_MEDIA_TYPES = [
  MediaType.ImageGif,
  MediaType.ImageJpeg,
  MediaType.ImagePng,
  MediaType.VideoMp4,
];

export default function CreateMedia(): Maybe<JSX.Element> {
  const { enableHtmlMinting } = useFlagsTyped();
  const { step, setNextStep } = useCreateContext();
  const {
    file,
    fileDataUrl,
    fileNonstandard,
    fileNonstandardDataUrl,
    setFile,
    setFileNonstandard,
  } = useCreateNftDetailsContext();
  const isBottomTabsWidth = useIsBottomTabsWidth();
  const acceptedMediaTypes = enableHtmlMinting
    ? ACCEPTED_MEDIA_TYPES
    : ACCEPTED_MEDIA_TYPES.filter(
        (mediaType) => mediaType !== MediaType.TextHtml
      );

  if (step !== CreateStep.Media) {
    return null;
  }

  const primaryDropzone = (
    <GenericDropzone
      accept={acceptedMediaTypes}
      disableHoverStyle
      onDropAccepted={(files) => {
        if (files.length === 0) {
          return;
        }

        const newFile = files[0];
        const newFileMediaType = getFileMediaType(newFile);
        switch (newFileMediaType) {
          case MediaType.ImageGif:
          case MediaType.ImageJpeg:
          case MediaType.ImageJpg:
          case MediaType.ImagePng:
          case MediaType.VideoMp4:
          case MediaType.VideoQuicktime:
          case "unknown":
            setFileNonstandard(null);
            setFile(newFile);
            break;
          case MediaType.ModelGltfBinary:
          case MediaType.TextHtml:
            setFile(null);
            setFileNonstandard(newFile);
            break;
          default:
            assertUnreachable(newFileMediaType);
        }
      }}
    >
      <CreateDisplayFile
        accept={acceptedMediaTypes}
        file={fileNonstandard ?? file}
        fileDataUrl={fileNonstandardDataUrl ?? fileDataUrl}
      />
    </GenericDropzone>
  );

  const previewDropzone =
    fileNonstandard == null ? null : (
      <GenericDropzone
        accept={ACCEPTED_PREVIEW_MEDIA_TYPES}
        disableHoverStyle
        onDropAccepted={(files) => {
          if (files.length === 0) {
            return;
          }

          setFile(files[0]);
        }}
      >
        <CreateDisplayFile
          accept={ACCEPTED_PREVIEW_MEDIA_TYPES}
          description="Please upload a preview to represent your NFT on your profile and Explore."
          file={file}
          fileDataUrl={fileDataUrl}
          title="Upload a preview"
        />
      </GenericDropzone>
    );

  return (
    <CreateBodyContainer nextDisabled={file == null}>
      <FlexBox flexDirection="column" gap={36}>
        {primaryDropzone}
        {previewDropzone}
      </FlexBox>
      <div className={styles.buttons}>
        {!isBottomTabsWidth && (
          <ButtonWithText
            buttonTheme={ButtonTheme.PurpleGradient}
            disabled={file == null}
            fontClass={FontClass.NavLink}
            icon={<ArrowRightIcon colorValue={ColorValue.White} size={20} />}
            onClick={setNextStep}
          >
            Next
          </ButtonWithText>
        )}
      </div>
    </CreateBodyContainer>
  );
}
