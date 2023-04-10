import CustomSelect from "components/select/CustomSelect";
import UNLOCKABLE_CATEGORY_OPTIONS from "constants/UnlockableCategoryOptions";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { UnlockableCategoryOption } from "types/UnlockableCategoryOption";
import { UnlockableCategoryType } from "types/UnlockableCategoryType";

function getOptionFromCategory(
  category: UnlockableCategoryType
): UnlockableCategoryOption {
  return UNLOCKABLE_CATEGORY_OPTIONS.find(({ value }) => value === category)!;
}

type Props = {
  defaultValue?: UnlockableCategoryType;
  hasError?: boolean;
  onChange: (val: UnlockableCategoryType) => void;
  value: Maybe<UnlockableCategoryType>;
};

export default function UnlockableCategorySelect({
  defaultValue,
  hasError,
  onChange,
  value,
}: Props): JSX.Element {
  return (
    <CustomSelect
      defaultValue={
        defaultValue == null ? null : getOptionFromCategory(defaultValue)
      }
      hasError={hasError}
      onChange={(selectedOption) => {
        const { value: selectedValue } =
          selectedOption as UnlockableCategoryOption;
        onChange(selectedValue);
      }}
      options={UNLOCKABLE_CATEGORY_OPTIONS}
      placeholder="Select unlockable type"
      value={value == null ? undefined : getOptionFromCategory(value)}
    />
  );
}
