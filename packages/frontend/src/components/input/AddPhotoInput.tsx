import styles from "css/input/AddPhotoInput.module.css";
import GenericDropzone from "components/input/GenericDropzone";
import CameraIcon from "components/icons/CameraIcon";
import ColorValue from "types/enums/ColorValue";
import Body2 from "components/text/Body2";
import ColorClass from "types/enums/ColorClass";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import MediaType from "types/enums/MediaType";

const FIVE_MB = 5e6;

type Props = {
  file: Maybe<File>;
  photoUrl: MaybeUndef<string>;
  setFile: (val: File) => void;
};

export default function AddPhotoInput({
  file,
  photoUrl,
  setFile,
}: Props): JSX.Element {
  return (
    <GenericDropzone
      accept={[MediaType.ImageGif, MediaType.ImageJpeg, MediaType.ImagePng]}
      disableHoverStyle
      onDropAccepted={(files) => {
        if (files.length === 0) {
          return;
        }

        setFile(files[0]);
      }}
      maxSize={FIVE_MB}
    >
      <div className={styles.container}>
        {file == null && photoUrl == null && (
          <div className={styles.block}>
            <CameraIcon colorValue={ColorValue.White} />
          </div>
        )}
        {file != null && (
          <img className={styles.photo} src={URL.createObjectURL(file)} />
        )}
        {photoUrl != null && file == null && (
          <img className={styles.photo} src={photoUrl} />
        )}
        <Body2
          className={styles.text}
          colorClass={ColorClass.Secondary}
          textAlign="center"
        >
          {photoUrl == null && file == null ? "Add" : "Change"}
        </Body2>
      </div>
    </GenericDropzone>
  );
}
