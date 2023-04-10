import {
  DropEvent,
  ErrorCode,
  FileRejection,
  useDropzone,
} from "react-dropzone";

import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import DropzoneBlankContent from "components/input/DropzoneBlankContent";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import PlusSquareIcon from "components/icons/PlusSquareIcon";
import joinClasses from "utils/joinClasses";
import styles from "css/input/GenericDropzone.module.css";
import { useState } from "react";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import Dimensions from "types/Dimensions";
import getImageDimensions from "utils/getImageDimensions";
import humanFileSize from "utils/humanFileSize";
import { message } from "components/toast/messages";
import BYTES_PER_MEGABYTE from "formfn-shared/dist/constants/BytesPerMegabyte";
import pluralize from "formfn-shared/dist/utils/pluralize";
import NotifyErrorDescription from "types/enums/NotifyErrorDescription";
import MediaTypeOrExtension from "types/MediaTypeOrExtension";
import getHumanReadableMediaTypeOrExtension from "utils/content-types/getHumanReadableMediaTypeOrExtension";

function getAcceptErrorMessage(accept: Array<MediaTypeOrExtension>): string {
  const humanReadableContentTypes = accept.map((mediaType) =>
    getHumanReadableMediaTypeOrExtension(mediaType)
  );

  if (accept.length === 1) {
    return `Invalid file type, only ${humanReadableContentTypes[0]} is allowed`;
  }

  const acceptHumanReadable = `${humanReadableContentTypes
    .slice(0, -1)
    .join(", ")} and ${humanReadableContentTypes.slice(-1)[0]}`;
  return `Invalid file type, only ${acceptHumanReadable} are allowed`;
}

function getOnDropRejectedErrorMessage(
  fileRejections: Array<FileRejection>,
  accept: Array<MediaTypeOrExtension>,
  maxFiles: number,
  maxSize: number
) {
  if (fileRejections.length === 0 || fileRejections[0].errors.length === 0) {
    return NotifyErrorDescription.UnexpectedError;
  }

  const firstRejection = fileRejections[0];
  const firstError = firstRejection.errors[0];
  switch (firstError.code) {
    case ErrorCode.FileInvalidType: {
      return getAcceptErrorMessage(accept);
    }
    case ErrorCode.FileTooLarge:
      return `File is too big, max size is ${humanFileSize(maxSize)}`;
    case ErrorCode.FileTooSmall:
      return "File is too small";
    case ErrorCode.TooManyFiles:
      return `Too many files, you can only upload ${maxFiles} ${pluralize(
        "file",
        maxFiles
      )}`;
    default:
      return NotifyErrorDescription.UnexpectedError;
  }
}

type Props = {
  Component?: (props: {
    acceptedFiles: Array<File>;
    imageDimensions?: MaybeUndef<Dimensions>;
  }) => Maybe<JSX.Element>;
  accept: Array<MediaTypeOrExtension>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  className?: string;
  disableHoverStyle?: boolean;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  maxFiles?: number;
  maxSize?: number;
  onDropAccepted?: <T extends File>(files: Array<T>, event: DropEvent) => void;
  showBlankContentOnHover?: boolean;
};

export default function GenericDropzone({
  Component,
  accept,
  children,
  className,
  disableHoverStyle = false,
  disabled = false,
  maxFiles = 1,
  maxSize = 100 * BYTES_PER_MEGABYTE,
  onDropAccepted = emptyFunction,
  showBlankContentOnHover = false,
}: Props): JSX.Element {
  const [dimensions, setDimensions] = useState<Maybe<Dimensions>>(null);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    // isDragAccept,
    isDragActive,
    // isDragReject,
  } = useDropzone({
    accept,
    disabled,
    maxFiles,
    maxSize,
    onDropAccepted: async (files, event) => {
      onDropAccepted(files, event);

      // TODO: may want to support multiple files
      if (files.length === 1) {
        const dataUri = URL.createObjectURL(files[0]);
        const imageDimensions = await getImageDimensions(dataUri);
        setDimensions(imageDimensions);
      }
    },
    onDropRejected: (fileRejections) => {
      message({
        content: getOnDropRejectedErrorMessage(
          fileRejections,
          accept,
          maxFiles,
          maxSize
        ),
        duration: 5,
        type: "error",
      });
    },
  });

  return (
    <div
      {...getRootProps({
        className: joinClasses(
          styles.dropzone,
          !disableHoverStyle ? styles.dropzoneHover : null,
          isDragActive && !disableHoverStyle ? styles.dragActive : null,
          // TODO: this behavior is broken... waiting for fix.
          // See https://github.com/react-dropzone/react-dropzone/issues/888 for more
          // isDragAccept ? styles.dragAccept : null,
          // isDragReject ? styles.dragReject : null,
          className
        ),
      })}
    >
      <input {...getInputProps()} />
      {Component != null && (
        <Component acceptedFiles={acceptedFiles} imageDimensions={dimensions} />
      )}
      {children}
      <div className={styles.overlayAccept} />
      <div className={styles.overlayReject} />
      {showBlankContentOnHover === true && (
        <div className={styles.blankContent}>
          <DropzoneBlankContent
            colorClass={ColorClass.White}
            icon={<PlusSquareIcon colorValue={ColorValue.Secondary} />}
          />
        </div>
      )}
    </div>
  );
}
