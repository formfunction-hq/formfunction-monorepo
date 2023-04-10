import InputWithLabel from "components/input/InputWithLabel";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import styles from "css/pages/campaign/edit/funding-tiers/CreateFundingTierModal.module.css";
import { useForm } from "react-hook-form";
import InputLabel from "components/input/InputLabel";
import {
  FUNDING_TIER_DESCRIPTION_SUB_LABEL,
  FUNDING_TIER_BENEFITS_SUB_LABEL,
  FUNDING_TIER_NFT_SUB_LABEL,
} from "constants/InputSubLabels";
import FormTextArea from "components/input/FormTextArea";
import FormTextInput from "components/input/FormTextInput";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import TextAreaWithBulletPoints from "components/input/TextAreaWithBulletPoints";

export type FundingTierFormData = {
  benefits: string;
  description: string;
  tierName: string;
};

type Props = {
  defaultValues?: FundingTierFormData;
  inFlight: boolean;
  onSubmit: (formData: FundingTierFormData) => void;
};

const EMPTY_DEFAULT_FORM_VALUES: FundingTierFormData = {
  benefits: "",
  description: "",
  tierName: "",
};

export default function FundingTierForm({
  onSubmit,
  defaultValues = EMPTY_DEFAULT_FORM_VALUES,
  inFlight,
}: Props) {
  const { register, watch, handleSubmit, setValue } =
    useForm<FundingTierFormData>({
      defaultValues,
      mode: "onTouched",
    });

  const disabled =
    watch("tierName").length === 0 ||
    watch("description").length === 0 ||
    watch("benefits").length === 0;

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit, emptyFunction)}
    >
      <InputWithLabel
        input={
          <FormTextInput
            placeholder="Name of funding tier"
            registerResult={register("tierName")}
            value={watch("tierName")}
          />
        }
        label={<InputLabel label="Tier Name" />}
      />
      <InputWithLabel
        input={
          <FormTextArea
            placeholder="e.g. This tier contains unique 1/1 pieces of each character in the film."
            registerResult={register("description")}
            rows={2}
            value={watch("description")}
          />
        }
        label={
          <InputLabel
            label="Description"
            subLabel={FUNDING_TIER_DESCRIPTION_SUB_LABEL}
          />
        }
      />
      <InputWithLabel
        input={
          <TextAreaWithBulletPoints
            placeholder={`• e.g. You get to name the character you collect\n• Press “enter” after each benefit`}
            registeredFormField={register("benefits")}
            setValue={(value) => {
              setValue("benefits", value);
            }}
            value={watch("benefits")}
          />
        }
        label={
          <InputLabel
            label="Benefits"
            subLabel={FUNDING_TIER_BENEFITS_SUB_LABEL}
          />
        }
      />
      <InputLabel label="NFTs" subLabel={FUNDING_TIER_NFT_SUB_LABEL} />
      <ButtonWithText
        buttonTheme={ButtonTheme.PurpleGradient}
        disabled={disabled}
        fontClass={FontClass.NavLink}
        isLoading={inFlight}
        className={styles.saveButton}
        type="submit"
      >
        Save
      </ButtonWithText>
    </form>
  );
}
