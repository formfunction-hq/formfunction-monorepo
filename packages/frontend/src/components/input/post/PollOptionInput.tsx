import PlainButton from "components/buttons/PlainButton";
import CrossIcon from "components/icons/CrossIcon";
import TextInput from "components/input/TextInput";
import FlexBox from "components/layout/FlexBox";
import ColorValue from "types/enums/ColorValue";
import GlobalClass from "types/enums/GlobalClass";

type Props = {
  disableRemoveOption: boolean;
  hasError: boolean;
  onChange: (val: string) => void;
  onClickRemoveOption: () => void;
  option: string;
};

const POLL_OPTION_INPUT_MAX_LENGTH = 50;

export default function PollOptionInput({
  option,
  onChange,
  onClickRemoveOption,
  hasError,
  disableRemoveOption,
}: Props) {
  return (
    <FlexBox gap={8} alignItems="center" justifyContent="center">
      <TextInput
        maxLength={POLL_OPTION_INPUT_MAX_LENGTH}
        value={option}
        hasError={hasError && option.length === 0}
        maxLengthIndicator={false}
        onChange={onChange}
        placeholder="Type in a poll option"
      />
      {/* This is a placeholder for the PlainButton when we remove it from the page */}
      {disableRemoveOption ? (
        <div style={{ width: "24px" }} />
      ) : (
        <PlainButton
          className={GlobalClass.HideText}
          onClick={onClickRemoveOption}
        >
          <CrossIcon colorValue={ColorValue.Secondary} />
        </PlainButton>
      )}
    </FlexBox>
  );
}
