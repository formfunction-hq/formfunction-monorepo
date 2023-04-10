import CustomSelect from "components/select/CustomSelect";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import useFlagsTyped from "hooks/useFlagsTyped";

type Props = {
  defaultValue?: MaybeUndef<string>;
  onChange: (val: string) => void;
};

export default function AuctionDurationSelect({
  defaultValue,
  onChange,
}: Props): JSX.Element {
  const { auctionDurationOptions } = useFlagsTyped();

  return (
    <CustomSelect
      defaultValue={
        defaultValue == null
          ? null
          : {
              label: auctionDurationOptions.find(
                ({ value }) => value === defaultValue
              )!.label,
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
      options={auctionDurationOptions}
      placeholder="Auction duration"
    />
  );
}
