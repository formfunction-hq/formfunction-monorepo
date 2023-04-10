import GenericDropzone from "components/input/GenericDropzone";
import InputLabel from "components/input/InputLabel";
import InputWithLabel from "components/input/InputWithLabel";
import TextArea from "components/input/TextArea";
import TextInput from "components/input/TextInput";
import CreateDisplayFile from "components/pages/create/CreateDisplayFile";
import CreateNftAttributes from "components/pages/create/CreateNftAttributes";
import Body1 from "components/text/Body1";
import styles from "css/nft/GenericNftCreateModalContent.module.css";
import useCreateNftDetailsContext from "hooks/useCreateNftDetailsContext";
import ColorClass from "types/enums/ColorClass";
import isNumber from "formfn-shared/dist/utils/numbers/isNumber";
import ListingInputs from "components/listing/ListingInputs";
import { MAX_DESCRIPTION_LENGTH } from "constants/MaxLengths";
import DEFAULT_ACCEPTED_MEDIA_TYPES from "constants/media-type/DefaultAcceptedMediaTypes";
import Divider from "components/misc/Divider";
import FlexBox from "components/layout/FlexBox";

type Props = {
  additionalInfoBottomSection?: JSX.Element;
  additionalInfoTopSection?: JSX.Element;
  description: JSX.Element | string;
  primaryCta: JSX.Element;
  secondaryCta?: JSX.Element;
};

// Must be used with CreateNftDetailsContext
export default function GenericNftCreateModalContent({
  additionalInfoTopSection,
  additionalInfoBottomSection,
  description: modalDescription,
  primaryCta,
  secondaryCta,
}: Props): JSX.Element {
  const {
    file,
    fileDataUrl,
    setFile,
    description,
    showErrors,
    title,
    royalties,
    setRoyalties,
    setDescription,
    setTitle,
  } = useCreateNftDetailsContext();

  return (
    <div>
      <ListingInputs>
        <div className={styles.subtitle}>
          <Body1 colorClass={ColorClass.Secondary}>{modalDescription}</Body1>
        </div>
        <div className={styles.mediaUpload}>
          <GenericDropzone
            accept={DEFAULT_ACCEPTED_MEDIA_TYPES}
            disableHoverStyle
            onDropAccepted={(files) => {
              if (files.length === 0) {
                return;
              }

              setFile(files[0]);
            }}
          >
            <CreateDisplayFile
              accept={DEFAULT_ACCEPTED_MEDIA_TYPES}
              file={file}
              fileDataUrl={fileDataUrl}
            />
          </GenericDropzone>
        </div>
        {additionalInfoTopSection != null ? additionalInfoTopSection : null}
        <InputWithLabel
          input={
            <TextInput
              hasError={showErrors && title.length === 0}
              value={title}
              maxLength={32}
              onChange={setTitle}
              placeholder="Title of your piece"
            />
          }
          label={<InputLabel label="Title" />}
        />
        <InputWithLabel
          input={
            <TextArea
              value={description}
              maxLength={MAX_DESCRIPTION_LENGTH}
              onChange={setDescription}
              placeholder="(Optional) Add a description about your piece"
              rows={6}
            />
          }
          label={<InputLabel label="Description" />}
        />
        <InputWithLabel
          input={
            <TextInput
              buttonInner={<Body1 colorClass={ColorClass.Primary}>%</Body1>}
              value={royalties}
              onChange={(val) => {
                if (!isNumber(val) || val.includes(".")) {
                  return;
                }

                if (val !== "" && (Number(val) < 0 || Number(val) > 20)) {
                  return;
                }

                setRoyalties(val);
              }}
              placeholder="5"
            />
          }
          label={
            <InputLabel
              label="Royalties"
              subLabel="If someone resells this piece, you'll receive this percentage of the sale. Usually, this is between 5-15%. This number will be shown on this NFT's page."
            />
          }
        />
        <CreateNftAttributes />
      </ListingInputs>
      {additionalInfoBottomSection != null && (
        <FlexBox
          flexDirection="column"
          gap={48}
          marginTop={48}
          marginBottom={12}
        >
          <Divider colorClass={ColorClass.Tertiary} />
          {additionalInfoBottomSection}
        </FlexBox>
      )}
      <div className={styles.buttons}>
        {primaryCta}
        {secondaryCta != null && secondaryCta}
      </div>
    </div>
  );
}
