import styles from "css/pages/campaign/basic-info/CampaignBasicInfoForm.module.css";
import Header2 from "components/text/Header2";
import ColorClass from "types/enums/ColorClass";
import InputLabel from "components/input/InputLabel";
import FormTextInput from "components/input/FormTextInput";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputWithLabel from "components/input/InputWithLabel";
import ColorSchemeInput from "components/pages/campaign/basic-info/ColorSchemeInput";
import FormTextArea from "components/input/FormTextArea";
import ButtonWithText from "components/buttons/ButtonWithText";
import FontClass from "types/enums/FontClass";
import ButtonTheme from "types/enums/ButtonTheme";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  MAX_CAMPAIGN_NAME_LENGTH,
  MAX_CAMPAIGN_TAGLINE_LENGTH,
} from "constants/MaxLengths";
import ErrorMessageMsg from "types/enums/ErrorMessageMsg";
import {
  CATEGORY_SUB_LABEL,
  COLOR_SCHEME_SUB_LABEL,
  EMOJI_INPUT_SUB_LABEL,
} from "constants/InputSubLabels";
import Body2 from "components/text/Body2";
import CampaignCategorySelect from "components/pages/campaign/basic-info/CampaignCategorySelect";
import CampaignGoalInput from "components/pages/campaign/basic-info/CampaignGoalInput";
import CampaignCategoryExpress_enum from "types/relay/CampaignCategoryExpress_enum";
import CampaignColorSchemeExpress_enum from "types/relay/CampaignColorSchemeExpress_enum";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import EmojiInput from "components/pages/campaign/basic-info/EmojiInput";
import UploadMediaInput from "components/input/UploadMediaInput";
import CAMPAIGN_COLOR_SCHEMES from "constants/CampaignColorSchemes";
import UserSearchBar from "components/user/UserSearchBar";
import CurrencyConfig from "types/CurrencyConfig";
import getCampaignLinkRelative from "formfn-shared/dist/utils/links/getCampaignLinkRelative";
import useUserContext from "hooks/useUserContext";
import getDashCasedString from "formfn-shared/dist/utils/string/getDashCasedString";
import { useState } from "react";
import MediaType from "types/enums/MediaType";

export type CampaignBasicInfoFormData = {
  campaignName: string;
  category: Maybe<CampaignCategoryExpress_enum>;
  colorScheme: CampaignColorSchemeExpress_enum;
  emoji: string;
  previewImageFile: Maybe<File>;
  price: string;
  tagline: string;
};

type CampaignBasicInfoFormDataKeys = keyof CampaignBasicInfoFormData;

export const CAMPAIGN_NAME_TAKEN_ERROR_MSG_SUBSTRING =
  "You already have a campaign with the same name";
const DEFAULT_FORM_DATA: CampaignBasicInfoFormData = {
  campaignName: "",
  category: null,
  colorScheme: CAMPAIGN_COLOR_SCHEMES[0],
  emoji: "😁",
  previewImageFile: null,
  price: "",
  tagline: "",
};

type Props = {
  currencyConfig: CurrencyConfig;
  defaultValues?: CampaignBasicInfoFormData;
  errorMessage: Maybe<ErrorMessageMsg>;
  isLoading: boolean;
  onSubmit: (formData: CampaignBasicInfoFormData) => void;
  previewImageUrl: Maybe<string>;
  setCurrecyConfig: (config: Maybe<CurrencyConfig>) => void;
  setErrorMessage: (errorMessage: Maybe<ErrorMessageMsg>) => void;
  submitButtonTextOverride?: string;
};

