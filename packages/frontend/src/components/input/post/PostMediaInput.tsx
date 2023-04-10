import InputLabel from "components/input/InputLabel";
import InputWithLabel from "components/input/InputWithLabel";
import UploadMediaInput from "components/input/UploadMediaInput";
import MediaType from "types/enums/MediaType";
import { Dispatch, SetStateAction } from "react";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

type Props = {
  assetFile: Maybe<File>;
  setAssetFile: Dispatch<SetStateAction<Maybe<File>>>;
};

export default function PostMediaInput({ assetFile, setAssetFile }: Props) {
  return (
    <InputWithLabel
      input={
        <UploadMediaInput
          accept={[MediaType.ImageJpeg, MediaType.ImagePng, MediaType.VideoMp4]}
          asset={null}
          file={assetFile}
          maxSizeInMegabytes={100}
          onClickRemoveButton={() => setAssetFile(null)}
          setFile={setAssetFile}
          subtitle="Drag and drop your file here, or click to upload."
        />
      }
      label={<InputLabel label="Media (optional)" />}
    />
  );
}
