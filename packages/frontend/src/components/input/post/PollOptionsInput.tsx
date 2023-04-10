import InputLabel from "components/input/InputLabel";
import InputWithLabel from "components/input/InputWithLabel";
import { Dispatch, SetStateAction } from "react";
import TextInput from "components/input/TextInput";
import PlainButton from "components/buttons/PlainButton";
import TextButton from "components/buttons/TextButton";
import PlusIcon from "components/icons/PlusIcon";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import GlobalClass from "types/enums/GlobalClass";
import TextButtonTheme from "types/enums/TextButtonTheme";
import useColorModeContext from "hooks/useColorModeContext";
import CrossIcon from "components/icons/CrossIcon";
import FlexBox from "components/layout/FlexBox";

type Props = {
  hasError: boolean;
  options: Array<string>;
  setOptions: Dispatch<SetStateAction<Array<string>>>;
};

const POLL_OPTION_INPUT_MAX_LENGTH = 120;

function Input({ options, setOptions, hasError }: Props) {
  const { isDarkMode } = useColorModeContext();

  return (
    <FlexBox flexDirection="column" gap={16}>
      <FlexBox flexDirection="column" gap={16}>
        {options.map((option, index) => (
          <FlexBox
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            gap={8}
            alignItems="center"
            justifyContent="center"
          >
            <TextInput
              maxLength={POLL_OPTION_INPUT_MAX_LENGTH}
              value={option}
              hasError={hasError && option.length === 0}
              maxLengthIndicator={false}
              onChange={(val) => {
                const optionsCopy = [...options];
                optionsCopy[index] = val;
                setOptions(optionsCopy);
              }}
              placeholder="Type in a poll option"
            />
            {/* This is a placeholder for the PlainButton when we remove it from the page */}
            {options.length <= 2 ? (
              <div style={{ width: "24px" }} />
            ) : (
              <PlainButton
                className={GlobalClass.HideText}
                onClick={() => {
                  const optionsCopy = [...options];
                  optionsCopy.splice(index, 1);
                  setOptions(optionsCopy);
                }}
              >
                <CrossIcon colorValue={ColorValue.Secondary} />
              </PlainButton>
            )}
          </FlexBox>
        ))}
      </FlexBox>
      <TextButton
        onClick={() => {
          setOptions([...options, ""]);
        }}
        fontClass={FontClass.Body1}
        disabled={options.length >= 10}
        buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
        icon={
          <PlusIcon
            colorValue={
              isDarkMode ? ColorValue.BrightPurple : ColorValue.Purple
            }
          />
        }
      >
        Add another option
      </TextButton>
    </FlexBox>
  );
}

export default function PollOptionsInput({
  options,
  setOptions,
  hasError,
}: Props) {
  return (
    <InputWithLabel
      input={
        <Input hasError={hasError} options={options} setOptions={setOptions} />
      }
      label={<InputLabel label="Options" required />}
    />
  );
}
