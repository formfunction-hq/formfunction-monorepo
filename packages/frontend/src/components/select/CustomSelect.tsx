import ChevronDownIcon from "components/icons/ChevronDownIcon";
import getSelectCustomStyles from "components/select/getSelectCustomStyles";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import Select, {
  ActionMeta,
  MenuPlacement,
  SingleValue,
  StylesConfig,
} from "react-select";
import ColorValue from "types/enums/ColorValue";

function CustomDropdownIndicator() {
  return (
    <div style={{ height: 24, paddingRight: 8 }}>
      <ChevronDownIcon colorValue={ColorValue.Primary} size={24} />
    </div>
  );
}

type Option = { label: string; value: string };

type Props = {
  customStyles?: StylesConfig<{ label: string; value: string }, false>;
  defaultValue?: MaybeUndef<Option>;
  hasError?: boolean;
  height?: number;
  isDisabled?: boolean;
  menuPlacement?: MenuPlacement;
  onChange: (value: SingleValue<Option>, action: ActionMeta<Option>) => void;
  options: Array<Option>;
  placeholder: string;
  showCursor?: boolean;
  value?: Maybe<Option>;
};

/**
 * A react-select component with custom styling.
 */
export default function CustomSelect({
  customStyles,
  defaultValue,
  hasError = false,
  height,
  isDisabled = false,
  menuPlacement = "auto",
  onChange,
  options,
  placeholder,
  value,
  showCursor,
}: Props): JSX.Element {
  return (
    <div>
      <Select
        components={{
          DropdownIndicator: CustomDropdownIndicator,
          IndicatorSeparator: () => null,
        }}
        defaultValue={defaultValue}
        isDisabled={isDisabled}
        menuPlacement={menuPlacement}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        styles={{
          ...getSelectCustomStyles({
            hasError,
            height: height ?? 52,
            showCursor,
          }),
          ...customStyles,
        }}
        value={value}
      />
    </div>
  );
}
