import CustomSelect from "components/select/CustomSelect";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";

const OPTIONS: Array<{ label: string; value: string }> = [
  { label: "1 minute", value: "1" },
  { label: "5 minutes", value: "5" },
  { label: "10 minutes", value: "10" },
];

type Props = {
  defaultValue?: MaybeUndef<string>;
  onChange: (val: string) => void;
};

export default function TimeExtensionDurationSelect({
  defaultValue,
  onChange,
}: Props): JSX.Element {
  return (
    <CustomSelect
      defaultValue={
        defaultValue == null
          ? null
          : {
              label: OPTIONS.find(({ value }) => value === defaultValue)!.label,
              value: defaultValue,
            }
      }
      onChange={(selectedOption) => {
        const { value } = selectedOption as {
          label: string;
          value: string;
        };
        onChange(value);
      }}
      options={OPTIONS}
      placeholder="Ending period"
    />
  );
}