export default function CampaignBasicInfoForm({
  currencyConfig,
  defaultValues = DEFAULT_FORM_DATA,
  setCurrecyConfig,
  isLoading,
  onSubmit,
  previewImageUrl,
  setErrorMessage,
  errorMessage,
  submitButtonTextOverride,
}: Props) {
  const { user } = useUserContext();
  const [isEmojiPickerShown, setIsEmojiPickerShown] = useState(false);
  const schema = yup.object().shape({
    campaignName: yup.string().required(),
    category: yup.string().required(),
    colorScheme: yup.string().required(),
    emoji: yup.string().required(),
    previewImageFile:
      previewImageUrl != null ? yup.mixed() : yup.mixed().required(),
    price: yup.string().required(),
    tagline: yup.string().required(),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    trigger,
  } = useForm<CampaignBasicInfoFormData>({
    defaultValues,
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const onError = () => {
    if (errors != null) {
      setErrorMessage(ErrorMessageMsg.InvalidInputs);
    } else {
      setErrorMessage(ErrorMessageMsg.UnexpectedError);
    }
  };
  const customSetValue = (
    key: CampaignBasicInfoFormDataKeys,
    value: string | File
  ): void => {
    setValue(key, value);
    trigger(key);
  };
  // We hide the emoji picker whenever it's not in use as it causes
  // slowdowns whenever the form re-renders
  const hideEmojiPicker = () => setIsEmojiPickerShown(false);
  const onSubmitWrapper = (formData: CampaignBasicInfoFormData) => {
    setErrorMessage(null);
    onSubmit(formData);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmitWrapper, onError)}
      onChange={(val) => {
        // @ts-ignore
        if (val.target.className === "epr-search") {
          // Without this early return, the emoji search will not work
          return;
        }

        hideEmojiPicker();
      }}
    >
      <div>
        <Header2 colorClass={ColorClass.Primary} textAlign="center">
          Basic Info
        </Header2>
        <Body2
          className={styles.subtitle}
          colorClass={ColorClass.Secondary}
          textAlign="center"
        >
          Add the basics about your campaign. You&apos;ll be able to change this
          information before submitting for review.
        </Body2>
      </div>
      <InputWithLabel
        input={
          <>
            <FormTextInput
              maxLength={MAX_CAMPAIGN_NAME_LENGTH}
              hasError={
                errors.campaignName != null ||
                errorMessage === ErrorMessageMsg.CampaignNameTaken
              }
              placeholder="Title of your piece"
              registerResult={register("campaignName")}
              value={watch("campaignName")}
            />
            <Body2
              colorClass={ColorClass.Primary}
            >{`The URL for this campaign will be: formfunction.xyz${getCampaignLinkRelative(
              user!.username,
              getDashCasedString(watch("campaignName"))
            )}`}</Body2>
          </>
        }
        label={<InputLabel label="Campaign name" />}
      />
      <InputWithLabel
        input={
          <FormTextArea
            maxLength={MAX_CAMPAIGN_TAGLINE_LENGTH}
            hasError={errors.tagline != null}
            placeholder="A short description of what your campaign is about"
            registerResult={register("tagline")}
            rows={2}
            value={watch("tagline")}
          />
        }
        label={<InputLabel label="Tagline" />}
      />
      <InputWithLabel
        label={<InputLabel label="Category" subLabel={CATEGORY_SUB_LABEL} />}
        input={
          <CampaignCategorySelect
            defaultValue={defaultValues.category}
            onChange={(category) => customSetValue("category", category)}
            hasError={errors.category != null}
          />
        }
      />
      <CampaignGoalInput
        currencyConfig={currencyConfig}
        setCurrencyConfig={setCurrecyConfig}
        hasError={errors.price != null}
        price={watch("price")}
        setPrice={(price: string) => customSetValue("price", price)}
      />
      <ColorSchemeInput
        selectedColorScheme={watch("colorScheme")}
        onClickColorScheme={(colorScheme: CampaignColorSchemeExpress_enum) => {
          customSetValue("colorScheme", colorScheme);
          hideEmojiPicker();
        }}
        subLabel={COLOR_SCHEME_SUB_LABEL}
      />
      <InputWithLabel
        label={
          <InputLabel label="Campaign Emoji" subLabel={EMOJI_INPUT_SUB_LABEL} />
        }
        input={
          <EmojiInput
            emoji={watch("emoji")}
            hasError={errors.emoji != null}
            isPickerShown={isEmojiPickerShown}
            onEmojiClick={() => setIsEmojiPickerShown((val) => !val)}
            onSetEmoji={(emoji: string) => {
              customSetValue("emoji", emoji);
              hideEmojiPicker();
            }}
          />
        }
      />
      <InputWithLabel
        label={
          <InputLabel
            label="Preview image"
            subLabel="This image will represent your campaign on the Explore page and in social previews."
          />
        }
        input={
          <div className={styles.previewImageInput}>
            <UploadMediaInput
              file={watch("previewImageFile")}
              hasError={errors.previewImageFile != null}
              asset={
                previewImageUrl == null
                  ? null
                  : {
                      // Technically not always correct, but we don't care about the exact
                      // media type in this scenario, we just care that it is an image.
                      mediaType: MediaType.ImageJpeg,
                      url: previewImageUrl,
                    }
              }
              setFile={(file: File) => {
                customSetValue("previewImageFile", file);
              }}
            />
          </div>
        }
      />
      <InputWithLabel
        input={
          <UserSearchBar
            allowNonUserAddresses={false}
            placeholder="Search for a team member"
            popoverPlacement="topLeft"
          />
        }
        label={
          <InputLabel
            label="Team Members"
            subLabel={
              "Team members will be listed on the campaign page, " +
              "and they will be able to post campaign updates. " +
              "However, they will not be added as collaborators to " +
              "pieces in the campaign, and they will not be able to " +
              "edit the campaign."
            }
          />
        }
      />
      <ButtonWithText
        buttonTheme={ButtonTheme.PurpleGradient}
        className={styles.saveButton}
        fontClass={FontClass.NavLink}
        isLoading={isLoading}
        type="submit"
      >
        {submitButtonTextOverride ?? "Set up your campaign page"}
      </ButtonWithText>
    </form>
  );
}
