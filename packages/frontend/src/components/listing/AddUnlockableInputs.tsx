import styles from "css/listing/AddUnlockableInputs.module.css";
import TextArea from "components/input/TextArea";
import GenericDropzone from "components/input/GenericDropzone";
import InputLabel from "components/input/InputLabel";
import InputWithLabel from "components/input/InputWithLabel";
import TextInput from "components/input/TextInput";
import CreateDisplayFile from "components/pages/create/CreateDisplayFile";
import useCreateUnlockableContext from "hooks/useCreateUnlockableContext";
import ColorClass from "types/enums/ColorClass";
import Body1 from "components/text/Body1";
import { notify } from "components/toast/notifications";
import { MAX_DESCRIPTION_LENGTH } from "constants/MaxLengths";
import UnlockableCategorySelect from "components/select/UnlockableCategorySelect";
import ListingUnlockablesEnableActivationPriceToggle from "components/listing/ListingUnlockablesEnableActivationPriceToggle";
import ListingInputs from "components/listing/ListingInputs";
import PriceInput from "components/input/PriceInput";
import useListingContext from "hooks/useListingContext";
import DEFAULT_ACCEPTED_MEDIA_TYPES from "constants/media-type/DefaultAcceptedMediaTypes";

type Props = {
  includeActivationPrice?: boolean;
};

export default function AddUnlockableInputs({
  includeActivationPrice = false,
}: Props): JSX.Element {
  const {
    activationPrice,
    category,
    description,
    enableActivationPrice,
    file,
    fileDataUrl,
    setActivationPrice,
    setCategory,
    setDescription,
    setFile,
    setTitle,
    showErrors,
    title,
  } = useCreateUnlockableContext();
  const { currencyConfig } = useListingContext();

  return (
    <ListingInputs>
      <div className={styles.subtitle}>
        <Body1 colorClass={ColorClass.Secondary}>
          If you&apos;re planning to send something &quot;extra&quot; to the
          buyer (e.g. a physical print, a digital wallpaper), you can display it
          on the NFT page as an unlockable.
        </Body1>
        <Body1 colorClass={ColorClass.Secondary}>
          The buyer will be prompted to share their email with you after the
          sale so you can coordinate sending them the unlockable.
        </Body1>
      </div>
      <div className={styles.mediaUpload}>
        <GenericDropzone
          accept={DEFAULT_ACCEPTED_MEDIA_TYPES}
          disableHoverStyle
          onDropAccepted={(files) => {
            if (files.length === 0) {
              return;
            }

            if (files.length !== 1) {
              notify({
                description:
                  "Please provide only 1 file to represent the unlockable.",
                type: "info",
              });
              return;
            }

            setFile(files[0]);
          }}
        >
          <CreateDisplayFile
            accept={DEFAULT_ACCEPTED_MEDIA_TYPES}
            file={file}
            fileDataUrl={fileDataUrl}
            title="Upload unlockable preview"
          />
        </GenericDropzone>
      </div>
      <InputWithLabel
        input={
          <TextInput
            hasError={showErrors && title.length === 0}
            value={title}
            maxLength={32}
            onChange={setTitle}
            placeholder="e.g. Physical print of this NFT"
          />
        }
        label={<InputLabel label="Unlockable name" />}
      />
      <InputWithLabel
        input={
          <TextArea
            value={description}
            maxLength={MAX_DESCRIPTION_LENGTH}
            onChange={setDescription}
            placeholder="Add more details about the unlockable"
            rows={6}
          />
        }
        label={<InputLabel label="Details" />}
      />
      <InputWithLabel
        input={
          <UnlockableCategorySelect onChange={setCategory} value={category} />
        }
        label={
          <InputLabel
            label="Category"
            subLabel="Select the type of unlockable this will be."
          />
        }
      />
      {includeActivationPrice && (
        <InputWithLabel
          hideInput={!enableActivationPrice}
          input={
            <PriceInput
              currencyConfig={currencyConfig}
              placeholder="Enter activation price"
              price={activationPrice}
              setPrice={setActivationPrice}
              showCurrencySymbol
            />
          }
          label={<ListingUnlockablesEnableActivationPriceToggle />}
        />
      )}
    </ListingInputs>
  );
}
